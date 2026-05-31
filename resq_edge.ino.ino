/*
  ResQ Edge - ESP32 Complete Code (FIXED)
  
  Pin Connections:
  - MPU6050 SDA -> GPIO 21
  - MPU6050 SCL -> GPIO 22
  - OLED SDA    -> GPIO 21
  - OLED SCL    -> GPIO 22
  - SIM800L TX  -> GPIO 16 (ESP32 RX)
  - SIM800L RX  -> GPIO 17 (ESP32 TX)
  - GPS TX      -> GPIO 18 (ESP32 RX)
  - GPS RX      -> GPIO 19 (ESP32 TX)
  - Touch SIG   -> GPIO 4
  - SD CS       -> GPIO 5
  - SD MOSI     -> GPIO 23
  - SD MISO     -> GPIO 19
  - SD SCK      -> GPIO 18
*/

/*
  ResQ Edge - ESP32 OPTIMIZED STABLE CODE
  Display Fixed - No Flickering - No Overflow
*/

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <TinyGPSPlus.h>
#include <SD.h>
#include <SPI.h>

// ========== OLED Display ==========
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ========== MPU6050 ==========
Adafruit_MPU6050 mpu;

// ========== GPS ==========
TinyGPSPlus gps;
#define GPS_RX 32
#define GPS_TX 33

// ========== SIM800L ==========
#define SIM800L_RX 16
#define SIM800L_TX 17

// ========== Touch Sensor ==========
#define TOUCH_SENSOR_PIN 4

// ========== SD Card ==========
#define SD_CS 5
#define SD_SCK 18
#define SD_MOSI 23
#define SD_MISO 19

// ========== Configuration ==========
#define ACCEL_THRESHOLD 2.5
#define SOS_CANCEL_WINDOW 15000
#define EMERGENCY_NUMBER "+919876543210"  // CHANGE THIS

// ========== Global Variables ==========
unsigned long crashDetectedTime = 0;
bool sosTriggered = false;
bool sosCancelled = false;
int tapCount = 0;
unsigned long lastTapTime = 0;
bool cancellationWindowActive = false;
String lastValidLocation = "Wait GPS...";
bool gpsFixed = false;
bool sim800lOk = false;
bool mpuOk = false;
bool sdOk = false;
bool oledOk = false;

// Display optimization variables
unsigned long lastDisplayUpdate = 0;
unsigned long lastSensorRead = 0;
float currentGForce = 0;
int lastGpsStatus = -1;  // 0=invalid, 1=valid
float lastDisplayedGForce = -1;
int lastRemainingSeconds = -1;

enum DisplayState {
  STATE_NORMAL,
  STATE_SOS_WAITING,
  STATE_SOS_ACTIVE,
  STATE_ERROR
};
DisplayState currentState = STATE_NORMAL;
DisplayState lastDisplayState = STATE_ERROR;  // Force first update

void setup() {
  Serial.begin(115200);
  Serial.println("\nResQ Edge Starting...");

  // Initialize I2C
  Wire.begin(21, 22);

  // Initialize OLED with smaller boot screen
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
    Serial.println("OLED FAILED");
    oledOk = false;
  } else {
    oledOk = true;
    display.setRotation(0);
    display.clearDisplay();
    showBootScreenOptimized();
    Serial.println("OLED OK");
  }
  delay(2000);

  // Initialize MPU6050
  if (!mpu.begin()) {
    Serial.println("MPU FAILED");
    mpuOk = false;
  } else {
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
    Serial.println("MPU OK");
    mpuOk = true;
  }

  // Initialize SD Card
  SPI.begin(SD_SCK, SD_MISO, SD_MOSI, SD_CS);
  if (!SD.begin(SD_CS)) {
    Serial.println("SD FAILED");
    sdOk = false;
  } else {
    Serial.println("SD OK");
    sdOk = true;
    logToSD("ResQ Edge Started");
  }

  // Initialize GPS
  Serial2.begin(9600, SERIAL_8N1, GPS_RX, GPS_TX);
  Serial.println("GPS Initialized");

  // Initialize SIM800L
  Serial1.begin(9600, SERIAL_8N1, SIM800L_RX, SIM800L_TX);
  delay(3000);
  Serial1.println("AT");
  delay(1000);
  if (Serial1.available()) {
    String response = Serial1.readString();
    if (response.indexOf("OK") > 0) {
      sim800lOk = true;
      Serial.println("SIM800L OK");
    }
  }

  // Initialize Touch Sensor
  pinMode(TOUCH_SENSOR_PIN, INPUT_PULLUP);
  Serial.println("Touch Sensor Ready");

  // Show main screen
  if (oledOk) {
    showMainScreen();
  }

  Serial.println("=== ResQ Edge READY ===");
  delay(500);

  // Run quick test
  testComponents();
}

