# 🛡️ Interactive Password Security Suite

A professional-grade, client-side password strength validator and generator. This tool helps users create secure passwords by providing real-time feedback against security best practices and common "blacklist" patterns.

## ✨ Key Features
- **Real-time Validation:** Instant feedback on length, casing, numbers, and special characters.
- **Security Blacklist:** Automatically flags common, guessable passwords (e.g., "123456", "password").
- **Smart Strength Meter:** A dynamic, color-coded visual indicator of overall security.
- **Secure Password Generator:** Creates 16-character high-entropy strings with a one-click copy feature.
- **Privacy Focused:** 100% client-side logic; passwords never leave the user's browser.

## 🛠️ Technical Implementation
- **Regular Expressions (Regex):** Used for complex pattern matching to validate password criteria.
- **DOM Manipulation:** High-performance UI updates using vanilla JavaScript event listeners.
- **Clipboard API:** Modern implementation of "Copy to Clipboard" with temporary visual success states.
- **CSS Transitions:** Smooth UI animations for the strength bar and status indicators.

## 📂 Project Structure
- `index.html`: Semantic HTML5 structure.
- `style.css`: Custom UI styling with Flexbox and responsive design.
- `script.js`: Core logic, including security algorithms and generator functions.

## 📝 How to Use
1. Clone the repository: `git clone https://github.com/YOUR_USERNAME/password-strength-checker.git`
2. Open `index.html` in your browser.
3. Test your password or generate a new one!
