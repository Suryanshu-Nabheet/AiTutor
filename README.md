# AiTutor

A modern, feature-rich AI-powered coding assistant built with React, TypeScript, and Vite. Experience fast, intelligent responses powered by Qwen 2.5 Coder through OpenRouter.

![AiTutor](https://img.shields.io/badge/AI-Powered-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-blue)

---

## 🚀 Features

### Core Capabilities
- **AI-Powered Responses**: Leverages Qwen 2.5 Coder (32B) via OpenRouter for intelligent coding assistance
- **Real-Time Typing Animation**: Smooth character-by-character display of AI responses
- **Code Block Rendering**: Automatic syntax highlighting with copy-to-clipboard functionality
- **Voice Integration**: Text-to-speech for AI responses and speech-to-text for input
- **Conversation Management**: Create, save, and manage multiple conversation threads
- **Persistent Storage**: Local storage integration for conversation history

### User Experience
- **Beautiful UI**: Modern, glassmorphic design with smooth animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark Theme**: Easy on the eyes with a professional dark interface
- **Fast Performance**: Optimized with Vite for lightning-fast development and build times

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3**: Modern React with hooks and concurrent features
- **TypeScript 5.5**: Type-safe development
- **Vite 5.4**: Next-generation frontend tooling

### Styling & UI
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon library
- **Custom Glassmorphism**: Modern glass-effect UI components

### AI Integration
- **OpenRouter API**: Access to Qwen 2.5 Coder model
- **Streaming Support**: Real-time response generation
- **Context Management**: Intelligent conversation history handling

### Additional Features
- **Local Storage API**: Client-side data persistence
- **Web Speech API**: Voice recognition and synthesis
- **Markdown Parsing**: Code block extraction and rendering

---

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suryanshu-Nabheet/AiTutor.git
   cd AiTutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   The OpenRouter API key is pre-configured in the application. No additional setup required.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🎯 Usage

### Starting a Conversation
1. Open the application in your browser
2. Type your question or request in the input field
3. Press Enter or click the send button
4. Watch as the AI responds with a smooth typing animation

### Managing Conversations
- **New Conversation**: Click the "New Conversation" button in the sidebar
- **Switch Conversations**: Click on any conversation in the sidebar to view its history
- **Delete Conversations**: Hover over a conversation and click the delete icon

### Voice Features
- **Voice Input**: Click the microphone icon to dictate your message
- **Read Aloud**: Click "Read aloud" on any AI response to hear it spoken

### Code Blocks
- AI responses automatically detect and format code blocks
- Click the "Copy code" button to copy code to clipboard
- Syntax highlighting for multiple programming languages

---

## 🔧 Configuration

### API Configuration
The application uses OpenRouter to access the Qwen 2.5 Coder model. The API configuration is located in:
```
src/services/aiService.ts
```

### Customization Options
- **Typing Speed**: Adjust in `src/components/MessageBubble.tsx` (default: 10ms per character)
- **Max Tokens**: Configure in `src/services/aiService.ts` (default: 2000)
- **Conversation History**: Limit set to 10 messages in `src/services/aiService.ts`

---

## 📁 Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── ChatArea.tsx    # Main chat display area
│   │   ├── CodeBlock.tsx   # Code block with copy button
│   │   ├── InputArea.tsx   # Message input component
│   │   ├── MessageBubble.tsx # Individual message display
│   │   ├── Sidebar.tsx     # Conversation sidebar
│   │   └── WelcomeScreen.tsx # Initial welcome screen
│   ├── services/            # Business logic services
│   │   ├── aiService.ts    # AI API integration
│   │   ├── storageService.ts # Local storage handling
│   │   └── voiceService.ts # Speech recognition/synthesis
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts        # Global type definitions
│   ├── utils/               # Utility functions
│   │   └── markdown.ts     # Markdown parsing logic
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

---

## 🎨 Design Philosophy

### Visual Design
- **Glassmorphism**: Modern frosted-glass effects for UI elements
- **Blue Accent Colors**: Professional and trustworthy color scheme
- **Smooth Animations**: Thoughtful transitions and micro-interactions
- **Responsive Layout**: Mobile-first design approach

### User Experience
- **Minimal Friction**: Intuitive interface requiring no learning curve
- **Fast Feedback**: Immediate visual feedback for all user actions
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized rendering and lazy loading

---

## 🚀 Performance Optimization

### Build Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Removes unused code from bundles
- **Minification**: Production builds are fully minified
- **Asset Optimization**: Images and fonts are optimized

### Runtime Optimizations
- **React Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Components loaded on demand
- **Debouncing**: Input handlers are debounced for better performance

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Preview production build
npm run preview
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (recommended to add)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 👨‍💻 Author

**Made by Suryanshu Nabheet**

- Passionate about AI, web development, and creating beautiful user experiences
- Focused on building fast, modern, and accessible applications

---

## 🙏 Acknowledgments

- **OpenRouter**: For providing access to advanced AI models
- **Qwen Team**: For the powerful Qwen 2.5 Coder model
- **React Team**: For the amazing React framework
- **Tailwind Labs**: For Tailwind CSS
- **Lucide**: For beautiful icons

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the maintainer

---

## 🔮 Future Enhancements

- [ ] Theme customization (light/dark/custom)
- [ ] Export conversations to PDF/Markdown
- [ ] Code execution environment
- [ ] Multi-language support
- [ ] Plugin system for extensions
- [ ] Collaborative chat sessions
- [ ] Advanced code analysis tools

---

**Built with ❤️ using React, TypeScript, and AI**
