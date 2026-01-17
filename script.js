const password = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.querySelector('#strength-text span');

// 1. Toggle Password Visibility
toggleBtn.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    toggleBtn.textContent = type === 'password' ? 'Show' : 'Hide';
});

// 2. Validation Logic
password.addEventListener('input', () => {
    const val = password.value;
    let score = 0;

    // Requirements Mapping
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

    // 3. Update UI based on score
    updateUI(score);
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