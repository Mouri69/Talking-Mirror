class TalkingMirror {
    constructor() {
        this.history = this.loadHistory();
        this.moods = ['kind', 'sarcastic', 'weird', 'deep'];
        this.apiKey = this.getApiKey();
        this.isUsingAI = !!this.apiKey;
        
        // Fallback responses for when AI is not available
        this.fallbackResponses = {
            kind: [
                "That's an interesting thought. Thank you for sharing it with me.",
                "I appreciate you taking the time to reflect on this.",
                "Your perspective matters, even if it's just to this mirror.",
                "Sometimes the simplest thoughts are the most profound.",
                "You're doing better than you think you are."
            ],
            sarcastic: [
                "Wow, that's... something. Thanks for that.",
                "How very philosophical of you.",
                "Groundbreaking stuff here, really.",
                "I'm sure that made sense in your head.",
                "Fascinating. Truly fascinating."
            ],
            weird: [
                "Have you ever wondered if mirrors are just windows to other dimensions?",
                "Maybe you're not typing to me, maybe I'm typing to you.",
                "What if this conversation is just a glitch in the matrix?",
                "Are you sure you're real, or am I just dreaming you?",
                "Have you tried turning your reality off and on again?"
            ],
            deep: [
                "Every thought you have changes the universe in some small way.",
                "Perhaps the answers you seek are already within you.",
                "The mirror reflects not just your image, but your essence.",
                "In the grand scheme of things, we're all just stardust having thoughts.",
                "The question isn't always as important as the asking."
            ]
        };
        
        this.keywordResponses = {
            tired: {
                kind: ["Maybe you need some rest. Your body is telling you something important.", "Take a moment to breathe. You've been working hard."],
                sarcastic: ["Oh, tired? How original. Maybe try sleeping instead of complaining about it.", "Tired? In this economy? Groundbreaking."],
                weird: ["Have you ever wondered if sleep is just death being shy?", "Maybe you're not tired, maybe you're just allergic to consciousness."],
                deep: ["Fatigue is often the body's way of asking for what the mind refuses to acknowledge."]
            },
            happy: {
                kind: ["Your happiness is contagious! Keep spreading that joy.", "I'm glad you're feeling good. You deserve it."],
                sarcastic: ["Oh great, another happy person. How novel.", "Happiness? In this timeline? Color me surprised."],
                weird: ["Are you sure you're happy, or are you just experiencing a temporary chemical imbalance in your brain?", "Happiness is just sadness that hasn't happened yet."],
                deep: ["Happiness is not something ready-made. It comes from your own actions."]
            },
            sad: {
                kind: ["It's okay to feel sad. Your feelings are valid and temporary.", "I'm here to listen. You're not alone in this."],
                sarcastic: ["Oh no, feelings. How inconvenient.", "Sadness? How very human of you."],
                weird: ["Maybe you're not sad, maybe you're just experiencing a gravitational pull towards melancholy.", "Have you tried turning your emotions off and on again?"],
                deep: ["The wound is the place where the light enters you."]
            },
            love: {
                kind: ["Love is beautiful, even when it's complicated. Hold onto that feeling.", "Your capacity to love is one of your greatest strengths."],
                sarcastic: ["Love? How very Disney of you.", "Ah yes, the chemical reaction that makes people do stupid things."],
                weird: ["Love is just your brain releasing oxytocin to trick you into reproducing.", "Have you ever wondered if love is just a social construct?"],
                deep: ["Love is not about finding the perfect person, but about seeing an imperfect person perfectly."]
            },
            work: {
                kind: ["You're doing great. Remember to take breaks and be kind to yourself.", "Your work matters, even when it doesn't feel like it."],
                sarcastic: ["Work? That thing that pays for things? How novel.", "Ah yes, the daily grind. How very capitalist of you."],
                weird: ["Have you ever wondered if work is just a simulation to keep us busy?", "Maybe work is just adult daycare with better snacks."],
                deep: ["Work is not always about what you do, but who you become while doing it."]
            },
            future: {
                kind: ["The future is full of possibilities. You have the power to shape it.", "Take it one step at a time. You're doing better than you think."],
                sarcastic: ["The future? That thing that hasn't happened yet? How profound.", "Ah yes, the mystical land of 'someday'."],
                weird: ["Have you ever wondered if the future is just the past with better technology?", "Maybe the future is just now, but later."],
                deep: ["The future belongs to those who believe in the beauty of their dreams."]
            }
        };
        
        this.init();
    }
    
    init() {
        this.userInput = document.getElementById('userInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.responseBox = document.getElementById('response');
        this.toggleHistoryBtn = document.getElementById('toggleHistory');
        this.historyLog = document.getElementById('historyLog');
        this.historyContent = document.getElementById('historyContent');
        
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
            }
        });
        this.toggleHistoryBtn.addEventListener('click', () => this.toggleHistory());
        
        this.displayHistory();
        this.showApiStatus();
    }
    
    getApiKey() {
        // Check if API key is stored in localStorage
        let apiKey = localStorage.getItem('talkingMirrorApiKey');
        
        // If no API key is stored, prompt the user
        if (!apiKey) {
            apiKey = prompt('Enter your OpenAI API key to enable AI responses (or click Cancel to use fallback responses):');
            if (apiKey) {
                localStorage.setItem('talkingMirrorApiKey', apiKey);
            }
        }
        
        return apiKey;
    }
    
    showApiStatus() {
        const status = this.isUsingAI ? 
            '🤖 AI Mode: Enabled' : 
            '📝 Fallback Mode: Using pre-written responses';
        
        // Add status to the header
        const header = document.querySelector('header');
        const statusDiv = document.createElement('div');
        statusDiv.className = 'api-status';
        statusDiv.innerHTML = `
            <span>${status}</span>
            <button onclick="talkingMirror.resetApiKey()" class="reset-btn">Reset API Key</button>
        `;
        header.appendChild(statusDiv);
    }
    
    resetApiKey() {
        localStorage.removeItem('talkingMirrorApiKey');
        this.apiKey = null;
        this.isUsingAI = false;
        location.reload();
    }
    
    async handleSubmit() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Show typing animation
        this.showTyping();
        
        try {
            const response = await this.generateResponse(message);
            this.displayResponse(response);
            this.saveToHistory(message, response);
            this.userInput.value = '';
        } catch (error) {
            console.error('Error generating response:', error);
            this.displayError();
        }
    }
    
    showTyping() {
        this.responseBox.innerHTML = '<p class="typing">The mirror is thinking...</p>';
        this.responseBox.className = 'response-box';
    }
    
    displayError() {
        this.responseBox.innerHTML = '<p style="color: #e74c3c;">The mirror seems to be foggy today. Try again in a moment.</p>';
        this.responseBox.className = 'response-box';
    }
    
    async generateResponse(message) {
        const mood = this.selectMood(message);
        
        if (this.isUsingAI) {
            return await this.generateAIResponse(message, mood);
        } else {
            return this.generateFallbackResponse(mood);
        }
    }
    
    async generateAIResponse(message, mood) {
        const systemPrompt = this.getSystemPrompt(mood);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 150,
                temperature: 0.8
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();
        
        return {
            text: aiResponse,
            mood: mood
        };
    }
    
    getSystemPrompt(mood) {
        const prompts = {
            kind: `You are a kind and supportive talking mirror. Respond with warmth, encouragement, and gentle wisdom. Keep responses under 100 words. Be genuinely caring and uplifting.`,
            sarcastic: `You are a sarcastic talking mirror with a witty attitude. Respond with clever sarcasm, dry humor, and playful snark. Keep responses under 100 words. Be funny but not mean.`,
            weird: `You are a weird and philosophical talking mirror. Respond with strange questions, existential thoughts, and quirky observations. Keep responses under 100 words. Be thought-provoking and slightly odd.`,
            deep: `You are a deep and contemplative talking mirror. Respond with profound insights, meaningful reflections, and thoughtful wisdom. Keep responses under 100 words. Be philosophical and inspiring.`
        };
        
        return prompts[mood] || prompts.kind;
    }
    
    generateFallbackResponse(mood) {
        const responses = this.fallbackResponses[mood];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return {
            text: randomResponse,
            mood: mood
        };
    }
    
    selectMood(message) {
        const length = message.length;
        const hasQuestion = message.includes('?');
        const hasExclamation = message.includes('!');
        
        // Longer messages tend to be more serious/deep
        if (length > 100) {
            return Math.random() < 0.6 ? 'deep' : this.moods[Math.floor(Math.random() * this.moods.length)];
        }
        
        // Questions often get weird responses
        if (hasQuestion) {
            return Math.random() < 0.5 ? 'weird' : this.moods[Math.floor(Math.random() * this.moods.length)];
        }
        
        // Exclamations often get sarcastic responses
        if (hasExclamation) {
            return Math.random() < 0.5 ? 'sarcastic' : this.moods[Math.floor(Math.random() * this.moods.length)];
        }
        
        // Random mood selection
        return this.moods[Math.floor(Math.random() * this.moods.length)];
    }
    
    displayResponse(response) {
        this.responseBox.innerHTML = `<p>${response.text}</p>`;
        this.responseBox.className = `response-box ${response.mood}`;
    }
    
    saveToHistory(userMessage, response) {
        const historyItem = {
            userMessage: userMessage,
            mirrorResponse: response.text,
            mood: response.mood,
            timestamp: new Date().toLocaleString(),
            isAI: this.isUsingAI
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 conversations
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.displayHistory();
    }
    
    displayHistory() {
        if (this.history.length === 0) {
            this.historyContent.innerHTML = '<p style="text-align: center; color: #888;">No conversations yet. Start talking to the mirror!</p>';
            return;
        }
        
        this.historyContent.innerHTML = this.history.map(item => `
            <div class="history-item">
                <div class="user-message">"${item.userMessage}"</div>
                <div class="mirror-response">
                    🪞 ${item.mirrorResponse}
                    ${item.isAI ? '<span class="ai-badge">🤖 AI</span>' : '<span class="fallback-badge">📝</span>'}
                </div>
                <div class="timestamp">${item.timestamp}</div>
            </div>
        `).join('');
    }
    
    toggleHistory() {
        const isHidden = this.historyLog.classList.contains('hidden');
        
        if (isHidden) {
            this.historyLog.classList.remove('hidden');
            this.toggleHistoryBtn.textContent = '📜 Hide History';
        } else {
            this.historyLog.classList.add('hidden');
            this.toggleHistoryBtn.textContent = '📜 Show History';
        }
    }
    
    saveHistory() {
        localStorage.setItem('talkingMirrorHistory', JSON.stringify(this.history));
    }
    
    loadHistory() {
        const saved = localStorage.getItem('talkingMirrorHistory');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when the page loads
let talkingMirror;
document.addEventListener('DOMContentLoaded', () => {
    talkingMirror = new TalkingMirror();
}); 