'use client';

import { useState } from "react";
import useWebSocketChat from "../hooks/useWebSocketChat";
import useClientId from "../hooks/useClientId";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ChatPanel() {
    const [input, setInput] = useState('');
    const { sendMessage } = useWebSocketChat();

    // getting state from redux
    const messages = useSelector((state: RootState) => state.chat.messages);
    const clientId = useSelector((state: RootState) => state.user.clientId);
    const isConnected = useSelector((state: RootState) => state.chat.isConnected);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    }
    
    return (
        <div className="chat-overlay">
            <div className="chat-status" style={{ padding: '8px'}}>
                Status: {isConnected ? (
                <span style={{ color: 'green' }}>Connected</span>
                ) : (
                <span style={{ color: 'red' }}>Disconnected</span>
                )}
            </div>
            <div className="chat-messages">
                {messages.map((msg) => {
                    const isMe = msg.clientId === clientId;
                    return(
                        <div key={msg.id} className={`chat-message ${isMe ? 'mine' : 'other'}`} style={{ marginBottom: '8px' }}>
                            <strong>{isMe ? 'You' : 'Other'}</strong>: {msg.content}
                            <div style={{ fontSize: '12px', color: '#888' }}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>    
                    )
                })}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={!isConnected}
                />
                <button onClick={handleSend}
                    disabled={!input.trim() || !isConnected}
                >
                    Send
                </button>
            </div>
        </div>
    );
}