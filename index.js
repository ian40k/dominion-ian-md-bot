import Head from 'head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [step, setStep] = useState(1)
  const [pairingCode, setPairingCode] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const PAIRING_CODE = "DOGMEN"

  useEffect(() => {
    const savedStatus = localStorage.getItem('whatsappConnected')
    if (savedStatus === 'true') {
      setIsConnected(true)
      setStep(3)
      setMessages([
        { type: 'bot', text: '✅ WhatsApp reconnected successfully!' },
        { type: 'bot', text: 'Type .menu for all commands' }
      ])
    }
  }, [])

  const handlePairing = () => {
    if (pairingCode.toUpperCase() === PAIRING_CODE) {
      setStep(2)
      setTimeout(() => {
        setStep(3)
        setIsConnected(true)
        localStorage.setItem('whatsappConnected', 'true')
        setMessages([
          { type: 'bot', text: '✅ WhatsApp connected successfully!' },
          { type: 'bot', text: '🤖 Welcome to WhatsApp Bot! Type commands starting with .' },
          { type: 'bot', text: 'Available commands: .movie .yt .gg .tt .ping .menu' }
        ])
      }, 3000)
    } else {
      alert('Invalid pairing code. Please enter DOGMEN')
    }
  }

  const processCommand = (command) => {
    const [cmd, ...args] = command.slice(1).split(' ')
    const query = args.join(' ')

    switch(cmd.toLowerCase()) {
      case 'movie':
        if (!query) return '🎬 Usage: .movie <query>\nExample: .movie avengers'
        return `🎬 Movie Search: "${query}"\n🔗 https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`
      
      case 'yt':
        if (!query) return '📺 Usage: .yt <query>\nExample: .yt funny cats'
        return `📺 YouTube Search: "${query}"\n🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      
      case 'gg':
        if (!query) return '🔍 Usage: .gg <query>\nExample: .gg weather today'
        return `🔍 Google Search: "${query}"\n🔗 https://www.google.com/search?q=${encodeURIComponent(query)}`
      
      case 'tt':
        if (!query) return '📱 Usage: .tt <query>\nExample: .tt dance tutorial'
        return `📱 TikTok Search: "${query}"\n🔗 https://www.tiktok.com/search?q=${encodeURIComponent(query)}`
      
      case 'ping':
        return `🏓 Bot is active!\n\n📢 WhatsApp Channel:\nhttps://whatsapp.com/channel/0029Vb71mgIElaglZCU0je0x\n\nType .menu for all commands`
      
      case 'menu':
        return `🤖 BOT MENU 🤖\n\n🎬 .movie <query> - Search movies\n📺 .yt <query> - Search YouTube\n🔍 .gg <query> - Search Google\n📱 .tt <query> - Search TikTok\n🏓 .ping - Bot status\n📖 .menu - Show this menu`
      
      default:
        return '❌ Unknown command. Type .menu for available commands.'
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])

    if (input.startsWith('.')) {
      const response = processCommand(input)
      const botMessage = { type: 'bot', text: response }
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    } else {
      const botMessage = { type: 'bot', text: '💡 Type commands starting with . (dot)\nTry .menu for all commands' }
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }

    setInput('')
  }

  const quickCommands = [
    { cmd: '.movie avengers', label: '🎬 Movie' },
    { cmd: '.yt funny cats', label: '📺 YouTube' },
    { cmd: '.gg weather today', label: '🔍 Google' },
    { cmd: '.tt dance tutorial', label: '📱 TikTok' },
    { cmd: '.ping', label: '🏓 Status' },
    { cmd: '.menu', label: '📖 Menu' }
  ]

  const disconnectBot = () => {
    setIsConnected(false)
    setStep(1)
    setMessages([])
    localStorage.removeItem('whatsappConnected')
  }

  return (
    <>
      <Head>
        <title>WhatsApp Bot - DOGMEN Pairing</title>
        <meta name="description" content="Connect to WhatsApp Bot with pairing code DOGMEN" />
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          :root {
            --primary-color: #25d366;
            --whatsapp-green: #128c7e;
            --whatsapp-light: #dcf8c6;
            --user-message: #ffffff;
            --bot-message: #f0f0f0;
            --background: #f0f0f0;
            --text-color: #333333;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--background);
            color: var(--text-color);
            height: 100vh;
          }

          .container {
            max-width: 500px;
            margin: 0 auto;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }

          /* Header */
          .header {
            background: var(--whatsapp-green);
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .header-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .avatar {
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
          }

          .header h1 {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
          }

          .header p {
            font-size: 0.9rem;
            opacity: 0.8;
          }

          .disconnect-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
          }

          .disconnect-btn:hover {
            background: rgba(255,255,255,0.3);
          }

          /* Pairing Screen */
          .pairing-screen {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .pairing-card {
            text-align: center;
            max-width: 400px;
            width: 100%;
          }

          .pairing-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .pairing-card h2 {
            margin-bottom: 0.5rem;
            color: #333;
          }

          .pairing-card p {
            color: #666;
            margin-bottom: 2rem;
          }

          .code-input-container {
            margin-bottom: 2rem;
          }

          .code-input {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            padding: 1rem;
            border: 3px solid var(--primary-color);
            border-radius: 10px;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 3px;
          }

          .pair-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-bottom: 1rem;
          }

          .pair-btn:hover {
            background: #128c7e;
          }

          .hint {
            color: #666;
            font-size: 0.9rem;
          }

          /* QR Screen */
          .qr-screen {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .qr-card {
            text-align: center;
            max-width: 400px;
            width: 100%;
          }

          .qr-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .qr-placeholder {
            margin: 2rem 0;
          }

          .qr-simulator {
            background: #f8f9fa;
            border: 2px dashed #ddd;
            border-radius: 10px;
            padding: 2rem;
            margin-bottom: 1rem;
          }

          .qr-animation {
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #25d366, #128c7e);
            margin: 0 auto 1rem;
            border-radius: 10px;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }

          .loading-status {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            color: #666;
          }

          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Chat Interface */
          .quick-commands {
            padding: 1rem;
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
          }

          .quick-commands h3 {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #666;
          }

          .command-buttons {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .cmd-btn {
            padding: 0.5rem 1rem;
            background: white;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .cmd-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
          }

          .chat-container {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            background: #e5ddd5;
          }

          .messages {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .message {
            display: flex;
          }

          .message.user {
            justify-content: flex-end;
          }

          .message.bot {
            justify-content: flex-start;
          }

          .message-bubble {
            max-width: 80%;
            padding: 0.8rem 1rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            line-height: 1.4;
            white-space: pre-line;
          }

          .message.user .message-bubble {
            background: var(--whatsapp-light);
            border-bottom-right-radius: 0.2rem;
          }

          .message.bot .message-bubble {
            background: var(--bot-message);
            border-bottom-left-radius: 0.2rem;
          }

          .input-area {
            padding: 1rem;
            background: #f0f0f0;
            border-top: 1px solid #ddd;
          }

          .input-container {
            display: flex;
            gap: 0.5rem;
          }

          .message-input {
            flex: 1;
            padding: 0.8rem 1rem;
            border: 1px solid #ddd;
            border-radius: 25px;
            font-size: 0.9rem;
            outline: none;
          }

          .message-input:focus {
            border-color: var(--primary-color);
          }

          .input-area button {
            padding: 0.8rem 1.5rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
          }

          .input-area button:hover:not(:disabled) {
            background: #128c7e;
          }

          .input-area button:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          .channel-info {
            padding: 1rem;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
            text-align: center;
          }

          .channel-info h3 {
            margin-bottom: 0.5rem;
            color: var(--whatsapp-green);
          }

          .channel-link {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
          }

          .channel-link:hover {
            text-decoration: underline;
          }

          /* Scrollbar */
          .chat-container::-webkit-scrollbar {
            width: 6px;
          }

          .chat-container::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          .chat-container::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
        `}</style>
      </Head>

      <div className="container">
        <header className="header">
          <div className="header-info">
            <div className="avatar">🤖</div>
            <div>
              <h1>WhatsApp Bot</h1>
              <p>{isConnected ? 'Online • Connected' : 'Offline • Pair with DOGMEN'}</p>
            </div>
          </div>
          {isConnected && (
            <button className="disconnect-btn" onClick={disconnectBot}>
              Disconnect
            </button>
          )}
        </header>

        {!isConnected && step === 1 && (
          <div className="pairing-screen">
            <div className="pairing-card">
              <div className="pairing-icon">🔐</div>
              <h2>Enter Pairing Code</h2>
              <p>To connect to WhatsApp Bot, enter the pairing code below</p>
              
              <div className="code-input-container">
                <input
                  type="text"
                  className="code-input"
                  placeholder="DOGMEN"
                  value={pairingCode}
                  onChange={(e) => setPairingCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>

              <button className="pair-btn" onClick={handlePairing}>
                Connect to WhatsApp
              </button>

              <div className="hint">
                💡 Pairing code: <strong>DOGMEN</strong>
              </div>
            </div>
          </div>
        )}

        {!isConnected && step === 2 && (
          <div className="qr-screen">
            <div className="qr-card">
              <div className="qr-icon">📱</div>
              <h2>Scan QR Code</h2>
              <p>Open WhatsApp → Settings → Linked Devices → Scan QR Code</p>
              
              <div className="qr-placeholder">
                <div className="qr-simulator">
                  <div className="qr-animation"></div>
                  <p>Simulating QR Code...</p>
                </div>
              </div>

              <div className="loading-status">
                <div className="spinner"></div>
                <p>Waiting for connection...</p>
              </div>
            </div>
          </div>
        )}

        {isConnected && (
          <>
            <div className="quick-commands">
              <h3>Quick Commands:</h3>
              <div className="command-buttons">
                {quickCommands.map((quick, index) => (
                  <button
                    key={index}
                    className="cmd-btn"
                    onClick={() => setInput(quick.cmd)}
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="chat-container">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-bubble">
                      {msg.text.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="input-area">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type command starting with . (e.g., .movie avengers)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="message-input"
                />
                <button onClick={handleSendMessage} disabled={!input.trim()}>
                  Send
                </button>
              </div>
            </div>

            <div className="channel-info">
              <h3>📢 Join My WhatsApp Channel</h3>
              <a 
                href="https://whatsapp.com/channel/0029Vb71mgIElaglZCU0je0x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-link"
              >
                Join Channel →
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
    }
