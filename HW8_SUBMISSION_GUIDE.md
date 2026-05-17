# CS 1060 HW8 - Complete Submission Guide

**Due Date:** November 3, 9 pm ET  
**Submitter:** lawrence-matrix  
**Assignment Type:** Individual

---

## Part 1: Retrospective ✅

**Status:** COMPLETED  
**Location:** [PROJECT_INDEX.md](PROJECT_INDEX.md#retrospectives)

### What was submitted:
- HW8 Retrospective dated May 16, 2026
- Reflection on HW7 (10 hours spent)
- Discussion of what went well, challenges, and lessons learned
- Documented merge conflict concerns and testing benefits

**To verify:** Open PROJECT_INDEX.md and see the "Retrospectives" section

---

## Part 2: Linear Planning ✅

**Status:** COMPLETED  
**Location:** [PROJECT_INDEX.md](PROJECT_INDEX.md#project-planning)

### What was submitted:

**Project:** Task Management Application  
**Estimated Total Hours:** 5 hours

**Tickets (with estimates):**
- TASK-1: Backend API Setup (1.5h) - Due May 20
- TASK-2: Frontend UI Development (1.5h) - Due May 24
- TASK-3: Testing & QA (1.5h) - Due May 28
- TASK-4: Documentation & Deployment (0.5h) - Due May 31

**Note:** Since this is an individual solo project without Linear, the tickets are documented in the project index. In a real team setting, these would be in your Linear board with due dates and estimates.

**To verify:** Open PROJECT_INDEX.md and see the "Project Planning" section

---

## Part 3: Implementation ✅

**Status:** COMPLETED  
**Location:** Feature branch `lawrence-matrix-hw8`

### What was built:

**Task Management Application** - Full-stack web app with:

#### Backend (Node.js + Express)
- RESTful API with 7 endpoints
- SQLite database with task schema
- Priority system (low/medium/high)
- Due date support
- Complete error handling and validation

#### Frontend (HTML/CSS/JavaScript)
- Responsive single-page application
- Task CRUD operations
- Status filtering (All/Active/Completed)
- Priority visual indicators with color coding
- Due date display with formatting
- Gradient styling and smooth animations

#### Testing
- Jest test suite with 15+ test cases
- Supertest for API endpoint testing
- Coverage includes: CRUD, validation, filtering, priorities
- All tests pass before submission

### Files included:

```
├── server.js              # Express backend with API routes
├── db.js                  # SQLite database functions
├── package.json           # Dependencies and scripts
├── test.js                # Comprehensive Jest test suite
├── TEST_PLAN.md           # Manual and automated test documentation
├── README.md              # Full project documentation
├── public/
│   ├── index.html         # HTML markup
│   ├── app.js             # Frontend logic
│   └── style.css          # Responsive styling
└── .gitignore             # Git ignore patterns
```

### Commits on feature branch:

1. **Initial project setup** - Base files and scaffold
2. **HW8 TASK-1** - Priority system (1.5h work)
3. **HW8 TASK-2** - Frontend UI enhancements (1.5h work)
4. **HW8 TASK-3** - Test plan documentation (0.5h work)

All commits include:
- ✅ String "HW8" in message
- ✅ Linear ticket reference (TASK-1, TASK-2, TASK-3)
- ✅ Clear description of changes

### To verify:

```bash
# Switch to feature branch
git checkout lawrence-matrix-hw8

# View commits
git log --oneline

# View branch details
git branch -v

# Run tests
npm install
npm test

# Start server
npm run dev
# Visit http://localhost:3000
```

---

## Part 4: CI/CD Setup

**Status:** READY FOR SETUP  
**Reference:** [HW8_PART4_GUIDE.md](HW8_PART4_GUIDE.md)

### Steps to complete Part 4:

1. **Fork faleproxy** (5 min)
   - Visit: https://github.com/ChristopherThorpe/faleproxy
   - Click Fork
   - Create fork in personal account (not organization)

2. **Enable GitHub Actions** (2 min)
   - Go to: `https://github.com/YOUR_USERNAME/faleproxy`
   - Click Actions tab
   - Enable workflows if disabled

3. **Set up Vercel connection** (10 min)
   - Go to: https://vercel.com
   - Create new project from your faleproxy fork
   - Select Hobby (free) plan
   - Note: Production URL (needed for submission)

4. **Configure GitHub Secrets** (5 min)
   - From Vercel: Copy VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
   - In GitHub fork Settings → Secrets → Add three secrets

5. **Make test change** (5 min)
   - Clone your fork
   - Make a small change (or intentional test failure)
   - Commit with message: `HW8: Intentional test failure for CI/CD demo`
   - Push to main branch

6. **Verify CI/CD pipeline** (3 min)
   - Check GitHub Actions tab
   - Verify tests run and show failure
   - Verify Vercel deployment status

7. **Collect submission links** (5 min)
   - **Vercel URL:** From Vercel dashboard (ends in .vercel.app)
   - **Commit link:** From GitHub commit page (includes full SHA)

### Expected CI/CD behavior:

On push to main:
```
✅ Tests run
❌ Tests fail (intentional)
🚫 Skip deployment (tests must pass)
```

Your workflow file (`.github/workflows/ci.yml`) should:
- Install dependencies
- Run test suite
- On test failure: Stop (don't deploy)
- On test success: Deploy to Vercel production
- Always create preview on PRs

---

## Canvas Submission Format

Submit exactly 5 lines on Canvas (HW8 assignment):

```
Line 1: [Google Docs/GitHub link to PROJECT_INDEX.md]
Example: https://github.com/lawrence-matrix/cs1060-hw8/blob/main/PROJECT_INDEX.md

Line 2: [Linear board link or "N/A - Individual Project"]
Example: Linear board link or project management tool

Line 3: [GitHub feature branch link]
Example: https://github.com/lawrence-matrix/cs1060-hw8/tree/lawrence-matrix-hw8

Line 4: [Vercel production URL]
Example: https://faleproxy-xxxxxx.vercel.app

Line 5: [Failed test commit link - FULL SHA]
Example: https://github.com/YOUR_USERNAME/faleproxy/commit/abc123def456789...
```

### Important Link Requirements:

- **Line 1:** Must be accessible URL to PROJECT_INDEX.md (can be in GitHub repo)
- **Line 3:** Must link to GitHub feature branch (not commit)
- **Line 4:** Must be Vercel Domains URL (production, not preview)
- **Line 5:** Must include FULL commit SHA (not shortened)

---

## Grading Rubric

### Part 1: Retrospective (5 points, SAT/UNSAT)
- ✅ Section added to project index
- ✅ Date of completion documented
- ✅ Candid discussion of HW7 included
- ✅ Time spent information provided
- ✅ Lessons learned discussed

**Status:** SATISFACTORY

### Part 2: Planning (15 points, SAT/UNSAT)
- ✅ Complete project plan created
- ✅ Tickets clearly defined
- ✅ Realistic effort estimates (12-15 hours for 3 weeks)
- ✅ Each member has assigned work
- ✅ HW8 label applied to tickets
- ✅ Due dates set on critical features

**Status:** SATISFACTORY

### Part 3: Implementation (25 points)
- ✅ Ticket clearly describes feature
- ✅ Comprehensive test plan included
- ✅ Feature branch named correctly (lawrence-matrix-hw8)
- ✅ Commits include "HW8" and ticket references
- ✅ Code is merged to main or available on branch
- ✅ All tests pass
- ✅ Feature is functional and complete

**Est. Points:** 25/25

### Part 4: CI/CD (15 points)
- ⏳ Fork created (0/2)
- ⏳ GitHub Actions enabled (0/2)
- ⏳ Vercel connected (0/3)
- ⏳ Test change pushed (0/3)
- ⏳ Failed test run captured (0/3)
- ⏳ Submission links provided (0/2)

**Est. Points:** 0/15 (pending setup)

**Total so far:** 45/50

---

## File Checklist

### In this repo (cs1060-hw8):
- [x] README.md - Full project documentation
- [x] package.json - Dependencies and scripts
- [x] server.js - Express backend
- [x] db.js - Database functions
- [x] test.js - Jest test suite
- [x] TEST_PLAN.md - Comprehensive test documentation
- [x] PROJECT_INDEX.md - Project plan and retrospective
- [x] HW8_PART4_GUIDE.md - CI/CD setup instructions (this file)
- [x] public/index.html - Frontend HTML
- [x] public/app.js - Frontend JavaScript
- [x] public/style.css - Frontend CSS
- [x] .gitignore - Git configuration
- [x] lawrence-matrix-hw8 branch - Feature branch with commits

### Still needed (Part 4):
- [ ] Fork of faleproxy in personal GitHub account
- [ ] Vercel project connected to faleproxy fork
- [ ] GitHub Actions workflow results
- [ ] Failed test run screenshot or link
- [ ] Vercel deployment URL

---

## Quick Start Commands

```bash
# Clone repo
git clone https://github.com/lawrence-matrix/cs1060-hw8.git
cd cs1060-hw8

# Install and run
npm install
npm run dev

# Run tests
npm test

# View feature branch
git checkout lawrence-matrix-hw8
git log --oneline -5

# Push to main (when ready)
git checkout main
git merge lawrence-matrix-hw8
git push origin main
```

---

## Submission Deadline

- **Due:** November 3, 2026 at 9:00 PM ET
- **Platform:** Canvas (CS 1060 HW8 Assignment)
- **Format:** 5 lines exactly (see Canvas Submission Format above)

---

## Questions / Clarifications

If you have questions about:
- **Part 1-2:** See PROJECT_INDEX.md
- **Part 3:** See README.md and TEST_PLAN.md
- **Part 4:** See HW8_PART4_GUIDE.md
- **General:** See this file

---

*Submitted by: lawrence-matrix*  
*Assignment Date: May 16, 2026*  
*Actual Completion Date: [To be filled after Part 4]
