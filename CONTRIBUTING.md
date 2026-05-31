# 🤝 Contributing to ResQ

First off — thank you for considering contributing to ResQ. This is an open-source project with a real human mission behind it: saving lives on Indian roads. Every bug fix, feature, or documentation improvement matters.

Please take a few minutes to read these guidelines before you start. They exist to keep the codebase clean, reviews fast, and collaboration smooth for everyone.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Getting Started](#-getting-started)
- [Branch Naming](#-branch-naming)
- [Commit Message Format](#-commit-message-format)
- [Pull Request Process](#-pull-request-process)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)
- [Code Style Guidelines](#-code-style-guidelines)
- [Who to Contact](#-who-to-contact)

---

## 🧭 Code of Conduct

By participating in this project, you agree to treat everyone with respect. We do not tolerate harassment, discrimination, or disrespectful behavior of any kind. If you witness or experience anything that violates this, please report it to **hello@resq.tech**.

---

## 💡 How Can I Contribute?

There are many ways to help — you don't have to write code:

- 🐛 **Report bugs** — find something broken? Tell us.
- 🌟 **Suggest features** — have an idea that could save more lives? Open an issue.
- 🛠️ **Fix bugs or build features** — pick up an open issue and submit a PR.
- 📖 **Improve documentation** — fix typos, clarify setup steps, add examples.
- 🧪 **Write tests** — test coverage is always welcome.
- 🌍 **Translate** — help us reach more communities across India.

---

## 🚀 Getting Started

**1. Fork the repository**

Click the **Fork** button at the top-right of the ResQ GitHub page.

**2. Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/resq.git
cd resq
```

**3. Add the upstream remote**

```bash
git remote add upstream https://github.com/yourusername/resq.git
```

**4. Set up the project locally**

Follow the setup steps in the main [README.md](README.md) for whichever part you are working on — mobile app, dashboard, or hardware.

**5. Create a new branch**

Always work on a new branch. Never commit directly to `main`.

```bash
git checkout -b feature/your-feature-name
```

---

## 🌿 Branch Naming

Use one of the following prefixes:

| Prefix | When to use |
|---|---|
| `feature/` | Adding something new |
| `fix/` | Fixing a bug |
| `docs/` | Documentation only changes |
| `refactor/` | Code cleanup, no feature change |
| `test/` | Adding or fixing tests |
| `chore/` | Dependency updates, config changes |

**Examples:**

```
feature/bystander-mode-ui
fix/gps-null-crash
docs/esp32-setup-guide
```

---

## ✍️ Commit Message Format

We follow a simple version of [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**

```
feat: add 15-second SOS cancellation window
fix: handle null location on crash detection
docs: update ESP32 wiring diagram
refactor: simplify ambulance dispatch API call
chore: upgrade Flutter to 3.22
```

**Rules:**
- Use lowercase
- Keep the description under 72 characters
- Use present tense — "add feature", not "added feature"
- Reference an issue if applicable: `fix: handle null GPS (#42)`

---

## 🔃 Pull Request Process

**1. Sync with upstream before pushing**

```bash
git fetch upstream
git rebase upstream/main
```

**2. Push your branch**

```bash
git push origin feature/your-feature-name
```

**3. Open a Pull Request**

Go to the ResQ repository on GitHub and click **Compare & pull request**.

**4. Fill in the PR template**

Your PR description should include:

- **What** — what does this PR do?
- **Why** — why is this change needed?
- **How** — how did you implement it?
- **Screenshots** — if it's a UI change, attach before/after screenshots
- **Issue** — link the related issue (e.g., `Closes #42`)

**5. Wait for review**

- At least **one approval** is required before merging
- Address all review comments before requesting a re-review
- Do not merge your own PR
- Keep the PR focused — one thing per PR makes reviews faster

**Review assignment by area:**

| Area | Reviewer |
|---|---|
| Mobile App | Hataf |
| Dashboard & Backend | Chandrashekhar |
| ESP32 / Hardware | Amit |
| Pitch / Docs | Kamal |

---

## 🐛 Reporting Bugs

Before reporting, check if the issue already exists in [GitHub Issues](../../issues).

When opening a new bug report, include:

1. **What happened** — describe the bug clearly
2. **Steps to reproduce** — exact steps to trigger it
3. **Expected behavior** — what should have happened
4. **Actual behavior** — what actually happened
5. **Environment** — OS, device, Flutter/Node version, browser (if dashboard)
6. **Screenshots or logs** — if available

Use the label `bug` when creating the issue.

---

## 🌟 Suggesting Features

Open a GitHub Issue with the label `enhancement`.

Include:
- **Problem** — what problem does this feature solve?
- **Proposed solution** — how do you imagine it working?
- **Alternatives considered** — did you think of other approaches?
- **Context** — is this specific to a region, use-case, or user type?

---

## 🖊️ Code Style Guidelines

### Mobile App (Flutter / React Native)
- Follow the [Dart style guide](https://dart.dev/guides/language/effective-dart/style) for Flutter
- Use descriptive variable names — no single-letter variables outside loops
- Keep widget build methods short; extract into smaller widgets
- Add comments on non-obvious logic

### Web Dashboard (JS / Node.js)
- Use `camelCase` for variables and functions
- Use `PascalCase` for React components and class names
- Prefer `const` and `let` over `var`
- All API routes should have error handling
- Keep files under 300 lines — split if needed

### ESP32 / Arduino (C++)
- Comment every function with purpose and expected inputs/outputs
- Define all pin numbers as named constants at the top of the file
- Test changes on physical hardware before submitting

### General
- No hardcoded secrets, API keys, or credentials in code — use `.env`
- Delete commented-out code before submitting a PR
- Write self-documenting code; add comments only where "why" isn't obvious

---

## 📬 Who to Contact

Not sure where to start, or stuck on something? Reach out:

| Question | Contact |
|---|---|
| General / project direction | **Amit** (Project Director) |
| Mobile app issues | **Hataf** (App Lead) |
| Dashboard / backend | **Chandrashekhar** (Backend Lead) |
| Docs / pitch | **Kamal** (Presentation Lead) |
| Email | hello@resq.tech |
| GitHub Issues | [Open an issue](../../issues) |

---

<div align="center">
  <p>We're glad you're here. Every contribution — big or small — brings us closer to zero road accident deaths.</p>
  <p><i>— The ResQ Team</i></p>
</div>
