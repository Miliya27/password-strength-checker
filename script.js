/**
 * PASSWORD CHECKER & GENERATOR
 * Portfolio Project: HTML/CSS/JS
 */

// --- 1. ELEMENT SELECTIONS ---
const password = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.querySelector('#strength-text span');

const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedPassDisplay = document.getElementById('generatedPassDisplay');

// --- 2. PASSWORD STRENGTH CHECKER ---

// Toggle visibility (Show/Hide)
toggleBtn.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    toggleBtn.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Real-time Validation
password.addEventListener('input', () => {
    const val = password.value;
    let score = 0;

    // Requirements logic using Regex
    const requirements = [
        { id: 'len',  met: val.length >= 8 },
        { id: 'up',   met: /[A-Z]/.test(val) },
        { id: 'num',  met: /[0-9]/.test(val) },
        { id: 'spec', met: /[!@#$%^&*]/.test(val) }
    ];

    requirements.forEach(req => {
        const element = document.getElementById(req.id);
        if (req.met) {
            element.classList.replace('invalid', 'valid');
            score++;
        } else {
            element.classList.replace('valid', 'invalid');
        }
    });

    updateUI(score);
});

// Update Strength Bar Colors and Text
function updateUI(score) {
    const states = [
        { color: '#ddd', width: '0%', text: 'None' },
        { color: '#ff4d4d', width: '25%', text: 'Weak' },
        { color: '#ffa500', width: '50%', text: 'Medium' },
        { color: '#9acd32', width: '75%', text: 'Good' },
        { color: '#27ae60', width: '100%', text: 'Strong' }
    ];

    const current = states[score];
    strengthBar.style.width = current.width;
    strengthBar.style.backgroundColor = current.color;
    strengthText.textContent = current.text;
    strengthText.style.color = current.color;
}

// --- 3. GENERATOR & CLIPBOARD LOGIC ---

// Generate a random 16-character string
generateBtn.addEventListener('click', () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
    }
    
    // Display in UI
    generatedPassDisplay.textContent = newPassword;
    
    // Fill the input and trigger the 'input' event to update the checker bar
    password.value = newPassword;
    password.dispatchEvent(new Event('input'));
});

// Copy to Clipboard with Feedback
copyBtn.addEventListener('click', () => {
    const textToCopy = generatedPassDisplay.textContent;
    
    if (textToCopy === "—— —— ——" || textToCopy === "") return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalIcon = copyBtn.textContent;
        copyBtn.textContent = "✅"; // Show success checkmark
        
        // Reset icon after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = originalIcon;
        }, 2000);
    });
});