void loop() {
  // Read sensors at 50Hz
  if (millis() - lastSensorRead > 20) {
    checkTouchSensor();
    checkMPU6050();
    readGPS();
    lastSensorRead = millis();
  }

  handleCancellationWindow();
  updateDisplayOptimized();  // OPTIMIZED - only updates when needed

  delay(10);
}

// ========== OPTIMIZED BOOT SCREEN (No Overflow) ==========
void showBootScreenOptimized() {
  display.clearDisplay();

  // Big "ResQ" centered
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  int16_t x1, y1;
  uint16_t w, h;
  display.getTextBounds("ResQ", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 15);
  display.println("ResQ");

  // "Edge" smaller
  display.setTextSize(1);
  display.getTextBounds("Edge", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 35);
  display.println("Edge");

  // Bottom text
  display.setTextSize(1);
  display.setCursor(15, 55);
  display.println("Booting...");

  display.display();
  delay(1500);

  // Second boot screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(20, 25);
  display.println("Every Second");
  display.setCursor(25, 40);
  display.println("Counts!");
  display.display();
  delay(1000);
}

// ========== MAIN SCREEN ==========
void showMainScreen() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("ResQ Edge Ready");
  display.setCursor(0, 12);
  display.println("2 Tap = SOS");
  display.setCursor(0, 24);
  display.println("3 Tap = Cancel");
  display.setCursor(0, 36);
  display.println("GPS: Waiting...");
  display.setCursor(0, 48);
  display.println("Status: MONITORING");
  display.display();
}

// ========== OPTIMIZED DISPLAY UPDATE (No Flicker) ==========
void updateDisplayOptimized() {
  if (!oledOk) return;

  bool needsUpdate = false;

  // Check if state changed
  if (currentState != lastDisplayState) {
    needsUpdate = true;
    lastDisplayState = currentState;
  }

  // For NORMAL state, check if values changed significantly
  if (currentState == STATE_NORMAL) {
    int currentGpsStatus = gps.location.isValid() ? 1 : 0;
    if (currentGpsStatus != lastGpsStatus) {
      needsUpdate = true;
      lastGpsStatus = currentGpsStatus;
    }

    // Update G-Force only if changed by more than 0.1G
    if (abs(currentGForce - lastDisplayedGForce) > 0.1) {
      needsUpdate = true;
      lastDisplayedGForce = currentGForce;
    }
  }

  // For SOS_WAITING, check remaining seconds
  if (currentState == STATE_SOS_WAITING) {
    int remaining = (SOS_CANCEL_WINDOW - (millis() - crashDetectedTime)) / 1000;
    if (remaining != lastRemainingSeconds) {
      needsUpdate = true;
      lastRemainingSeconds = remaining;
    }
  }

  // Update display every 2 seconds max (for GPS updates)
  if (!needsUpdate && (millis() - lastDisplayUpdate > 2000)) {
    needsUpdate = true;
  }

  // Only update if needed
  if (needsUpdate) {
    drawDisplay();
    lastDisplayUpdate = millis();
  }
}

// ========== DRAW DISPLAY (Single function for all states) ==========
void drawDisplay() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  switch (currentState) {
    case STATE_NORMAL:
      drawNormalScreen();
      break;
    case STATE_SOS_WAITING:
      drawSOSWaitingScreen();
      break;
    case STATE_SOS_ACTIVE:
      drawSOSActiveScreen();
      break;
    case STATE_ERROR:
      drawErrorScreen();
      break;
  }

  display.display();
}

