# Contributing to AiTutor

Thank you for your interest in contributing to AiTutor! This document provides guidelines for contributing to our AI-powered tutoring chatbot.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** first to avoid duplicates
2. **Use the issue templates** when creating new issues
3. **Provide detailed information**:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots or error messages
   - Browser/device information

### Suggesting Features

We welcome feature suggestions! Please:

1. **Check existing feature requests** first
2. **Describe the use case** and how it would benefit users
3. **Provide mockups or examples** if possible
4. **Consider the impact** on existing functionality

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/aitutor.git
   cd aitutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## 📝 Code Standards

### TypeScript

- Use strict TypeScript configuration
- Add proper type annotations
- Avoid `any` types
- Use interfaces for object shapes

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Ensure responsive design
- Maintain consistent spacing

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions small and focused

## 🧪 Testing

### Manual Testing

Before submitting a PR, please test:

- [ ] All existing functionality works
- [ ] New features work as expected
- [ ] Responsive design on different screen sizes
- [ ] Accessibility features
- [ ] Performance impact

### Testing Checklist

- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS Safari, Android Chrome)
- [ ] Different screen sizes
- [ ] Voice features (if applicable)
- [ ] Code block functionality
- [ ] Chat persistence

## 📋 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests if applicable
   - Update documentation if needed

3. **Test thoroughly**
   - Run all existing tests
   - Test your changes manually
   - Check for regressions

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### PR Guidelines

1. **Use descriptive titles** that explain what the PR does
2. **Provide detailed descriptions** of changes made
3. **Link related issues** using keywords like "Fixes #123"
4. **Include screenshots** for UI changes
5. **Keep PRs focused** - one feature/fix per PR

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ChatArea.tsx    # Main chat interface
│   ├── CodeBlock.tsx   # Code display component
│   ├── InputArea.tsx   # Message input
│   ├── MessageBubble.tsx # Individual messages
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── ...
├── services/           # API and utility services
│   ├── aiService.ts    # AI API integration
│   ├── storageService.ts # Local storage
│   └── voiceService.ts # Voice features
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.css           # Global styles
```

## 🎯 Areas for Contribution

### High Priority

- **Performance optimizations**
- **Accessibility improvements**
- **Mobile UX enhancements**
- **Error handling**
- **Documentation**

### Medium Priority

- **New AI model integrations**
- **Additional voice features**
- **Theme customization**
- **Export functionality**
- **Analytics integration**

### Low Priority

- **Advanced code highlighting**
- **Plugin system**
- **Multi-language support**
- **Advanced search**
- **Collaboration features**

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details**
   - Browser and version
   - Operating system
   - Device type (desktop/mobile)

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Additional context**
   - Screenshots or videos
   - Console errors
   - Network requests (if relevant)

## 💡 Feature Requests

For feature requests, please provide:

1. **Problem description**
   - What problem does this solve?
   - Who would benefit from this?

2. **Proposed solution**
   - How should this work?
   - Any design considerations?

3. **Alternatives considered**
   - What other approaches were considered?
   - Why is this the best solution?

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: [Contact information if available]

## 📄 License

By contributing to AiTutor, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to AiTutor! 🚀
