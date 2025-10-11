"use client"
import React, { useState, useEffect, useRef } from 'react';

import { VscRobot } from 'react-icons/vsc';
import BreadCrumb from '@/components/shared/BreadCrumb';
import ChatHeader from '@/components/ai_chat/ChatHeader';
import ChatMessage from '@/components/ai_chat/ChatMessage';
import ChatInput from '@/components/ai_chat/ChatInput';


export default function AiSupport() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello, Reza How can i help you??",
            isBot: true,
            timestamp: "8:26pm"
        },
        {
            id: 2,
            text: "Hello, Reza How can i help you??",
            isBot: false,
            timestamp: "8:26pm"
        },
        {
            id: 3,
            text: "Hello, Reza How can i help you??",
            isBot: true,
            timestamp: "8:26pm"
        },
        {
            id: 4,
            text: "Hello, Reza How can i help you??",
            isBot: false,
            timestamp: "8:26pm"
        },
        {
            id: 5,
            text: "Hello, Reza How can i help you??",
            isBot: true,
            timestamp: "8:26pm"
        },
        {
            id: 6,
            text: "Hello, Reza How can i help you??",
            isBot: false,
            timestamp: "8:26pm"
        }
    ]);

    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateTimestamp = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = async (messageText) => {
        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: messageText,
            isBot: false,
            timestamp: generateTimestamp()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "Thanks for your message! How can I assist you further?",
                "I'm here to help! What would you like to know?",
                "Great question! Let me help you with that.",
                "I understand. Here's what I can do for you.",
                "Thanks for reaching out! I'm ready to assist."
            ];

            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMessage = {
                id: messages.length + 2,
                text: randomResponse,
                isBot: true,
                timestamp: generateTimestamp()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#171717] py-5">
            <div className="container mx-auto flex justify-start items-center py-10">
                <BreadCrumb name="Home" title="Support" />
            </div>
            <div className="max-w-5xl mx-auto flex flex-col h-screen bg-[#000] rounded-lg">
                <ChatHeader />

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="max-w-5xl px-5 mx-auto">
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message.text}
                                isBot={message.isBot}
                                timestamp={message.timestamp}
                                avatar={!message.isBot ? "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" : undefined}
                            />
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                        <VscRobot className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 px-4 py-3 bg-gray-700 rounded-2xl rounded-bl-md">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

               <div className='w-full md:w-[60%] mx-auto'>
               <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
               </div>
            </div>
        </div>
    );
};

