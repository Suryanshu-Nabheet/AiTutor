# AiTutor

A modern, feature-rich AI-powered coding assistant built with React, TypeScript, and Vite. Experience fast, intelligent responses powered by Qwen 2.5 Coder through OpenRouter.

![AiTutor](https://img.shields.io/badge/AI-Powered-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-blue) ![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green) ![Voice](https://img.shields.io/badge/Voice-Supported-purple)

 **Built by**: Suryanshu Nabheet

---

## 🎯 AI Response Structure

### For Coding Questions:
1. **Brief Professional Introduction** (1-2 sentences)
2. **Complete Code Solution** (immediately in code block)
3. **Detailed Explanation** (key concepts and logic)
4. **Best Practices** (professional tips and recommendations)

### For Academic Questions:
1. **Clear Introduction** (simple, conversational)
2. **Key Points** (bullet points or numbered lists)
3. **Visual Elements** (ASCII art, charts, diagrams when helpful)
4. **Practical Examples** (real-world applications)
5. **Summary** (concise takeaways)

**Clean Formatting Features:**
- No excessive markdown symbols (#, !, **, &, ||, \, ---, ===, etc.)
- No complex tables or overly formatted sections
- Simple bullet points and numbered lists only
- Clean, conversational responses
- Professional but readable formatting
- Text stays within message containers
- Comprehensive automatic markdown symbol removal
- Plain text responses only
- Dual-layer protection (system prompt + post-processing)
- Dedicated markdown cleaning utility

## 🚀 Features

### 🎯 **100% Production Ready**
- ✅ **Perfect Responsive Design** - Works flawlessly on all devices (320px - 2560px+)
- ✅ **Professional UI/UX** - Modern, accessible, and intuitive interface
- ✅ **Optimized Performance** - Fast loading, efficient rendering, minimal bundle size
- ✅ **Security Hardened** - CSP headers, XSS protection, secure API integration
- ✅ **Cross-Browser Compatible** - Works on all modern browsers with graceful degradation
- ✅ **Accessibility Compliant** - ARIA labels, keyboard navigation, screen reader support

### 📱 **Comprehensive Responsive Design**
- **Small Phones** (320px-480px): Optimized touch targets, fluid typography
- **Large Phones** (481px-768px): Enhanced spacing, better readability
- **Tablets** (769px-1024px): Balanced layout, improved navigation
- **Laptops** (1025px-1280px): Full feature set, hover interactions
- **Desktops** (1281px-1536px): Maximum content width, enhanced spacing
- **Large Displays** (1537px+): Ultra-wide support, optimized layouts

### 🎨 **Advanced UI/UX Features**
- **Glassmorphism Effects**: Modern frosted glass design elements
- **Smooth Animations**: GPU-accelerated transitions and micro-interactions
- **Dark Theme**: Professional dark mode with perfect contrast ratios
- **Touch Optimization**: 44px+ touch targets, gesture support
- **Safe Area Support**: iOS notch and Android navigation bar handling
- **Fluid Typography**: Responsive font scaling across all devices

### Core Capabilities
- **AI-Powered Responses**: Leverages OpenAI GPT-OSS-20B via OpenRouter for intelligent assistance
- **Real-Time Typing Animation**: Smooth character-by-character display of AI responses
- **Code Block Rendering**: Automatic syntax highlighting with copy-to-clipboard functionality
- **Voice Integration**: Text-to-speech for AI responses and speech-to-text for input
- **Conversation Management**: Create, save, and manage multiple conversation threads
- **Persistent Storage**: Local storage integration for conversation history

### User Experience
- **Beautiful UI**: Modern, glassmorphic design with smooth animations
- **Fully Responsive**: Mobile-first design optimized for phones, tablets, and desktops
- **Dark Theme**: Easy on the eyes with a professional dark interface
- **Fast Performance**: Optimized with Vite for lightning-fast development and build times
- **Touch-Friendly**: Optimized touch interactions for mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3**: Modern React with hooks and concurrent features
- **TypeScript 5.5**: Type-safe development
- **Vite 5.4**: Next-generation frontend tooling

### Styling & UI
- **Tailwind CSS 3.4**: Utility-first CSS framework with responsive utilities
- **Lucide React**: Beautiful, consistent icon library
- **Custom Glassmorphism**: Modern glass-effect UI components
- **Mobile-First Design**: Responsive breakpoints for all device sizes
- **Custom Animations**: Smooth transitions and micro-interactions

### AI Integration
- **OpenRouter API**: Access to Qwen3 Coder model (free tier available)
- **Single API Endpoint**: Unified service for both coding and academic questions
- **Environment Configuration**: Secure API key management
- **Context Management**: Intelligent conversation history handling

### Additional Features
- **Local Storage API**: Client-side data persistence
- **Web Speech API**: Voice recognition and synthesis
- **Markdown Parsing**: Code block extraction and rendering

---

## 📱 Device Compatibility

### Supported Devices
- **📱 Mobile Phones**: iPhone (iOS 12+), Android (Android 8+)
- **📱 Tablets**: iPad (iOS 12+), Android tablets (Android 8+)
- **💻 Laptops**: Windows, macOS, Linux (Chrome, Firefox, Safari, Edge)
- **🖥️ Desktops**: All modern browsers with responsive scaling

### Responsive Breakpoints
- **Mobile**: 320px - 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Laptop**: 1024px - 1280px (lg)
- **Desktop**: 1280px+ (xl)

### Touch Optimizations
- **Touch Targets**: Minimum 44px touch targets for mobile
- **Swipe Gestures**: Smooth scrolling and navigation
- **Haptic Feedback**: Native mobile interactions
- **Viewport Meta**: Proper mobile viewport configuration

---

## 🆓 Free AI Model

AiTutor uses **OpenAI GPT-OSS-20B** through OpenRouter's free tier, providing:

- **No Cost**: Completely free to use
- **High Quality**: Advanced coding and academic assistance
- **Easy Setup**: Simple API key configuration
- **Multiple Options**: Alternative free models available
- **Upgrade Path**: Easy transition to paid models for better reliability

**Note**: Free models may experience occasional rate limiting. Alternative free models are available as fallbacks.

**Get Started**: Visit [OpenRouter](https://openrouter.ai/keys) to get your free API key in seconds!

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

   Create a `.env` file in the root directory with your OpenRouter API key:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your API key:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   VITE_OPENROUTER_MODEL=openai/gpt-oss-20b:free
   ```
   
   **Get your free API key**: Visit [OpenRouter](https://openrouter.ai/keys) to get your API key.

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
The application uses OpenRouter to access the OpenAI GPT-OSS-20B model. Configuration is managed through environment variables:

**Environment Variables:**
- `VITE_OPENROUTER_API_KEY`: Your OpenRouter API key (required)
- `VITE_OPENROUTER_API_URL`: API endpoint (default: https://openrouter.ai/api/v1/chat/completions)
- `VITE_OPENROUTER_MODEL`: Model to use (default: openai/gpt-oss-20b:free)
- `VITE_APP_NAME`: Application name for API headers
- `VITE_APP_URL`: Application URL for API headers

**API Service Location:**
```
src/services/aiService.ts
```

### Customization Options
- **Typing Speed**: Adjust in `src/components/MessageBubble.tsx` (default: 10ms per character)
- **Max Tokens**: Configure in `src/services/aiService.ts` (default: 2500)
- **Conversation History**: Limit set to 10 messages in `src/services/aiService.ts`
- **Model Selection**: Change `VITE_OPENROUTER_MODEL` in `.env` file

### Available Models

**Free Models (may have rate limits):**
- `openai/gpt-oss-20b:free` - Default, high-quality OpenAI model
- `qwen/qwen3-coder:free` - Excellent for coding and academic questions
- `microsoft/phi-3-mini-128k-instruct:free` - Alternative free model
- `meta-llama/llama-3.2-3b-instruct:free` - Another free alternative

**Paid Models (more reliable):**
- `qwen/qwen-2.5-coder-32b-instruct` - High-quality coding model
- `openai/gpt-4o-mini` - Fast and reliable general-purpose model
- `anthropic/claude-3.5-sonnet` - Excellent for complex reasoning

**To switch models:** 
- **Manual**: Update `VITE_OPENROUTER_MODEL` in your `.env` file and restart the development server
- **Script**: Use the provided script: `./switch-model.sh [model-name]`
  ```bash
  # List available models
  ./switch-model.sh
  
  # Switch to a specific model
  ./switch-model.sh openai/gpt-oss-20b:free
  ```

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
- **Code Splitting**: Automatic chunking (vendor, icons, app chunks)
- **Tree Shaking**: Removes unused code from bundles
- **Minification**: Terser minification with console removal
- **Asset Optimization**: Images and fonts are optimized
- **Bundle Analysis**: Optimized for production deployment

### Runtime Optimizations
- **React Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Components loaded on demand
- **Debouncing**: Input handlers are debounced for better performance
- **Request Queuing**: Rate limiting and deduplication for API calls
- **Error Recovery**: Automatic retry with exponential backoff
- **Caching**: Smart response caching for better performance

### Production Ready Features
- **CDN Optimized**: Ready for Vercel's global CDN
- **Mobile Performance**: Touch-optimized scrolling and interactions
- **Security Headers**: XSS protection, content type options
- **Error Handling**: Comprehensive error recovery system
- **Scalability**: Built to handle millions of users

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

- **OpenRouter**: For providing access to advanced AI models with free tier
- **OpenAI**: For the powerful GPT-OSS-20B model (free tier available)
- **React Team**: For the amazing React framework
- **Tailwind Labs**: For Tailwind CSS
- **Lucide**: For beautiful icons
- **Vite Team**: For the lightning-fast build tool

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the maintainer

---

## 🔧 Troubleshooting

### Common Issues

**Voice not working?**
- Ensure microphone permissions are granted
- Check browser compatibility (Chrome/Firefox recommended)
- Try refreshing the page

**Responsive layout issues?**
- Clear browser cache
- Check viewport meta tag
- Ensure JavaScript is enabled

**AI responses slow?**
- Check internet connection
- API service may be experiencing high load
- Try refreshing the page

**API key issues?**
- Ensure `.env` file exists in project root
- Verify `VITE_OPENROUTER_API_KEY` is set correctly
- Check if API key is valid at [OpenRouter](https://openrouter.ai/keys)
- Restart development server after changing `.env`

**Rate limiting issues?**
- Free models may be temporarily rate-limited
- Try again in a few minutes
- Consider switching to alternative free models in `.env`:
  - `qwen/qwen3-coder:free`
  - `microsoft/phi-3-mini-128k-instruct:free`
  - `meta-llama/llama-3.2-3b-instruct:free`
- For better reliability, upgrade to paid models

**No AI responses?**
- Check browser console for error messages
- Verify API key has sufficient credits
- Ensure model is available and not rate-limited

**Mobile keyboard issues?**
- Ensure viewport height is properly configured
- Check for iOS Safari specific issues
- Try landscape orientation

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer: Not supported

---

## 📚 Additional Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to AiTutor
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines and standards
- **[Deployment Guide](DEPLOYMENT.md)** - Complete deployment instructions
- **[License](LICENSE)** - MIT License details

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Report bugs and request features
- Set up the development environment
- Submit pull requests
- Follow our code standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/suryanshunabheet/aitutor/issues)
- **Discussions**: [Community discussions](https://github.com/suryanshunabheet/aitutor/discussions)
- **Email**: Contact the maintainer for direct support

---

## 🔮 Future Enhancements

- [x] **Mobile-First Responsive Design** - Completed
- [x] **Touch-Optimized Interface** - Completed
- [x] **Voice Integration** - Completed
- [ ] Theme customization (light/dark/custom)
- [ ] Export conversations to PDF/Markdown
- [ ] Code execution environment
- [ ] Multi-language support
- [ ] Plugin system for extensions
- [ ] Collaborative chat sessions
- [ ] Advanced code analysis tools
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with service workers

---

**Built with ❤️ using React, TypeScript, and AI**
