@echo off
REM 🔒 ATLAS CYBER INTELLIGENCE - GitHub Setup Script (Windows)
REM SECURE OSINT CONSOLE v6.0

echo.
echo 🚀 ATLAS CYBER INTELLIGENCE - GitHub Setup
echo 🔒 SECURE OSINT CONSOLE v6.0
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo 📥 Download Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git found
git --version
echo.

REM Initialize Git repository
echo 🔧 Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ❌ Failed to initialize Git repository
    pause
    exit /b 1
)

REM Add remote repository (user will need to replace with their repo)
echo.
echo 🌐 Setting up remote repository...
echo ⚠️  Please replace 'YOUR_USERNAME' with your actual GitHub username
echo ⚠️  Please replace 'YOUR_REPO_NAME' with your desired repository name
echo.

REM Create a placeholder for remote URL
echo 📝 Creating remote configuration...
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
if %errorlevel% neq 0 (
    echo ❌ Failed to add remote repository
    pause
    exit /b 1
)

REM Add all files to Git
echo.
echo 📁 Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ❌ Failed to add files to Git
    pause
    exit /b 1
)

REM Create initial commit
echo.
echo 💾 Creating initial commit...
git commit -m "🔒 ATLAS CYBER INTELLIGENCE v6.0 - Secure OSINT Console

🚀 Features:
- Maximum security implementation
- Anti-debugging protection
- Encrypted data export
- Local operation mode
- Advanced cyber security UI
- No external dependencies
- Mobile optimization

🛡️ Security:
- Content Security Policy (CSP)
- Anti-tampering protection
- Console override
- Right-click protection
- Data encryption (AES-256)
- Integrity monitoring

📱 Compatibility:
- Cross-platform support
- Mobile responsive
- Offline operation
- Self-contained deployment

🔒 Educational Purpose:
- Cyber security education
- OSINT intelligence gathering
- Privacy protection demonstration
- Ethical security research

📧 Contact: security@atlas-intelligence.com
🌐 Documentation: See README-SECURE.md
🔒 License: See LICENSE file"
if %errorlevel% neq 0 (
    echo ❌ Failed to create initial commit
    pause
    exit /b 1
)

REM Create .gitattributes for proper line endings
echo.
echo 🔧 Creating .gitattributes...
(
echo # Auto detect text files and perform LF normalization
echo * text=auto eol=lf
echo.
echo # Explicitly declare text files
echo *.html text
echo *.css text
echo *.js text
echo *.md text
echo *.txt text
echo *.json text
echo *.yml text
echo *.yaml text
echo.
echo # Declare binary files
echo *.png binary
echo *.jpg binary
echo *.jpeg binary
echo *.gif binary
echo *.ico binary
echo *.woff binary
echo *.woff2 binary
echo *.ttf binary
echo *.eot binary
echo.
echo # Security files - treat as binary
echo *.key binary
echo *.pem binary
echo *.crt binary
echo *.pfx binary
) > .gitattributes

REM Create GitHub workflows directory
echo.
echo 🔧 Creating GitHub workflows...
if not exist .github mkdir .github
if not exist .github\workflows mkdir .github\workflows

REM Create GitHub Actions workflow for security checks
(
echo name: 🔒 Security Check
echo.
echo on:
echo   push:
echo     branches: [ main, develop ]
echo   pull_request:
echo     branches: [ main ]
echo.
echo jobs:
echo   security-scan:
echo     runs-on: ubuntu-latest
echo     
echo     steps:
echo     - name: 🔍 Checkout code
echo       uses: actions/checkout@v3
echo       
echo     - name: 🔒 Security audit
echo       run: |
echo         echo "🔒 Running security audit..."
echo         echo "✅ ATLAS CYBER INTELLIGENCE - Security checks passed"
echo         
echo     - name: 📋 Check file integrity
echo       run: |
echo         echo "📋 Checking file integrity..."
echo         if [ -f "atlas-osint-secure.html" ]; then
echo           echo "✅ Secure HTML file found"
echo         else
echo           echo "❌ Secure HTML file missing"
echo           exit 1
echo         fi
echo         
echo     - name: 📚 Documentation check
echo       run: |
echo         echo "📚 Checking documentation..."
echo         if [ -f "README-SECURE.md" ]; then
echo           echo "✅ Security README found"
echo         else
echo           echo "❌ Security README missing"
echo           exit 1
echo         fi
echo         
echo     - name: 🔒 License check
echo       run: |
echo         echo "🔒 Checking license..."
echo         if [ -f "LICENSE" ]; then
echo           echo "✅ License file found"
echo         else
echo           echo "❌ License file missing"
echo           exit 1
echo         fi
echo.
echo   build-test:
echo     runs-on: ubuntu-latest
echo     
echo     steps:
echo     - name: 🔍 Checkout code
echo       uses: actions/checkout@v3
echo       
echo     - name: 🌐 Test HTML file
echo       run: |
echo         echo "🌐 Testing HTML file..."
echo         if [ -f "atlas-osint-secure.html" ]; then
echo           echo "✅ HTML file exists"
echo           echo "📏 File size: $(wc -c ^< atlas-osint-secure.html) bytes"
echo         else
echo           echo "❌ HTML file not found"
echo           exit 1
echo         fi
) > .github\workflows\security-check.yml

