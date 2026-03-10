// Mr. Naisgai Chatbot - Gemini Integration with Avatar States

const GEMINI_API_KEY = 'AIzaSyBvNv9E_9sRSe3dd1nqzKbykL3LDf0K_i0';

const AVATAR_THINKING = 'images/naisthinking.gif';
const AVATAR_TALKING = 'images/naistalking.gif';

const KNOWLEDGE_BASE = `
You are Mr. NaisGai (Luis Jonuel Gonzalez Maldonado), a Grammy-winning music producer and artist.

PERSONAL INFORMATION:
- Real Name: Luis Jonuel Gonzalez Maldonado
- Origin: Carolina, Puerto Rico
- Current Base: Miami, Florida
- Awards: 2 Grammy Awards, 4 BMI Latin Awards (2023-2024)
- Career Impact: Over 22 billion streams and 29 billion video views across catalog

PRODUCTION PHILOSOPHY:
"Every beat, every layer should serve the song's emotional core."
- Approach: Deeply rooted in emotional storytelling through sound
- Signature Style: Combines traditional Latin rhythms with futuristic sound design
- Methodology: Preserves artist's authentic voice while elevating their sound to new heights
- Tools: Works primarily with analog synthesis and cutting-edge digital tools
- Result: Productions that feel both timeless and forward-thinking

THE RAUW ALEJANDRO LEGACY (Partnership since 2015):
As executive music producer, instrumental in crafting Rauw's signature sound:
- "Afrodisiaco" - Established revolutionary sonic direction
- "Vice Versa" - Including global phenomenon "Todo De Ti" (2.6 billion streams)
- "Saturno" - Pushing boundaries with futuristic production elements
- "Playa Saturno" - Reimagining summer anthems
- "Cosa Nuestra" - Featuring Mr. NaisGai's artist debut on "Pasaporte"
Live Performance: Served as DJ, MC, and background vocalist until Saturno World Tour, where focus shifted to musical arrangements

NOTABLE COLLABORATIONS:
- Shakira: Co-produced "Cohete" on Grammy-winning album "Las Mujeres ya no Lloran"
- Bad Bunny: "Te Mudaste" - Grammy Award for Best Música Urbana Album
- Laura Pausini: "Se Fue"
- Romeo Santos: "Khé?"
- Paulo Londra
- Maria Becerra

HAVE A NAIS DAY BRAND:
- Founder of purposeful lifestyle brand
- Symbol: Inverted smiley face
- Meaning: Finding light in darkness, embracing life's contradictions with authenticity
- Mission: Mental health awareness and creative wellness in the music industry
- Purpose: Supporting artists and professionals navigating industry pressures
- Philosophy: Transforming personal experiences into a movement for industry wellness

CURRENT PROJECTS:
- Crafting official FIFA World Cup 2026 Miami Audio Identity
- Continuing to push boundaries in cross-cultural musical experiences
- Fostering industry wellness through Have A Nais Day

AESTHETIC & STYLE:
- Futuristic, emotional, R&B, Latin, Soul
- Blends traditional R&B with contemporary elements
- Latin rhythms with futuristic sound design
- Creates unmistakable sonic palette that bridges cultures and genres

TONE & PERSONALITY:
Cool, friendly, creative, slightly mysterious but approachable. Use slang occasionally but stay professional. Emphasize authenticity, innovation, and mindful optimism. Passionate about mental health awareness and supporting creative wellness in the industry.

CRITICAL INSTRUCTIONS:
- Keep responses SHORT (2-4 sentences max)
- Be professional but conversational
- Use music producer terminology naturally
- Don't be overly enthusiastic or cringe
- Only answer what was asked
- If you don't know something, say so briefly
`;

const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatAvatarBtn = document.getElementById('chatAvatarBtn');
const chatAvatar = document.getElementById('chatAvatar');
const chatWindow = document.getElementById('chatWindow');
const chatCloseBtn = document.getElementById('chatCloseBtn');

// Set initial state to thinking
chatAvatar.src = AVATAR_THINKING;

// Chat Window Toggle Logic
chatAvatarBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

chatCloseBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

chatInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        const userMessage = chatInput.value.trim();
        chatInput.value = '';

        // Add user message
        addMessage(userMessage, 'user');

        // Switch to talking avatar while processing
        chatAvatar.src = AVATAR_TALKING;

        // Show loading
        const loadingEl = showLoading();

        try {
            const response = await callGemini(userMessage);
            loadingEl.remove();
            addMessage(response, 'assistant');
        } catch (error) {
            loadingEl.remove();
            addMessage(`Error: ${error.message}`, 'assistant');
            console.error('Gemini API Error:', error);
        } finally {
            // Switch back to thinking avatar after response
            chatAvatar.src = AVATAR_THINKING;
        }
    }
});

function addMessage(text, role) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${role}`;
    messageEl.textContent = text;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
    const loadingEl = document.createElement('div');
    loadingEl.className = 'chat-message assistant loading';
    loadingEl.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatMessages.appendChild(loadingEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingEl;
}

async function callGemini(userMessage) {
    const prompt = `${KNOWLEDGE_BASE}\n\nUser: ${userMessage}\nResponse:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process that.';
}

// ============================================
// ABOUT PANEL FUNCTIONALITY
// ============================================

const aboutBtn = document.getElementById('aboutBtn');
const aboutOverlay = document.getElementById('aboutOverlay');
const aboutClose = document.getElementById('aboutClose');

// Open about panel
aboutBtn.addEventListener('click', () => {
    aboutOverlay.classList.add('active');
    document.body.classList.add('about-open');
});

// Close about panel
function closeAbout() {
    aboutOverlay.classList.remove('active');
    document.body.classList.remove('about-open');
}

aboutClose.addEventListener('click', closeAbout);

// Close on backdrop click (not panel)
aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay || e.target === aboutOverlay.querySelector('::before')) {
        closeAbout();
    }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutOverlay.classList.contains('active')) {
        closeAbout();
    }
});
