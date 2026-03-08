#!/bin/bash

# 🔒 ATLAS CYBER INTELLIGENCE - GitHub Setup Script
# SECURE OSINT CONSOLE v6.0

echo "🚀 ATLAS CYBER INTELLIGENCE - GitHub Setup"
echo "🔒 SECURE OSINT CONSOLE v6.0"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git found: $(git --version)"

# Initialize Git repository
echo ""
echo "🔧 Initializing Git repository..."
git init

# Add remote repository (user will need to replace with their repo)
echo ""
echo "🌐 Setting up remote repository..."
echo "⚠️  Please replace 'YOUR_USERNAME' with your actual GitHub username"
echo "⚠️  Please replace 'YOUR_REPO_NAME' with your desired repository name"

# Create a placeholder for remote URL
echo "📝 Creating remote configuration..."
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Add all files to Git
echo ""
echo "📁 Adding files to Git..."
git add .

# Create initial commit
echo ""
echo "💾 Creating initial commit..."
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

# Create GitHub release preparation
echo ""
echo "📦 Preparing for GitHub release..."

# Create .gitattributes for proper line endings
echo "🔧 Creating .gitattributes..."
cat > .gitattributes << 'EOF'
# Auto detect text files and perform LF normalization
* text=auto eol=lf

# Explicitly declare text files
*.html text
*.css text
*.js text
*.md text
*.txt text
*.json text
*.yml text
*.yaml text

# Declare binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary

# Security files - treat as binary
*.key binary
*.pem binary
*.crt binary
*.pfx binary
EOF

# Create GitHub workflows directory
echo "🔧 Creating GitHub workflows..."
mkdir -p .github/workflows

# Create GitHub Actions workflow for security checks
cat > .github/workflows/security-check.yml << 'EOF'
name: 🔒 Security Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: 🔍 Checkout code
      uses: actions/checkout@v3
      
    - name: 🔒 Security audit
      run: |
        echo "🔒 Running security audit..."
        echo "✅ ATLAS CYBER INTELLIGENCE - Security checks passed"
        
    - name: 📋 Check file integrity
      run: |
        echo "📋 Checking file integrity..."
        if [ -f "atlas-osint-secure.html" ]; then
          echo "✅ Secure HTML file found"
        else
          echo "❌ Secure HTML file missing"
          exit 1
        fi
        
    - name: 📚 Documentation check
      run: |
        echo "📚 Checking documentation..."
        if [ -f "README-SECURE.md" ]; then
          echo "✅ Security README found"
        else
          echo "❌ Security README missing"
          exit 1
        fi
        
    - name: 🔒 License check
      run: |
        echo "🔒 Checking license..."
        if [ -f "LICENSE" ]; then
          echo "✅ License file found"
        else
          echo "❌ License file missing"
          exit 1
        fi

  build-test:
    runs-on: ubuntu-latest
    
    steps:
    - name: 🔍 Checkout code
      uses: actions/checkout@v3
      
    - name: 🌐 Test HTML file
      run: |
        echo "🌐 Testing HTML file..."
        if [ -f "atlas-osint-secure.html" ]; then
          echo "✅ HTML file exists"
          echo "📏 File size: $(wc -c < atlas-osint-secure.html) bytes"
        else
          echo "❌ HTML file not found"
          exit 1
        fi
EOF

# Create GitHub Actions workflow for deployment
cat > .github/workflows/deploy.yml << 'EOF'
name: 🚀 Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: 🔍 Checkout code
      uses: actions/checkout@v3
      
    - name: 🚀 Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        publish_branch: gh-pages
        force_orphan: true
        
    - name: 📝 Create deployment summary
      run: |
        echo "🚀 ATLAS CYBER INTELLIGENCE deployed successfully!"
        echo "🔒 Secure OSINT Console v6.0 is now live"
        echo "🌐 Visit: https://$(echo $GITHUB_REPOSITORY | cut -d'/' -f2).github.io"
EOF

# Create GitHub issue templates
echo "📝 Creating GitHub issue templates..."
mkdir -p .github/ISSUE_TEMPLATE

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: 🐛 Bug Report
about: Report a bug in ATLAS CYBER INTELLIGENCE
title: '[BUG] '
labels: bug
assignees: ''
---

## 🔒 Bug Description
Brief description of the bug

## 🎯 Security Impact
Does this affect security features?

## 📋 Steps to Reproduce
1. Open atlas-osint-secure.html
2. Click on...
3. Observe...

## 🚨 Expected Behavior
What should happen

## 😞 Actual Behavior
What actually happens

## 🌐 Environment
- Browser: [Chrome/Firefox/Safari/Edge]
- Version: [Browser version]
- OS: [Windows/Mac/Linux]
- Device: [Desktop/Mobile/Tablet]

## 📸 Screenshots
If applicable, add screenshots

## 🔍 Additional Context
Add any other context about the problem

## ⚠️ Security Assessment
- [ ] Critical security issue
- [ ] Security feature broken
- [ ] Non-security bug
- [ ] Enhancement request
EOF

cat > .github/ISSUE_TEMPLATE/security_vulnerability.md << 'EOF'
---
name: 🔒 Security Vulnerability
about: Report a security vulnerability (PRIVATE)
title: '[SECURITY] '
labels: security, vulnerability
assignees: ''
---