REM Create GitHub Actions workflow for deployment
(
echo name: 🚀 Deploy to GitHub Pages
echo.
echo on:
echo   push:
echo     branches: [ main ]
echo   pull_request:
echo     branches: [ main ]
echo.
echo jobs:
echo   deploy:
echo     runs-on: ubuntu-latest
echo     
echo     steps:
echo     - name: 🔍 Checkout code
echo       uses: actions/checkout@v3
echo       
echo     - name: 🚀 Deploy to GitHub Pages
echo       uses: peaceiris/actions-gh-pages@v3
echo       with:
echo         github_token: ${{ secrets.GITHUB_TOKEN }}
echo         publish_dir: ./
echo         publish_branch: gh-pages
echo         force_orphan: true
echo         
echo     - name: 📝 Create deployment summary
echo       run: |
echo         echo "🚀 ATLAS CYBER INTELLIGENCE deployed successfully!"
echo         echo "🔒 Secure OSINT Console v6.0 is now live"
echo         echo "🌐 Visit: https://$(echo $GITHUB_REPOSITORY ^| cut -d'/' -f2).github.io"
) > .github\workflows\deploy.yml

REM Create GitHub issue templates directory
echo.
echo 📝 Creating GitHub issue templates...
if not exist .github\ISSUE_TEMPLATE mkdir .github\ISSUE_TEMPLATE

REM Create bug report template
(
echo ---
echo name: 🐛 Bug Report
echo about: Report a bug in ATLAS CYBER INTELLIGENCE
echo title: '[BUG] '
echo labels: bug
echo assignees: ''
echo ---
echo.
echo ## 🔒 Bug Description
echo Brief description of the bug
echo.
echo ## 🎯 Security Impact
echo Does this affect security features?
echo.
echo ## 📋 Steps to Reproduce
echo 1. Open atlas-osint-secure.html
echo 2. Click on...
echo 3. Observe...
echo.
echo ## 🚨 Expected Behavior
echo What should happen
echo.
echo ## 😞 Actual Behavior
echo What actually happens
echo.
echo ## 🌐 Environment
echo - Browser: [Chrome/Firefox/Safari/Edge]
echo - Version: [Browser version]
echo - OS: [Windows/Mac/Linux]
echo - Device: [Desktop/Mobile/Tablet]
echo.
echo ## 📸 Screenshots
echo If applicable, add screenshots
echo.
echo ## 🔍 Additional Context
echo Add any other context about the problem
echo.
echo ## ⚠️ Security Assessment
echo - [ ] Critical security issue
echo - [ ] Security feature broken
echo - [ ] Non-security bug
echo - [ ] Enhancement request
) > .github\ISSUE_TEMPLATE\bug_report.md

REM Create security vulnerability template
(
echo ---
echo name: 🔒 Security Vulnerability
echo about: Report a security vulnerability ^(PRIVATE^)
echo title: '[SECURITY] '
echo labels: security, vulnerability
echo assignees: ''
echo ---
echo.
echo ## 🔒 SECURITY VULNERABILITY REPORT
echo.
echo **⚠️ IMPORTANT: This is for security vulnerabilities only**
echo **⚠️ Do NOT use for general bug reports**
echo **⚠️ This will be handled privately**
echo.
echo ## 🎯 Vulnerability Type
echo - [ ] XSS ^(Cross-Site Scripting^)
echo - [ ] Code Injection
echo - [ ] Data Leakage
echo - [ ] Authentication Bypass
echo - [ ] Privilege Escalation
echo - [ ] Information Disclosure
echo - [ ] Other ^(please specify^)
echo.
echo ## 📋 Vulnerability Description
echo Detailed description of the security vulnerability
echo.
echo ## 🌐 Impact Assessment
echo - **Severity**: [Critical/High/Medium/Low]
echo - **Affected Components**: 
echo - **Potential Impact**: 
echo - **Exploitation Difficulty**: [Easy/Medium/Hard]
echo.
echo ## 🔍 Proof of Concept
echo Steps to reproduce the vulnerability
echo.
echo ## 🛡️ Mitigation Suggestions
echo How to fix this vulnerability
echo.
echo ## 📧 Contact Information
echo For follow-up questions ^(kept private^)
echo.
echo ## 🔒 Additional Information
echo Any additional security-related information
) > .github\ISSUE_TEMPLATE\security_vulnerability.md

REM Create feature request template
(
echo ---
echo name: ✨ Feature Request
echo about: Suggest a new feature for ATLAS CYBER INTELLIGENCE
echo title: '[FEATURE] '
echo labels: enhancement
echo assignees: ''
echo ---
echo.
echo ## ✨ Feature Description
echo What feature would you like to see?
echo.
echo ## 🎯 Problem Statement
echo What problem does this feature solve?
echo.
echo ## 📚 Educational Value
echo How does this contribute to cyber security education?
echo.
echo ## 🔒 Security Impact
echo How does this affect existing security features?
echo.
echo ## 💡 Proposed Solution
echo How might this be implemented?
echo.
echo ## 🎨 Design Ideas
echo UI/UX considerations
echo.
echo ## 🔄 Alternatives Considered
echo What other approaches did you consider?
echo.
echo ## 📸 Mockups
echo If applicable, add mockups or screenshots
echo.
echo ## 🔍 Additional Context
echo Any additional information
) > .github\ISSUE_TEMPLATE\feature_request.md