// ========== NORMAL SCREEN (Clean & Stable) ==========
void drawNormalScreen() {
  // Line 0: Title
  display.setCursor(0, 0);
  display.println("ResQ Edge v3.0");

  // Line 1: GPS Status
  display.setCursor(0, 11);
  if (gps.location.isValid()) {
    display.print("GPS:");
    display.print(gps.location.lat(), 4);
    display.print(",");
    display.println(gps.location.lng(), 4);
  } else {
    display.println("GPS: Searching...");
  }

  // Line 2: G-Force
  display.setCursor(0, 22);
  display.print("G-Force: ");
  display.print(currentGForce, 1);
  display.println(" G");

  // Line 3: Touch Instructions
  display.setCursor(0, 33);
  display.println("2Tap=SOS 3Tap=Cancel");

  // Line 4: System Status
  display.setCursor(0, 44);
  display.print("SYS:");
  display.print(mpuOk ? "M" : "!");
  display.print(gpsFixed ? "G" : "!");
  display.print(sim800lOk ? "S" : "!");
  display.print(sdOk ? "D" : "!");

  // Line 5: Ready Status
  display.setCursor(0, 55);
  display.println("STATUS: MONITORING");
}

// ========== SOS WAITING SCREEN ==========
void drawSOSWaitingScreen() {
  unsigned long elapsed = millis() - crashDetectedTime;
  int remaining = (SOS_CANCEL_WINDOW - elapsed) / 1000;
  if (remaining < 0) remaining = 0;

  // Line 0: Alert
  display.setCursor(0, 0);
  display.println("!!! SOS PENDING !!!");

  // Line 1: Countdown
  display.setCursor(0, 12);
  display.print("Cancel in: ");
  display.print(remaining);
  display.println(" sec");

  // Line 2: Instruction
  display.setCursor(0, 24);
  display.println("TAP 3 TIMES to");
  display.setCursor(0, 36);
  display.println("CANCEL");

  // Line 3: Location
  display.setCursor(0, 48);
  display.print("Loc: ");
  if (gps.location.isValid()) {
    display.print(gps.location.lat(), 3);
    display.print(",");
    display.print(gps.location.lng(), 3);
  } else {
    display.print("Waiting...");
  }
}

// ========== SOS ACTIVE SCREEN ==========
void drawSOSActiveScreen() {
  display.setCursor(0, 0);
  display.println("!!! SOS ACTIVE !!!");

  display.setCursor(0, 14);
  display.println("Help En Route");

  display.setCursor(0, 28);
  display.println("Ambulance + Police");

  display.setCursor(0, 42);
  display.println("Location Sent:");

  display.setCursor(0, 52);
  if (gps.location.isValid()) {
    display.print(gps.location.lat(), 2);
    display.print(",");
    display.print(gps.location.lng(), 2);
  } else {
    display.print(lastValidLocation);
  }
}

// ========== ERROR SCREEN ==========
void drawErrorScreen() {
  display.setCursor(0, 0);
  display.println("!!! SYS ERROR !!!");

  display.setCursor(0, 14);
  display.print("MPU:");
  display.print(mpuOk ? "OK " : "FAIL ");
  display.print("GPS:");
  display.println(gpsFixed ? "OK" : "FAIL");

  display.setCursor(0, 28);
  display.print("SIM:");
  display.print(sim800lOk ? "OK " : "FAIL ");
  display.print("SD:");
  display.println(sdOk ? "OK" : "FAIL");

  display.setCursor(0, 42);
  display.println("Check Connections");

  display.setCursor(0, 54);
  display.println("Reboot Required");
}

// ========== TOUCH SENSOR ==========
void checkTouchSensor() {
  int touchState = digitalRead(TOUCH_SENSOR_PIN);

  if (touchState == LOW) {
    unsigned long now = millis();

    if (now - lastTapTime > 300) {
      tapCount++;
      lastTapTime = now;
      Serial.print("Tap: ");
      Serial.println(tapCount);

      if (tapCount == 2 && !sosTriggered && !cancellationWindowActive) {
        Serial.println(">>> SOS TRIGGERED BY TAP <<<");
        crashDetectedTime = millis();
        cancellationWindowActive = true;
        sosCancelled = false;
        currentState = STATE_SOS_WAITING;
        lastDisplayState = STATE_ERROR;  // Force update
      }

      if (tapCount == 3 && cancellationWindowActive) {
        Serial.println(">>> SOS CANCELLED <<<");
        sosCancelled = true;
        cancellationWindowActive = false;
        tapCount = 0;
        currentState = STATE_NORMAL;
        lastDisplayState = STATE_ERROR;  // Force update
      }
    }

    if (millis() - lastTapTime > 1000) {
      tapCount = 0;
    }
  }
}

