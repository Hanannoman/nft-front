// import React, { useState, useRef, useEffect } from 'react';
// import { sendMessageToAI } from '../api/chat';

// export default function ChatBot() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { text: "مرحباً بك في DashStack! كيف يمكنني مساعدتك اليوم في تداول الـ NFTs والأصول الرقمية على شبكة TON؟", isBot: true }
//     ]);
//     const [input, setInput] = useState('');
//     const [loading, setLoading] = useState(false);
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const handleSend = async (e) => {
//         e.preventDefault();
//         if (!input.trim() || loading) return;

//         const userMessage = input.trim();
//         setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
//         setInput('');
//         setLoading(true);

//         try {
//             const botReply = await sendMessageToAI(userMessage);
//             setMessages(prev => [...prev, { text: botReply, isBot: true }]);
//         } catch (error) {
//             setMessages(prev => [...prev, { text: "عذراً، حدث خطأ في الاتصال بالمساعد الذكي.", isBot: true }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, fontFamily: 'sans-serif' }}>
//             {/* الزر العائم الدائري بأيقونة SVG */}
//             <button 
//                 onClick={() => setIsOpen(!isOpen)}
//                 style={{
//                     width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4F46E5',
//                     color: 'white', border: 'none', cursor: 'pointer',
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     transition: 'all 0.3s ease'
//                 }}
//             >
//                 {isOpen ? (
//                     // أيقونة الإغلاق X
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 ) : (
//                     // أيقونة الرسالة/التشات الأنيقة
//                     <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                 )}
//             </button>

//             {/* نافذة المحادثة */}
//             {isOpen && (
//                 <div style={{
//                     position: 'absolute', bottom: '80px', right: '0', width: '350px', height: '450px',
//                     backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//                     display: 'flex', overflow: 'hidden', border: '1px solid #E5E7EB',
//                     flexDirection: 'column'
//                 }}>
//                     {/* رأس النافذة مع أيقونة البوت */}
//                     <div style={{ backgroundColor: '#4F46E5', color: 'white', padding: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: 'rtl' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                 </svg>
//                             <span>مساعدك الذكي</span>
//                         </div>
//                     </div>

//                     {/* منطقة الرسائل */}
//                     <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                         {messages.map((msg, index) => (
//                             <div key={index} style={{
//                                 alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
//                                 backgroundColor: msg.isBot ? '#E5E7EB' : '#4F46E5',
//                                 color: msg.isBot ? '#1F2937' : 'white',
//                                 padding: '10px 14px', borderRadius: '12px', maxWidth: '80%',
//                                 fontSize: '14px', direction: 'rtl', wordBreak: 'break-word'
//                             }}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                         {loading && (
//                             <div style={{ alignSelf: 'flex-start', backgroundColor: '#E5E7EB', color: '#4F46E5', padding: '10px 14px', borderRadius: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
//                                 <span style={{ animation: 'pulse 1s infinite' }}>جاري كتابة الرد...</span>
//                             </div>
//                         )}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* حقل الإدخال وزر الإرسال بأيقونة طائرة ورقية */}
//                     <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #E5E7EB', padding: '10px', backgroundColor: 'white', alignItems: 'center' }}>
//                         <button type="submit" style={{ backgroundColor: '#4F46E5', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                             {/* أيقونة الطائرة الورقية للإرسال */}
//                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                             </svg>
//                         </button>
//                         <input 
//                             type="text" 
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="اسأل المساعد الذكي..."
//                             style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', outline: 'none', textAlign: 'right', fontSize: '14px' }}
//                         />
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../api/chat';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "مرحباً بك في منصة Nfts! 🚀 أنا مساعدك البرمجي والتقني المشرف، كيف يمكنني مساعدتك اليوم في التصفح، إنشاء الحساب، ربط محفظة TON أو حل أي مشكلة تقنية؟", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInput('');
        setLoading(true);

        try {
            const botReply = await sendMessageToAI(userMessage);
            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "عذراً، حدث خطأ في الاتصال بالمساعد الذكي الفني للمنصة.", isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            
            {/* 1. الزر العائم الدائري النيوني الزجاجي */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '64px', height: '64px', borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #0098ea, #00c6ff)',
                    color: 'white', border: 'none', cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 152, 234, 0.4)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08) rotate(5deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {/* 2. نافذة المحادثة (تصميم Glassmorphism الترندي) */}
            {isOpen && (
                <div style={{
                    position: 'absolute', bottom: '85px', right: '0', width: '380px', height: '540px',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', /* أسود نيون شفاف */
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    display: 'flex', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)',
                    flexDirection: 'column',
                    animation: 'fadeInSlide 0.3s ease-out'}}>
                    
                    {/* رأس النافذة الاحترافي */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(0, 152, 234, 0.15), rgba(0, 198, 255, 0.05))', 
                        color: 'white', padding: '18px 20px', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: 'rtl' 
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#00c6ff" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {/* نقطة النيون الخضراء المنبثقة للنشاط */}
                                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#00e676', borderRadius: '50%', boxShadow: '0 0 8px #00e676' }}></span>
                            </div>
                            <span style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}>مساعد Nfts الذكي</span>
                        </div>
                    </div>

                    {/* منطقة الرسائل الفاخرة */}
                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                background: msg.isBot ? 'rgba(255, 255, 255, 0.06)' : 'linear-gradient(135deg, #0098ea, #0072b5)',
                                color: msg.isBot ? '#e2e8f0' : 'white',
                                padding: '12px 16px', 
                                borderRadius: msg.isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px', 
                                maxWidth: '82%',
                                fontSize: '14px', direction: 'rtl', wordBreak: 'break-word',
                                lineHeight: '1.5',
                                border: msg.isBot ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                boxShadow: msg.isBot ? 'none' : '0 4px 12px rgba(0, 152, 234, 0.2)'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.06)', color: '#00c6ff', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#00c6ff', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                                <span style={{ fontSize: '13px', color: '#8892b0' }}>جاري استدعاء معمارية النظام...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* حقل الإدخال وزر الإرسال */}
                    <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', alignItems: 'center', gap: '10px' }}>
                        <button 
                            type="submit" 
                            disabled={loading || !input.trim()}
                            style={{ 
                                background: input.trim() ? '#0098ea' : 'rgba(255,255,255,0.05)', 
                                color: input.trim() ? 'white' : '#666', 
                                border: 'none', width: '42px', height: '42px', borderRadius: '12px', 
                                cursor: input.trim() ? 'pointer' : 'default', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اسألني عن معمارية المنصة أو حل المشاكل..."
                            style={{ 
                                flex: 1, padding: '12px 16px', 
                                borderRadius: '14px', 
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', 
                                outline: 'none', textAlign: 'right', 
                                fontSize: '14px', color: 'white',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = '#0098ea'}
                            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </form>
                </div>
            )}

            {/* ستايل مخصص للإنيميشن ليعمل داخل المتصفح تلقائياً */}
            <style>{`
                @keyframes fadeInSlide {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}