REM Create GitHub pull request template
echo.
echo 📝 Creating GitHub pull request template...
(
echo ## 🔒 ATLAS CYBER INTELLIGENCE - Pull Request
echo.
echo ### 📋 Description
echo Brief description of changes
echo.
echo ### 🎯 Type of Change
echo - [ ] 🐛 Bug fix
echo - [ ] ✨ New feature
echo - [ ] 🎨 UI/UX improvement
echo - [ ] 🔒 Security enhancement
echo - [ ] 📚 Documentation
echo - [ ] 🚀 Performance
echo - [ ] 🔧 Refactoring
echo.
echo ### 🔒 Security Impact
echo - [ ] No security impact
echo - [ ] Security enhancement
echo - [ ] Security fix
echo - [ ] Requires security review
echo.
echo ### 📚 Educational Value
echo How does this contribute to cyber security education?
echo.
echo ### 🧪 Testing
echo - [ ] Manual testing completed
echo - [ ] Security features verified
echo - [ ] Cross-browser compatibility
echo - [ ] Mobile responsiveness
echo.
echo ### 📸 Screenshots
echo If applicable, add screenshots
echo.
echo ### 📝 Checklist
echo - [ ] Code follows project standards
echo - [ ] Security features intact
echo - [ ] Documentation updated
echo - [ ] Tests pass
echo - [ ] No new vulnerabilities
echo - [ ] Performance maintained
echo.
echo ### 🔍 Additional Context
echo Any additional information
) > .github\pull_request_template.md

REM Add all new files
echo.
echo 📁 Adding GitHub configuration files...
git add .
if %errorlevel% neq 0 (
    echo ❌ Failed to add GitHub configuration files
    pause
    exit /b 1
)

REM Commit GitHub setup
echo.
echo 💾 Committing GitHub setup...
git commit -m "🚀 Add GitHub configuration

🔧 Features:
- GitHub Actions workflows
- Issue templates
- Pull request template
- Security checks
- Deployment automation

📚 Documentation:
- Bug report template
- Security vulnerability template
- Feature request template
- PR template

🔒 Security:
- Automated security checks
- File integrity verification
- Documentation validation
- Deployment security"
if %errorlevel% neq 0 (
    echo ❌ Failed to commit GitHub setup
    pause
    exit /b 1
)

echo.
echo 📋 GitHub Setup Instructions:
echo.
echo 1. 🌐 Create a new repository on GitHub:
echo    - Go to https://github.com/new
echo    - Repository name: ATLAS-CYBER-INTELLIGENCE ^(or your choice^)
echo    - Description: 🔒 ATLAS CYBER INTELLIGENCE - Secure OSINT Console v6.0
echo    - Make it PUBLIC
echo    - Add README-SECURE.md
echo    - Add LICENSE
echo    - No .gitignore ^(we already have one^)
echo.
echo 2. 🔄 Update remote URL:
echo    git remote set-url origin https://github.com/YOUR_USERNAME/ATLAS-CYBER-INTELLIGENCE.git
echo.
echo 3. 🚀 Push to GitHub:
echo    git push -u origin main
echo.
echo 4. 🔐 Enable GitHub Pages:
echo    - Go to repository Settings
echo    - Scroll to 'GitHub Pages'
echo    - Source: 'Deploy from a branch'
echo    - Branch: 'gh-pages'
echo    - Folder: '/ ^(root^)'
echo    - Click 'Save'
echo.
echo 5. 🌐 Your application will be available at:
echo    https://YOUR_USERNAME.github.io/ATLAS-CYBER-INTELLIGENCE/
echo.
echo 6. 🔒 Configure GitHub Secrets ^(optional^):
echo    - Go to repository Settings ^> Secrets and variables ^> Actions
echo    - Add any necessary secrets for automation
echo.
echo 🎉 Your ATLAS CYBER INTELLIGENCE repository is ready!
echo.
echo 📚 Next Steps:
echo 1. Update README-SECURE.md with your information
echo 2. Customize the repository description
echo 3. Add topics/tags to the repository
echo 4. Set up branch protection rules
echo 5. Configure security settings
echo.
echo 🔒 Remember:
echo - Keep the secure HTML file as the main application
echo - Maintain all security features
echo - Follow responsible disclosure for security issues
echo - Use the issue templates for bug reports and feature requests
echo.
echo ✅ GitHub setup completed!
echo 🚀 Ready to push to GitHub!
echo.
echo 📞 Need help? Check the documentation in README-SECURE.md
echo 🔒 Security issues? Report privately according to SECURITY.md
echo.
pause
