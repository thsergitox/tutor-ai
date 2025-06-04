# TutorAI - AI-Powered Educational Chat Assistant

An intelligent tutoring application that combines text-based chat with voice conversations powered by ElevenLabs Conversational AI.

## Features

- 🎯 **AI-Powered Tutoring**: Get help with various subjects through an intelligent chat interface
- 🎙️ **Voice Conversations**: Talk naturally with the AI tutor using ElevenLabs voice technology
- 🌐 **Real-time Voice Activity**: Visual feedback shows when the AI is listening or speaking
- 💬 **Dual Mode Support**: Switch between text chat and voice conversations
- 🎨 **Modern UI**: Clean, responsive interface with animated voice indicators
- 🔊 **Audio Controls**: Volume adjustment, mute functionality, and microphone selection

## Prerequisites

- Node.js 18 or later
- An [ElevenLabs](https://elevenlabs.io) account with API access
- A configured ElevenLabs Conversational AI agent

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tutor-ai.git
cd tutor-ai
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_api_key_here
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
```

## Getting Started

1. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Navigate to a chat or click "Nueva Conversación" to start

4. Click the microphone button to enable voice conversations

## ElevenLabs Agent Configuration

### Agent Types and Authentication

ElevenLabs agents come in two types:

1. **Public Agents**: Can be accessed directly with just the agent ID
2. **Private Agents**: Require server-side authentication with API key

### Configuration Steps

1. **Create your agent** in the [ElevenLabs Dashboard](https://elevenlabs.io/app/conversational-ai)
2. **Configure voice settings**:
   - Ensure voice is enabled (not text-only mode)
   - Select appropriate voice model
   - Match language settings to your intended use
3. **Note your agent type**:
   - Public agents: Copy the agent ID
   - Private agents: Copy the agent ID and generate an API key

### Important: No Client Events Configuration Needed

Unlike some older tutorials might suggest, you do **NOT** need to configure client events in the dashboard. The SDK handles transcript events automatically through the `onMessage` callback.

### Testing Voice Features

Visit `/test-docs` for a test interface that follows the official documentation exactly. This page includes:
- Toggle between public/private agent modes
- Real-time message logging
- Detailed debug information

For the original test interface with additional features, visit `/test-elevenlabs`.

## Project Structure

```
tutor-ai/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── chat/        # Chat-related components
│   │   └── layout/      # Layout components (sidebars, etc.)
│   ├── hooks/           # Custom React hooks
│   │   └── useElevenLabsChat.ts  # ElevenLabs integration
│   └── providers/       # Context providers
├── public/              # Static assets
└── .env.local          # Environment variables
```

## Troubleshooting

### Voice Transcriptions Not Working

1. **Check browser console** for error messages
2. **Verify microphone permissions** are granted
3. **Ensure agent configuration** in ElevenLabs dashboard:
   - Voice is enabled (not text-only)
   - Language settings are correct
   - No privacy settings blocking transcripts

### No Audio Output

1. Check system volume and browser audio permissions
2. Verify the AI agent has a voice selected
3. Ensure no mute settings are active

### Connection Issues

1. Verify your API key is correct
2. Check that the agent ID matches your ElevenLabs agent
3. Ensure you have an active internet connection

## Key Features Explained

### Voice Activity Detection
The application monitors microphone input and provides visual feedback:
- **Ripple effects** when voice is detected
- **Audio level meter** showing input volume
- **Status indicators** for listening/speaking states

### Microphone Selection
- Automatically detects available microphones
- Saves preference in localStorage
- Allows switching between devices

### Message History
- Displays both text and voice transcripts
- Differentiates between user and AI messages
- Shows timestamps for each message

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Voice AI**: ElevenLabs Conversational AI
- **Icons**: Lucide React
- **State Management**: React Context + Hooks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ElevenLabs](https://elevenlabs.io) for the amazing voice AI technology
- [Next.js](https://nextjs.org) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