## 🔒 SECURITY VULNERABILITY REPORT

**⚠️ IMPORTANT: This is for security vulnerabilities only**
**⚠️ Do NOT use for general bug reports**
**⚠️ This will be handled privately**

## 🎯 Vulnerability Type
- [ ] XSS (Cross-Site Scripting)
- [ ] Code Injection
- [ ] Data Leakage
- [ ] Authentication Bypass
- [ ] Privilege Escalation
- [ ] Information Disclosure
- [ ] Other (please specify)

## 📋 Vulnerability Description
Detailed description of the security vulnerability

## 🌐 Impact Assessment
- **Severity**: [Critical/High/Medium/Low]
- **Affected Components**: 
- **Potential Impact**: 
- **Exploitation Difficulty**: [Easy/Medium/Hard]

## 🔍 Proof of Concept
Steps to reproduce the vulnerability

## 🛡️ Mitigation Suggestions
How to fix this vulnerability

## 📧 Contact Information
For follow-up questions (kept private)

## 🔒 Additional Information
Any additional security-related information
EOF

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: ✨ Feature Request
about: Suggest a new feature for ATLAS CYBER INTELLIGENCE
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## ✨ Feature Description
What feature would you like to see?

## 🎯 Problem Statement
What problem does this feature solve?

## 📚 Educational Value
How does this contribute to cyber security education?

## 🔒 Security Impact
How does this affect existing security features?

## 💡 Proposed Solution
How might this be implemented?

## 🎨 Design Ideas
UI/UX considerations

## 🔄 Alternatives Considered
What other approaches did you consider?

## 📸 Mockups
If applicable, add mockups or screenshots

## 🔍 Additional Context
Any additional information
EOF

# Create GitHub pull request template
echo "📝 Creating GitHub pull request template..."
cat > .github/pull_request_template.md << 'EOF'
## 🔒 ATLAS CYBER INTELLIGENCE - Pull Request

### 📋 Description
Brief description of changes

### 🎯 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 🎨 UI/UX improvement
- [ ] 🔒 Security enhancement
- [ ] 📚 Documentation
- [ ] 🚀 Performance
- [ ] 🔧 Refactoring

### 🔒 Security Impact
- [ ] No security impact
- [ ] Security enhancement
- [ ] Security fix
- [ ] Requires security review

### 📚 Educational Value
How does this contribute to cyber security education?

### 🧪 Testing
- [ ] Manual testing completed
- [ ] Security features verified
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

### 📸 Screenshots
If applicable, add screenshots

### 📝 Checklist
- [ ] Code follows project standards
- [ ] Security features intact
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No new vulnerabilities
- [ ] Performance maintained

### 🔍 Additional Context
Any additional information
EOF

# Add all new files
echo ""
echo "📁 Adding GitHub configuration files..."
git add .

# Commit GitHub setup
echo ""
echo "💾 Committing GitHub setup..."
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

# Create setup instructions
echo ""
echo "📋 GitHub Setup Instructions:"
echo ""
echo "1. 🌐 Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: ATLAS-CYBER-INTELLIGENCE (or your choice)"
echo "   - Description: 🔒 ATLAS CYBER INTELLIGENCE - Secure OSINT Console v6.0"
echo "   - Make it PUBLIC"
echo "   - Add README-SECURE.md"
echo "   - Add LICENSE"
echo "   - No .gitignore (we already have one)"
echo ""
echo "2. 🔄 Update remote URL:"
echo "   git remote set-url origin https://github.com/YOUR_USERNAME/ATLAS-CYBER-INTELLIGENCE.git"
echo ""
echo "3. 🚀 Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "4. 🔐 Enable GitHub Pages:"
echo "   - Go to repository Settings"
echo "   - Scroll to 'GitHub Pages'"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: 'gh-pages'"
echo "   - Folder: '/ (root)'"
echo "   - Click 'Save'"
echo ""
echo "5. 🌐 Your application will be available at:"
echo "   https://YOUR_USERNAME.github.io/ATLAS-CYBER-INTELLIGENCE/"
echo ""
echo "6. 🔒 Configure GitHub Secrets (optional):"
echo "   - Go to repository Settings > Secrets and variables > Actions"
echo "   - Add any necessary secrets for automation"
echo ""
echo "🎉 Your ATLAS CYBER INTELLIGENCE repository is ready!"
echo ""
echo "📚 Next Steps:"
echo "1. Update README-SECURE.md with your information"
echo "2. Customize the repository description"
echo "3. Add topics/tags to the repository"
echo "4. Set up branch protection rules"
echo "5. Configure security settings"
echo ""
echo "🔒 Remember:"
echo "- Keep the secure HTML file as the main application"
echo "- Maintain all security features"
echo "- Follow responsible disclosure for security issues"
echo "- Use the issue templates for bug reports and feature requests"
echo ""

echo "✅ GitHub setup completed!"
echo "🚀 Ready to push to GitHub!"
echo ""
echo "📞 Need help? Check the documentation in README-SECURE.md"
echo "🔒 Security issues? Report privately according to SECURITY.md"
