import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';

const CaramelChatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'caramel', text: "Woof! I'm Caramel, your friendly AI Pet Assistant. How can I help you today? 🐾" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 1) { // First time opening or reset
        // Potentially add a fresh welcome message or check if it's needed
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { sender: 'user', text: inputValue };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    let aiResponseText = "I'm still learning! 🐶 ";
    const lowerInput = newUserMessage.text.toLowerCase();

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      aiResponseText = "Hi there! How can I assist you and your furry friend today?";
    } else if (lowerInput.includes("vet") || lowerInput.includes("consultation")) {
      aiResponseText = "Looking for a vet? You can find information on our 'Consult a Vet' page. I can also help you find general info!";
    } else if (lowerInput.includes("insurance")) {
      aiResponseText = "Pet insurance is a great idea! Check out our 'Pet Insurance' page for plans and quotes. What specific questions do you have?";
    } else if (lowerInput.includes("symptom") || lowerInput.includes("sick")) {
      aiResponseText = "I can try to help with symptoms! Our AI Symptom Checker tool under 'Care Tools' is quite smart. Or, you can describe the symptoms to me.";
    } else if (lowerInput.includes("food") || lowerInput.includes("diet")) {
      aiResponseText = "Nutrition is super important! For specific dietary advice, it's best to consult a vet. I can provide general tips though!";
    } else if (lowerInput.includes("thank")) {
      aiResponseText = "You're welcome! Happy to help! Anything else? 🦴";
    } else {
       aiResponseText += "Could you tell me more, or ask something else? For complex issues, please see a real vet! 🩺";
    }

    const newAiMessage = { sender: 'caramel', text: aiResponseText };
    setMessages(prevMessages => [...prevMessages, newAiMessage]);
    setIsTyping(false);
  };


  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={toggleChatbot}
          size="lg"
          className="rounded-full p-4 shadow-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          aria-label="Toggle Caramel Chatbot"
        >
          {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
           {!isOpen && <span className="ml-2 font-semibold">Ask Caramel</span>}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed bottom-24 right-6 sm:right-8 w-[calc(100%-3rem)] sm:w-96 h-[70vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-7 w-7 mr-2" />
                <h3 className="text-lg font-semibold">Caramel - Your Pet Pal</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChatbot} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-amber-50/30">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end max-w-[80%] space-x-2`}>
                    {msg.sender === 'caramel' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                        <Bot size={18} />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-xl ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                     {msg.sender === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-end space-x-2"
                >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                        <Bot size={18} />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200">
                        <div className="flex space-x-1">
                            <motion.div className="w-2 h-2 bg-orange-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
                            <motion.div className="w-2 h-2 bg-orange-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
                            <motion.div className="w-2 h-2 bg-orange-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                        </div>
                    </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Caramel anything..."
                  className="flex-grow focus-visible:ring-orange-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button type="submit" size="icon" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={isTyping}>
                  {isTyping ? <CornerDownLeft className="h-5 w-5 animate-pulse" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CaramelChatbot;
