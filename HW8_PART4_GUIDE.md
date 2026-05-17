# CS 1060 HW8 - Part 4 CI/CD Setup Instructions

## Overview

Part 4 requires setting up a CI/CD pipeline using GitHub Actions and Vercel for the faleproxy project. This document guides you through the complete setup process.

## Step 1: Fork faleproxy Repository

1. Go to: https://github.com/ChristopherThorpe/faleproxy
2. Click **Fork** button (top right)
3. Choose your personal GitHub account (NOT an organization)
4. Name it `faleproxy`
5. Click **Create fork**

## Step 2: Leave Fork Network (Optional but Recommended)

1. Go to your fork: `https://github.com/YOUR_USERNAME/faleproxy`
2. Click **Settings** (top right)
3. Scroll down to **Danger Zone**
4. Check "Leave network" if you want (this is optional for this assignment)

## Step 3: Enable GitHub Actions

1. In your fork, click **Actions** tab
2. If workflows are disabled, you'll see a button to enable them
3. Click **Enable GitHub Actions** (or similar button)
4. GitHub will allow you to run workflows on your fork

**Why?** - Forks have workflows disabled by default for security. You need to enable them.

## Step 4: Review CI/CD Configuration

Check the existing CI/CD setup:

```
.github/workflows/ci.yml
```

The workflow should:
- Run tests on push to any branch
- Run tests on pull requests
- Deploy to Vercel preview on PRs
- Deploy to Vercel production when tests pass on main

## Step 5: Connect to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub (or create account)
3. Click **New Project**
4. Import your forked `faleproxy` repository
5. Select **"Hobby"** plan (free tier)
6. Click **Deploy**

Vercel will:
- Build your project
- Deploy it to a production URL
- Create preview deployments for PRs

## Step 6: Get Vercel Credentials

For GitHub Actions to deploy to Vercel, you need these secrets:

1. Go to Vercel: https://vercel.com/account/tokens
2. Create a new token (copy it - you'll need it shortly)
3. Go to your Vercel project settings
4. Find: **Project ID** and **Org ID** (copy both)

## Step 7: Add GitHub Secrets

1. In your fork, click **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add three secrets:

| Secret Name | Value |
|---|---|
| VERCEL_TOKEN | (from step 6) |
| VERCEL_ORG_ID | (from Vercel project settings) |
| VERCEL_PROJECT_ID | (from Vercel project settings) |

## Step 8: Make a Test Change

1. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/faleproxy.git
cd faleproxy
```

2. Make a small change (e.g., modify a test to make it fail intentionally):
```bash
# Example: Edit a test file to cause a failure
echo "test('intentional failure', () => { expect(true).toBe(false); });" >> src/__tests__/intentional.test.js
```

3. Commit and push:
```bash
git add .
git commit -m "HW8: Add intentional test failure for CI/CD demonstration"
git push origin main
```

## Step 9: Verify CI/CD Pipeline

1. Go to your GitHub fork **Actions** tab
2. Click on the latest workflow run
3. Verify it shows:
   - ✅ Tests ran and **FAILED** (because of your intentional change)
   - ❌ Deployment blocked (tests failed)
4. Go to Vercel.com and verify no new production deployment
5. Copy the commit SHA from GitHub (you'll need this for submission)

**The workflow should show:**
```
On push to main:
- Run tests → FAILED ❌
- Skip deployment (tests failed)
```

## Step 10: Collect Submission Links

You now have all the info needed for Canvas submission:

1. **Vercel Production URL** - from your Vercel project dashboard
   - Format: `https://faleproxy-xxx.vercel.app`
   
2. **Failed Test Commit Link** - from GitHub
   - Format: `https://github.com/YOUR_USERNAME/faleproxy/commit/ABC123DEF456...`
   - Include the full commit SHA

## Next Steps (For Future Assignments)

Once Part 4 is graded, continue by:

1. **Fix the failing test:**
   - Remove your intentional failure
   - Fix any actual bugs found
   
2. **Verify successful deployment:**
   - Push fixes
   - Verify tests pass in GitHub Actions
   - Verify deployment to production in Vercel

3. **Set up complete CI/CD:**
   - Ensure `.github/workflows/ci.yml` deploys to Vercel on test success
   - Configure Vercel to ONLY deploy when GitHub Status is green

## Troubleshooting

### Issue: "Workflows are disabled"
**Solution:** Go to Actions tab and enable workflows for your fork

### Issue: "Vercel deployment fails"
**Solution:** 
- Check that VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID are set
- Verify they're spelled exactly right
- Try regenerating the token

### Issue: "Tests pass but no deployment"
**Solution:** Check that `ci.yml` has proper deployment steps configured

### Issue: "Can't find commit link format"
**Solution:** 
- Go to GitHub → Commits
- Click on your commit
- Copy the full URL from address bar
- It should include the complete commit SHA

## Additional Resources

- Vercel + GitHub Actions: https://ncodedsolutions.com/en/articles/automate-your-deployments-using-ci-cd-pipeline-with-vercel-and-git-hub-actions
- GitHub Actions Docs: https://docs.github.com/en/actions
- Vercel Deployment: https://vercel.com/docs/deployments

## Submission Checklist

- [ ] Fork created at `https://github.com/YOUR_USERNAME/faleproxy`
- [ ] GitHub Actions enabled
- [ ] Vercel project connected
- [ ] Secrets added (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Test change pushed and CI/CD pipeline ran
- [ ] Failed test run visible in GitHub Actions
- [ ] Collected Vercel production URL
- [ ] Collected failed commit link with full SHA
- [ ] Ready to submit to Canvas

## Canvas Submission Format

Line 4: Your Vercel production URL  
Line 5: Your failed test commit link  

Both links must be complete and direct (not shortened URLs).
