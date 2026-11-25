# Contributing to BD Location Kit

Thank you for your interest in contributing to BD Location Kit! We welcome contributions from the community. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites
- Node.js >= 12.0.0
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bd-location-kit.git
   cd bd-location-kit
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/mehedi-rakib/bd-location-kit.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## Development Workflow

### Create a Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or for fixes
git checkout -b fix/your-bug-fix
```

### Make Changes

1. Make your changes
2. Run tests to ensure nothing breaks
   ```bash
   npm test
   ```

3. Update relevant documentation
4. Add tests for new features

### Commit Changes

```bash
# Stage your changes
git add .

# Commit with clear message
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve issue description"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `chore:` - Maintenance tasks

### Push & Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

## Types of Contributions

### Bug Reports
- Use GitHub Issues to report bugs
- Include steps to reproduce
- Provide expected vs actual behavior
- Include Node.js version and OS

### Feature Requests
- Use GitHub Issues for feature suggestions
- Describe the use case
- Explain expected behavior
- Provide examples if applicable

### Documentation
- Fix typos and unclear sections
- Add examples and use cases
- Improve API documentation
- Update README.md

### Tests
- Add tests for new features
- Improve test coverage
- Test edge cases

### Code Review
- Review open Pull Requests
- Provide constructive feedback
- Help improve code quality

## Testing Guidelines

### Running Tests
```bash
npm test
```

### Writing Tests
- Add tests in `tests/` directory
- Follow existing test patterns
- Aim for high coverage
- Test both success and failure cases

### Test Structure
```javascript
console.log(`\n${colors.yellow}Test X: Description${colors.reset}`);
assert(condition, 'Test message');
```

## Code Style

### Guidelines
- Use consistent naming conventions
- Write clear, self-documenting code
- Add JSDoc comments for functions
- Keep functions focused and small
- Avoid complex nested logic

### JSDoc Format
```javascript
/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return description
 */
function myFunction(paramName) {
  // implementation
}
```

## Documentation Standards

### README.md
- Keep installation simple
- Provide clear examples
- Document all public functions
- Include use cases

### Comments
- Explain WHY, not WHAT
- Use clear, concise language
- Remove outdated comments

### Examples
- Keep examples simple and focused
- Test examples to ensure they work
- Include both basic and advanced usage

## Data Contributions

### Adding/Updating Location Data
- Verify data from official sources
- Maintain bilingual consistency
- Ensure data integrity
- Update build scripts if needed

### Data Structure
```javascript
// Division
{ id, division_name, bn_name, status, url }

// District
{ id, district_name, bn_name, division_id, status, url }

// Area
{ id, name, bn_name, district_id, status, zone_id }
```

## Pull Request Process

1. **Ensure tests pass**
   ```bash
   npm test
   ```

2. **Update documentation** if needed

3. **Provide clear PR description**
   - What problem does this solve?
   - What changes were made?
   - Any breaking changes?
   - Screenshots/examples if applicable

4. **Wait for review** - Maintainers will review and provide feedback

5. **Address feedback** - Make requested changes

6. **Merge** - Once approved, maintainers will merge

## Review Process

When we review your PR, we look for:
- Tests pass
- Code follows style guidelines
- Changes are well-documented
- No breaking changes
- Clear commit messages
- Proper error handling

## Release Process

Releases follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

## Support

- **Questions:** Open an issue with `[question]` tag
- **Bugs:** Open an issue with `[bug]` tag
- **Features:** Open an issue with `[enhancement]` tag
- **Discussions:** Use GitHub Discussions

## Resources

- [GitHub Issues](https://github.com/mehedi-rakib/bd-location-kit/issues)
- [GitHub Discussions](https://github.com/mehedi-rakib/bd-location-kit/discussions)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You

We appreciate all contributions, big or small. Together, we're building better tools for the Bangladesh developer community!

---

Happy Contributing!