// ========== MPU6050 CRASH DETECTION ==========
void checkMPU6050() {
  if (!mpuOk) return;

  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  float accelMagnitude = sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.y * a.acceleration.y + a.acceleration.z * a.acceleration.z);
  currentGForce = accelMagnitude / 9.8;

  if (currentGForce > ACCEL_THRESHOLD && !sosTriggered && !cancellationWindowActive) {
    Serial.print(">>> CRASH DETECTED! ");
    Serial.print(currentGForce);
    Serial.println(" G <<<");

    crashDetectedTime = millis();
    cancellationWindowActive = true;
    sosCancelled = false;
    currentState = STATE_SOS_WAITING;
    lastDisplayState = STATE_ERROR;  // Force update

    if (sdOk) {
      logToSD("CRASH: " + String(currentGForce) + "G");
    }
  }
}

// ========== GPS READING ==========
void readGPS() {
  while (Serial2.available() > 0) {
    char c = Serial2.read();
    if (gps.encode(c)) {
      if (gps.location.isValid()) {
        lastValidLocation = String(gps.location.lat(), 6) + "," + String(gps.location.lng(), 6);
        if (!gpsFixed) {
          gpsFixed = true;
          Serial.println("GPS FIXED: " + lastValidLocation);
        }
      }
    }
  }
}

// ========== SOS HANDLING ==========
void handleCancellationWindow() {
  if (cancellationWindowActive && !sosTriggered && !sosCancelled) {
    if (millis() - crashDetectedTime > SOS_CANCEL_WINDOW) {
      triggerSOS();
    }
  }
}

void triggerSOS() {
  sosTriggered = true;
  cancellationWindowActive = false;
  currentState = STATE_SOS_ACTIVE;
  lastDisplayState = STATE_ERROR;  // Force update

  Serial.println("========================================");
  Serial.println("!!! SOS TRIGGERED !!!");
  Serial.println("Location: " + lastValidLocation);
  Serial.println("========================================");

  if (sdOk) {
    logToSD("SOS TRIGGERED: " + lastValidLocation);
  }

  sendSMS();
  sendToDashboard();
}

void sendSMS() {
  if (!sim800lOk) {
    Serial.println("SIM800L not available");
    return;
  }

  Serial.println("Sending SMS...");
  Serial1.println("AT+CMGF=1");
  delay(500);

  Serial1.print("AT+CMGS=\"");
  Serial1.print(EMERGENCY_NUMBER);
  Serial1.println("\"");
  delay(500);

  Serial1.print("RESQ SOS! Location: ");
  Serial1.print(lastValidLocation);
  Serial1.write(26);
  delay(500);

  Serial.println("SMS Sent");

  if (sdOk) {
    logToSD("SMS sent to " + String(EMERGENCY_NUMBER));
  }
}

void sendToDashboard() {
  Serial.println("Dashboard Alert: " + lastValidLocation);

  if (sdOk) {
    logToSD("Dashboard: " + lastValidLocation);
  }
}

void logToSD(String message) {
  if (!sdOk) return;

  File logFile = SD.open("/log.txt", FILE_APPEND);
  if (logFile) {
    logFile.print(millis());
    logFile.print(": ");
    logFile.println(message);
    logFile.close();
  }
}

// ========== TEST COMPONENTS ==========
void testComponents() {
  Serial.println("\n=== TESTING COMPONENTS ===");

  Serial.print("MPU6050: ");
  Serial.println(mpuOk ? "OK" : "FAIL");

  Serial.print("GPS: ");
  Serial.println(gpsFixed ? "FIXED" : "Waiting");

  Serial.print("SIM800L: ");
  Serial.println(sim800lOk ? "OK" : "FAIL");

  Serial.print("SD Card: ");
  Serial.println(sdOk ? "OK" : "FAIL");

  Serial.print("Touch: ");
  Serial.println("Tap to test...");

  unsigned long startTime = millis();
  bool touched = false;
  while (millis() - startTime < 3000) {
    if (digitalRead(TOUCH_SENSOR_PIN) == LOW) {
      touched = true;
      break;
    }
    delay(10);
  }
  Serial.println(touched ? "OK" : "No touch detected");

  Serial.println("=== TEST COMPLETE ===\n");
}