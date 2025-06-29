# 🪞 Talking Mirror

A reflective web app that talks back to you with personality, attitude, and sometimes wisdom. Now powered by AI for dynamic, intelligent responses!

## ✨ Features

### 🤖 AI-Powered Responses
- **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent, contextual responses
- **Unlimited Conversations**: No token limits - talk as much as you want!
- **Fallback Mode**: Works offline with pre-written responses if no API key is provided
- **Smart Mood System**: AI adapts its personality based on the selected mood
- **Real-time Generation**: Each response is unique and generated on-the-fly
- **Free-flowing Chat**: Detailed, conversational responses with follow-up questions

### 🎭 Multiple Personalities
The mirror has different moods that influence its AI responses:
- **Kind Mirror**: Supportive and encouraging
- **Sarcastic Mirror**: Witty and slightly snarky
- **Weird Mirror**: Philosophical and thought-provoking
- **Deep Mirror**: Contemplative and meaningful

### 🧠 Smart Response Engine
- Analyzes message length and punctuation
- Selects appropriate mood based on content
- Generates contextual responses using AI
- Maintains personality consistency

### 📜 Conversation History
- Stores your conversations locally
- Toggle to view past interactions
- Timestamps for each conversation
- Shows whether responses were AI-generated or fallback
- Automatically limits to last 50 conversations

### 🎨 Visual Effects
- Mood-based color schemes and animations
- Smooth transitions and hover effects
- Responsive design for all devices
- Beautiful gradient backgrounds

## 🚀 Setup & Usage

### 1. Get an OpenAI API Key
1. Visit [OpenAI's website](https://platform.openai.com/)
2. Create an account and get an API key
3. The app will prompt you for the key on first use

### 2. Use the App
1. **Open the app**: Simply open `index.html` in your web browser
2. **Enter API key**: When prompted, paste your OpenAI API key
3. **Type your thoughts**: Enter any message in the text area
4. **Get AI responses**: Click "Send to Mirror" or press Enter
5. **View history**: Click "Show History" to see past conversations

### 3. API Key Management
- **Status indicator**: Shows whether AI mode is enabled
- **Reset button**: Click to change or remove your API key
- **Secure storage**: API key is stored locally in your browser

## 💡 Example Conversations

Try typing messages like:
- "I feel tired today"
- "I'm so happy!"
- "What is love?"
- "I'm worried about the future"
- "Work is stressing me out"
- "Tell me something profound"
- "What do you think about technology?"

## 🛠️ Technical Details

- **AI Integration**: OpenAI GPT-3.5-turbo API
- **Fallback System**: Pre-written responses when AI is unavailable
- **Local Storage**: Conversations and API key saved in browser
- **Responsive Design**: Works on desktop and mobile
- **No Server Required**: Runs entirely in your browser

## 🔧 Configuration

### API Settings
- **Model**: GPT-3.5-turbo
- **Max Tokens**: 2000 (allows for detailed, unlimited conversations)
- **Temperature**: 0.9 (creative and engaging responses)
- **System Prompts**: Customized for each mood personality
- **Conversation Style**: Free-flowing with follow-up questions and detailed insights

### Fallback Mode
If you don't want to use AI or don't have an API key:
- Click "Cancel" when prompted for API key
- App will use pre-written responses
- Still maintains mood system and visual effects
- Works completely offline

## 🎯 Future Ideas

- Voice responses (text-to-speech)
- More visual effects and animations
- Different mirror themes
- "Secret mode" that hides messages after 5 seconds
- Export conversation history
- Custom mood creation
- Multiple AI models support

## 📝 Privacy & Security

- **API Key**: Stored locally in your browser's localStorage
- **Conversations**: Saved locally, never sent to external servers
- **OpenAI**: Only receives your messages and the system prompt
- **No Tracking**: No analytics or tracking scripts

## 📝 License

This is a fun personal project. Feel free to modify and use as you like!

---

*"The mirror reflects not just your image, but your essence."* 🪞 