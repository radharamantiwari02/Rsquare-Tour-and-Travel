import React, { useState } from 'react';

interface ConciergeChatModalProps {
  mode: 'phone' | 'whatsapp';
  onClose: () => void;
}

interface Message {
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({ mode, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: "Grüezi! I'm Stefan Gruber, Tour Director for the Grand Alpine Odyssey. How may I assist with your European expedition today?",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [callScheduled, setCallScheduled] = useState(false);
  const [callPhone, setCallPhone] = useState('+1 (555) 234-5678');
  const [callTime, setCallTime] = useState('Today at 2:00 PM EST');

  const quickQuestions = [
    'Can we add extra nights in Zurich or Venice?',
    'How does luggage transfer work on the Glacier Express?',
    'Are dietary restrictions accommodated at Michelin dinners?',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = "Certainly! Our dedicated concierge handles all bespoke adjustments. We'll make sure your requests are seamlessly arranged before departure.";
      if (text.toLowerCase().includes('extra night')) {
        reply = "Yes! We can extend your stay at either The Dolder Grand in Zurich or The St. Regis in Venice at preferential contracted rates, including private transfers.";
      } else if (text.toLowerCase().includes('luggage')) {
        reply = "Our door-to-door luggage concierge transports your heavy bags directly between hotel rooms in Zurich, St. Moritz, and Venice. You travel on the Glacier Express with only a light day pack!";
      } else if (text.toLowerCase().includes('dietary')) {
        reply = "All dietary requirements (vegetarian, vegan, celiac gluten-free, halal, kosher) are custom-catered with executive chefs across all 16 meals.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-black/10 flex flex-col h-[520px]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#005a71] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Stefan Gruber"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-[#005a71]"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Stefan Gruber</h3>
              <p className="text-[11px] text-[#b9eaff]">Senior European Tour Director • Rsquare Concierge</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {mode === 'phone' ? (
          /* Phone Consultation Mode */
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f2f3ff] text-[#005a71] flex items-center justify-center mx-auto shadow-xs">
                <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#131b2e]">Priority Concierge Direct Line</h4>
                <p className="text-xs text-[#6f787d] mt-1">Available 24 hours a day, 7 days a week</p>
              </div>

              <div className="p-4 bg-[#f2f3ff] rounded-xl text-center space-y-1">
                <span className="text-xs text-[#6f787d] uppercase font-bold">Toll-Free Worldwide</span>
                <p className="text-2xl font-bold text-[#005a71] tracking-tight">
                  +1 (800) 482-7782
                </p>
                <p className="text-[11px] text-[#855300]">Direct access to Senior Alpine Expedition Specialists</p>
              </div>

              {callScheduled ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold animate-fadeIn">
                  ✓ Callback scheduled for {callTime}. Stefan will call {callPhone}.
                </div>
              ) : (
                <div className="text-left space-y-2 pt-2 border-t border-black/5">
                  <span className="text-xs font-bold text-[#131b2e]">Or Schedule a Dedicated Callback</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={callPhone}
                      onChange={(e) => setCallPhone(e.target.value)}
                      className="h-9 px-2.5 rounded-lg border border-black/15 text-xs outline-none focus:border-[#005a71]"
                      placeholder="Your phone"
                    />
                    <select
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="h-9 px-2 rounded-lg border border-black/15 text-xs text-[#131b2e] outline-none"
                    >
                      <option>Today in 15 mins</option>
                      <option>Today at 2:00 PM EST</option>
                      <option>Tomorrow Morning (10:00 AM)</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setCallScheduled(true)}
                    className="w-full py-2 bg-[#005a71] text-white rounded-lg text-xs font-bold hover:bg-[#0e7490] transition-colors"
                  >
                    Request Instant Callback
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 text-center">
              <a
                href="tel:+18004827782"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Dial +1 (800) 482-7782 Now</span>
              </a>
            </div>
          </div>
        ) : (
          /* WhatsApp / Live Chat Mode */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Messages scroll */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-[#faf8ff]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#005a71] text-white rounded-br-xs'
                        : 'bg-white text-[#131b2e] rounded-bl-xs shadow-xs border border-black/5'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        m.sender === 'user' ? 'text-white/70' : 'text-[#6f787d]'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions Chips */}
            <div className="p-2 bg-white border-t border-black/5 flex items-center gap-1.5 overflow-x-auto">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#005a71] text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3 bg-white border-t border-black/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Stefan anything about the tour..."
                className="flex-1 h-10 px-3.5 rounded-lg border border-black/15 text-xs text-[#131b2e] focus:border-[#005a71] outline-none"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white flex items-center justify-center transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
