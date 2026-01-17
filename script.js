
const commonPasswords = [
    '12345678', 'password', 'password123', 'qwertyuiop', 
    'admin123', 'welcome1', 'letmein123', 'iloveyou'
];


const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.querySelector('#strength-text span');
const warningText = document.getElementById('blacklist-warning');

const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedPassDisplay = document.getElementById('generatedPassDisplay');



// Toggle visibility (Show/Hide)
toggleBtn.addEventListener('click', () => {
    const isPass = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPass ? 'text' : 'password');
    toggleBtn.textContent = isPass ? 'Hide' : 'Show';
});

// Real-time Validation
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const lowerVal = val.toLowerCase();
    let score = 0;

    // Check against blacklist
    const isBlacklisted = commonPasswords.includes(lowerVal);

    // Criteria Mapping
    const criteria = [
        { id: 'len',  met: val.length >= 8 },
        { id: 'up',   met: /[A-Z]/.test(val) },
        { id: 'num',  met: /[0-9]/.test(val) },
        { id: 'spec', met: /[!@#$%^&*]/.test(val) }
    ];

    
    criteria.forEach(item => {
        const element = document.getElementById(item.id);
        if (item.met && !isBlacklisted) {
            element.classList.replace('invalid', 'valid');
            score++;
        } else {
            element.classList.replace('valid', 'invalid');
        }
    });

    // Handle Blacklist Warning Visibility
    if (isBlacklisted) {
        warningText.style.display = 'block';
        updateUI(1); // Force "Weak" status
    } else {
        warningText.style.display = 'none';
        updateUI(val === "" ? 0 : score);
    }
});

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


generateBtn.addEventListener('click', () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    
    // Generate 16 random characters
    for (let i = 0; i < 16; i++) {
        newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    generatedPassDisplay.textContent = newPassword;
    
    // Fill the checker automatically
    passwordInput.value = newPassword;
    passwordInput.dispatchEvent(new Event('input'));
});

copyBtn.addEventListener('click', () => {
    const text = generatedPassDisplay.textContent;
    if (text === "—— —— ——" || text === "") return;

    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = copyBtn.textContent;
        copyBtn.textContent = "✅";
        setTimeout(() => copyBtn.textContent = originalIcon, 2000);
    });
});