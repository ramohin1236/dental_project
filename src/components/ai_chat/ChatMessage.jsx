import React from 'react';
import { VscRobot } from 'react-icons/vsc';
import { FaRegUser } from 'react-icons/fa';

const ChatMessage = ({ message, isBot, timestamp, avatar }) => {
  return (
    <div className={`flex items-start gap-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="shrink-0">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <VscRobot  className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-xs sm:max-w-md`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-neutral-700 text-gray-200 rounded-bl-md'
              : 'bg-neutral-600 text-gray-200 rounded-br-md'
          } shadow-lg`}
        >
          {/* If message is JSON structured (AI assistant response), render nicely */}
          {(() => {
            if (typeof message === 'string') {
              const trimmed = message.trim();
              if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                try {
                  const parsed = JSON.parse(message);
                  // Expected structure: { message: string, link: [{product_name, product_url}], additional_message }
                  if (parsed && (parsed.message || parsed.link || parsed.additional_message)) {
                    return (
                      <div className="space-y-3 text-sm leading-relaxed">
                        {parsed.message && (
                          <div className="text-sm text-gray-100">{parsed.message}</div>
                        )}

                        {Array.isArray(parsed.link) && parsed.link.length > 0 && (
                          <div className="pt-1">
                            <div className="text-xs text-gray-400 mb-2">Links</div>
                            <ul className="space-y-2">
                              {parsed.link.map((l, idx) => (
                                <li key={idx}>
                                  <a
                                    href={l.product_url || l.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-400 hover:underline block"
                                  >
                                    {l.product_name || l.title || l.url}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {parsed.additional_message && (
                          <div className="text-sm text-gray-300">{parsed.additional_message}</div>
                        )}
                      </div>
                    );
                  }
                } catch (e) {
                  // fall through to plain text
                }
              }
            }

            // Default: render as plain text
            return <p className="text-sm leading-relaxed">{message}</p>;
          })()}
        </div>
        <span className="text-xs text-neutral-500 mt-2">{timestamp}</span>
      </div>
      
      {!isBot && (
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-600 flex items-center justify-center">
            {avatar ? (
              <img 
                src={avatar} 
                alt="User" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/image.png'; }}
              />
            ) : (
              <FaRegUser  className="w-6 h-6 text-gray-300" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;