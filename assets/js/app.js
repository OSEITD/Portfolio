const smoothScrollButtons = document.querySelectorAll('[data-scroll]');
smoothScrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = document.querySelector(btn.dataset.scroll);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const typewriterTarget = document.querySelector('.typewriter');
if (typewriterTarget) {
    const phrases = [
        'Building human-grade software.',
        'Scaling agritech for Zambia.',
        'Shipping experiential storefronts.',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const currentPhrase = phrases[phraseIndex];
        if (deleting) {
            charIndex = Math.max(charIndex - 1, 0);
        } else if (charIndex < currentPhrase.length) {
            charIndex += 1;
        } else {
            deleting = true;
            setTimeout(tick, 1600);
            return;
        }

        typewriterTarget.textContent = currentPhrase.slice(0, charIndex);

        if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const delay = deleting ? 40 : 90;
        setTimeout(tick, delay);
    };

    tick();
}

const terminalOutput = document.getElementById('terminalOutput');
const terminalForm = document.getElementById('terminalForm');
const terminalInput = document.getElementById('terminalInput');

const commands = {
    help: 'commands: help, about, skills, projects, contact, clear',
    about:
        'Osei Mupeta — full-stack dev crafting immersive UX and production-grade systems for founders in Lusaka and beyond.',
    skills:
        'TypeScript · React · Node · Jamstack · PWA · Tailwind · Netlify · CI/CD · Product strategy',
    projects:
        'ZamGrow (agritech intelligence) | Dreamy Frosted Bites (artisan commerce) | GitHub.com/OSEITD for more drops.',
    contact:
        'WhatsApp: +260 761 986 849 | FB: osei.mupeta | LinkedIn: osei-mupeta-88544a27 | IG: @osei_blue | GitHub: OSEITD',
};

const printLine = (text, className = '') => {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = `line ${className}`.trim();
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputValue = terminalInput.value.trim().toLowerCase();
        if (!inputValue) return;

        printLine(`$ ${inputValue}`, 'system');

        if (inputValue === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (commands[inputValue]) {
            printLine(commands[inputValue]);
        } else {
            printLine(`command not found: ${inputValue}`);
        }

        terminalInput.value = '';
    });
}
