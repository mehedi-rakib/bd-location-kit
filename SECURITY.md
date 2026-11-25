# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in BD Location Kit, please report it responsibly. **Do not** open a public GitHub issue.

### Reporting Process

1. **Email Security Report** to: `mehedirakib.dev@gmail.com`
   - Subject: `[SECURITY] BD Location Kit - Vulnerability Report`
   - Include detailed description of the vulnerability
   - Provide steps to reproduce if applicable
   - Include your contact information

2. **What to include in your report:**
   - Type of vulnerability (e.g., XSS, SQL Injection, etc.)
   - Location in code (file path, line number)
   - Potential impact
   - Suggested fix (if any)
   - Your name and affiliation (optional)

3. **Response Timeline:**
   - Initial acknowledgment: Within 24 hours
   - Fix development: Within 7 days (depending on severity)
   - Public disclosure: After fix is released

## Security Best Practices

### For Users

1. **Keep BD Location Kit Updated**
   ```bash
   npm update bd-location-kit
   ```

2. **Validate Input**
   - Always validate user input before using location data
   - Use the `validateAddress()` function

3. **Secure Dependencies**
   - BD Location Kit has zero dependencies
   - No third-party security risks

### For Developers

1. **Input Validation**
   - Validate all function parameters
   - Check for valid IDs and ranges
   - Sanitize search queries

2. **Error Handling**
   - Don't expose sensitive error details
   - Return meaningful error messages

3. **Code Review**
   - All PRs are reviewed
   - Security implications are considered

## Known Security Considerations

### None Currently Identified

BD Location Kit is a lightweight data library with:
- Zero external dependencies
- No network requests
- No database connections
- No authentication/authorization logic
- Minimal attack surface

### Design Principles

1. **Simplicity** - Keep codebase simple and auditable
2. **No External Calls** - All data is bundled
3. **No User Input Processing** - Data is static
4. **Transparent** - Full source code available

## Security in Data

### Data Integrity

- All location data is sourced from official Bangladesh government sources
- Data is validated during build process
- Changes to data files are tracked in git

### Privacy

- BD Location Kit does not collect user data
- No tracking or analytics
- All processing happens locally

## Security Updates

### Version Support

- Latest major version receives security updates
- Previous major versions receive critical fixes only
- End-of-life versions do not receive updates

### Update Process

1. Security issue is reported
2. Fix is developed and tested
3. New patch version is released
4. Users are notified via GitHub

## Compliance

### Standards

- MIT License (open source)
- No data handling compliance issues
- No export control restrictions
- Safe for commercial use

## Questions?

If you have security-related questions:
- Email: `mehedirakib.dev@gmail.com`
- GitHub Issues: [Create issue with [security] tag](https://github.com/mehedi-rakib/bd-location-kit/issues)

---

**Last Updated:** November 25, 2026  
**Version:** 1.0.0
