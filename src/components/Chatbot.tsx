import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, isUser: true }]);
      setInputMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! This is a demo response.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="rounded-full bg-blue-500 p-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-600"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {isOpen && (
        <div className="flex h-96 w-80 flex-col rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between rounded-t-lg bg-blue-500 p-4 text-white">
            <h3 className="font-bold">Chat với chúng tôi</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-grow rounded-l-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
