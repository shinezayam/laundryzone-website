'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  locale: string;
}

export function Chatbot({ locale }: ChatbotProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: locale === 'mn' 
        ? 'Сайн байна уу,\n\nТа "ЛОНДРИЗОН" өөртөө үйлчлэх угаалгын газрын "ДҮНЖИНГАРАВ" салбартай холбогдлоо.\n\n📅 Ажиллах цагийн хуваарь:\n   • Даваа ~ Ням: 08:00-00:00\n   • Сүүлийн үйлчлүүлэгч: 23:00\n\n🎊 Жич:\nЖил бүрийн уламжлалт "ЦАГААН САР"-н баярын өдрийг угтан битүүний өмнөх 7 хоногт 24 цагаар уртасгасан цагаар ажиллана.\n\nТаны нэмэлт асуултанд мэдээллийн ажилтан тун удахгүй хариу өгөх болно.\n\nБаярлалаа! 🙏'
        : locale === 'kr'
        ? '안녕하세요,\n\n"론드리존" 셀프 빨래방 "Dunjingarav" 지점에 연결되었습니다.\n\n📅 운영시간:\n   • 월요일 ~ 일요일: 08:00-00:00\n   • 마지막 고객 접수: 23:00\n\n🎊 참고:\n매년 전통 "설날" 명절을 맞이하여 일주일 전부터 24시간 연장 운영합니다.\n\n추가 질문에 대해 정보 담당자가 곧 답변드릴 것입니다.\n\n감사합니다! 🙏'
        : 'Hello,\n\nYou have connected to "LAUNDRYZONE" self-service laundromat "Dunjingarav" branch.\n\n📅 Operating Hours:\n   • Monday ~ Sunday: 08:00-00:00\n   • Last customer accepted: 23:00\n\n🎊 Note:\nEvery year for the traditional "Lunar New Year" celebration, we operate 24 hours extended schedule starting one week before.\n\nOur information staff will respond to your additional questions very soon.\n\nThank you! 🙏',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response based on common laundry questions
    const lowerMessage = userMessage.toLowerCase();
    
    // Working hours / цагийн хуваарь
    if (lowerMessage.includes('ажиллах цагийн хуваарь') || lowerMessage.includes('цагийн хуваарь') || lowerMessage.includes('time') || lowerMessage.includes('цаг') || lowerMessage.includes('운영시간') || lowerMessage.includes('시간')) {
      return locale === 'mn'
        ? 'Laundryzone өөртөө үйлчлэх угаалгын газар\n\n⏰ Энгийн цагийн хуваарь:\n   • Даваа ~ Ням: 08:00-00:00\n   • Сүүлийн үйлчлүүлэгч: 23:00\n\n🎊 Онцгой цагийн хуваарь:\n   • ЦАГААН САР-н өмнөх 7 хоногт\n   • 24 цагаар тасралтгүй ажиллана\n\nЖил бүрийн уламжлалт "ЦАГААН САР"-н баярын өдрийг угтан битүүний өмнөх 7 хоногт 24 цагаар тасралтгүй сунаж ажиллана.'
        : locale === 'kr'
        ? 'Laundryzone 셀프 빨래방\n\n⏰ 일반 운영시간:\n   • 월요일 ~ 일요일: 08:00-00:00\n   • 마지막 고객 접수: 23:00\n\n🎊 특별 운영시간:\n   • 설날 전 일주일간\n   • 24시간 연장 운영\n\n매년 전통 "설날" 명절을 맞이하여 일주일 전부터 24시간 연장 운영합니다.'
        : 'Laundryzone Self-Service Laundromat\n\n⏰ Regular Operating Hours:\n   • Monday ~ Sunday: 08:00-00:00\n   • Last customer accepted: 23:00\n\n🎊 Special Operating Hours:\n   • One week before Lunar New Year\n   • 24-hour extended operation\n\nEvery year for traditional "Lunar New Year" celebration, we operate 24 hours extended schedule starting one week before.';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('үнэ') || lowerMessage.includes('үнийн мэдээлэл') || lowerMessage.includes('가격')) {
      // Auto-redirect to pricing page after 5 seconds
      setTimeout(() => {
        window.location.href = `/${locale}/pricing`;
      }, 5000);
      
      return locale === 'mn' 
        ? 'Laundryzone өөртөө үйлчлэх угаалгын газар\n\n⚠️ Үнийн бодлого:\nМанайх угаах зүйлсийг ширхэгээр үнэлж угаадаггүй бөгөөд угаалгын машины хүчин чадлаар тооцож үнэ тарифаа тогтоосон байдаг.\n\n📦 Жишээ (30кг машин):\n   • 3-4 хөнжил\n   • 40-50 зуны хувцас\n   • 7-9 куртка багтдаг\n\n✅ ЗӨВЛӨМЖ:\n   • Өнгөөр ялгаж угаах\n   • Өнгө алдахаас сэргийлэх\n   • Будаг түгжигч бодис ашиглах\n\nӨнгө өнгийн зүйл хольж угаах тохиолдолд манай дээр зарагдаж буй будаг түгжигч бодисыг ашиглахыг зөвлөж байна.\n\n🔄 5 секундын дараа дэлгэрэнгүй үнийн хуудас руу шилжүүлэх болно...'
        : locale === 'kr'
        ? 'Laundryzone 셀프 빨래방\n\n⚠️ 요금 정책:\n저희는 빨래를 개별적으로 평가하지 않고 세탁기 용량에 따라 요금을 책정합니다.\n\n📦 예시 (30kg 기계):\n   • 이불 3-4개\n   • 여름옷 40-50벌\n   • 재킷 7-9벌 수용 가능\n\n✅ 조언:\n   • 색깔별로 분류하여 세탁\n   • 색상 손실 방지\n   • 색상 고정제 사용 권장\n\n색상이 섞인 빨래의 경우 매장에서 판매하는 색상 고정제 사용을 권장합니다.\n\n🔄 5초 후 상세 요금 페이지로 이동합니다...'
        : 'Laundryzone Self-Service Laundromat\n\n⚠️ Pricing Policy:\nWe don\'t price items individually but base our tariffs on washing machine capacity.\n\n📦 Example (30kg machine):\n   • 3-4 blankets\n   • 40-50 summer clothes\n   • 7-9 jackets\n\n✅ TIP:\n   • Sort by color before washing\n   • Prevents color loss\n   • Use color-fixing agents\n\nFor mixed-color items, we recommend using the color-fixing agents sold at our store.\n\n🔄 Redirecting to detailed pricing page in 5 seconds...';
    }
    
    // Franchise - check this BEFORE location to avoid conflict
    if (lowerMessage.includes('салбар эрхлэх') || lowerMessage.includes('franchise') || lowerMessage.includes('프랜차이즈')) {
      // Auto-redirect to franchise page after 10 seconds
      setTimeout(() => {
        window.location.href = `/${locale}/franchise`;
      }, 10000);
      
      return locale === 'mn'
        ? 'Laundryzone өөртөө үйлчлэх угаалгын газар\nLaundryzone өөртөө үйлчлэх угаалгын газар\n\nТа Лондризоны салбар эрхлэх бизнесийг сонирхож байвал @laundryzone.mongolia@gmail.com хаяглуу цахим шуудан илгээнэ үү.\n\nЭсвэл ☎️7272-2121, 9192-3113 дугаарт холбогдож дэлгэрэнгүй мэдээлэл аваарай.\n\nБид 21 аймагт үйлчилгээгээ тэлж ойртуулахаар зорин ажиллаж байна. Аймагтаа шинэ бизнес эхлүүлэх хүсэлтэй санхүүгийн бүрэн чадавхтай хувь хүн, албан байгууллагуудыг урьж байна. Нэг аймагт зөвхөн 1-3 зөвшөөрөл олгогдоно. Алдаж болохгүй алтан боломж‼️ Та яараарай~\n\n🔄 10 секундын дараа франчайзын хуудас руу шилжүүлэх болно...'
        : locale === 'kr'
        ? 'Laundryzone 셀프 빨래방\n\nLaundryzone 프랜차이즈 사업에 관심이 있으시면 laundryzone.mongolia@gmail.com으로 이메일을 보내주세요.\n\n또는 ☎️ 7272-2121, 9192-3113으로 연락하여 자세한 정보를 받으세요.\n\n🌟 저희는 21개 아이막에 서비스를 확장할 예정입니다.\n\n💼 지역에서 새로운 사업을 시작하고자 하는 재정적으로 준비된 개인이나 기관을 모집합니다.\n\n⚠️ 한 아이막당 1-3개의 허가만 발급됩니다.\n\n🥇 놓치면 안 되는 골든 기회‼️\n서두르세요~\n\n🔄 10초 후 프랜차이즈 페이지로 이동합니다...'
        : 'Laundryzone Self-Service Laundromat\n\nIf you are interested in Laundryzone franchise business, please send an email to laundryzone.mongolia@gmail.com.\n\nOr contact ☎️ 7272-2121, 9192-3113 for detailed information.\n\n🌟 We are working to expand our services to 21 aimags.\n\n💼 We invite financially capable individuals and organizations who want to start a new business in their aimag.\n\n⚠️ Only 1-3 permits will be granted per aimag.\n\n🥇 Don\'t miss this golden opportunity‼️\nHurry up~\n\n🔄 Redirecting to franchise page in 10 seconds...';
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('хаяг байршил') || lowerMessage.includes('салбар') || lowerMessage.includes('위치')) {
      // Auto-redirect to branches page after 5 seconds
      setTimeout(() => {
        window.location.href = `/${locale}/branches`;
      }, 5000);
      
      return locale === 'mn'
        ? 'Бид Улаанбаатар хотод 30 гаруй салбартай. Хамгийн ойрын салбараа олохын тулд манай вэбсайт дээрх салбаруудын жагсаалтыг үзнэ үү.\n\n🔄 5 секундын дараа салбаруудын хуудас руу шилжүүлэх болно...'
        : locale === 'kr'
        ? '울란바토르시에 30개 이상의 지점이 있습니다. 가장 가까운 지점을 찾으려면 웹사이트의 지점 목록을 확인하세요.\n\n🔄 5초 후 지점 페이지로 이동합니다...'
        : 'We have over 30 locations in Ulaanbaatar. Check our website\'s branch list to find the nearest location.\n\n🔄 Redirecting to branches page in 5 seconds...';
    }
    
    if (lowerMessage.includes('холбоо барих') || lowerMessage.includes('contact') || lowerMessage.includes('연락') || lowerMessage.includes('문의')) {
      // Auto-redirect to contact page after 5 seconds
      setTimeout(() => {
        window.location.href = `/${locale}/contact`;
      }, 5000);
      
      return locale === 'mn'
        ? 'Холбоо барих\nБидэнтэй холбогдоно уу\n\nLaundryzone өөртөө үйлчлэх угаалгын газар\n\n☎️ 7272-2121\n   #Баянзүрх дүүргийг сонгоод-(1)\n\n📞 Дүнжингарав салбартай шууд холбогдох:\n   9500-7443\n\n📧 Цахим шуудан:\n   laundryzone.mongolia@gmail.com\n\n🔄 5 секундын дараа холбоо барих хуудас руу шилжүүлэх болно...'
        : locale === 'kr'
        ? '연락처\n문의해 주세요\n\nLaundryzone 셀프 빨래방\n\n☎️ 7272-2121\n   #바양주르흐 구역 선택 후-(1)\n\n📞 Dunjingarav 지점 직통:\n   9500-7443\n\n📧 이메일:\n   laundryzone.mongolia@gmail.com\n\n🔄 5초 후 연락처 페이지로 이동합니다...'
        : 'Contact Us\nGet in touch with us\n\nLaundryzone Self-Service Laundromat\n\n☎️ 7272-2121\n   #Select Bayanzurkh district-(1)\n\n📞 Direct line to Dunjingarav branch:\n   9500-7443\n\n📧 Email:\n   laundryzone.mongolia@gmail.com\n\n🔄 Redirecting to contact page in 5 seconds...';
    }
    

    // Default response
    return locale === 'mn'
      ? 'Уучлаарай, би таны асуултыг бүрэн ойлгохгүй байна. Дараах сэдвээр асууна уу:\n• Ажиллах цагийн хуваарь\n• Хаяг байршил\n• Үнийн мэдээлэл\n• Холбоо барих\n• Салбар эрхлэх'
      : locale === 'kr'
      ? '죄송합니다. 질문을 완전히 이해하지 못했습니다. 다음 주제로 질문해주세요:\n• 운영시간\n• 위치 정보\n• 가격 정보\n• 연락처\n• 프랜차이즈'
      : 'Sorry, I don\'t fully understand your question. Please ask about:\n• Operating hours\n• Location information\n• Pricing information\n• Contact information\n• Franchise opportunities';
  };

  const quickReplies = [
    {
      text: locale === 'mn' ? '🕐 Ажиллах цагийн хуваарь' : locale === 'kr' ? '🕐 운영시간' : '🕐 Operating Hours',
      query: locale === 'mn' ? 'ажиллах цагийн хуваарь' : locale === 'kr' ? '운영시간' : 'operating hours'
    },
    {
      text: locale === 'mn' ? '💰 Үнийн мэдээлэл' : locale === 'kr' ? '💰 가격 정보' : '💰 Pricing Info',
      query: locale === 'mn' ? 'үнэ' : locale === 'kr' ? '가격' : 'price'
    },
    {
      text: locale === 'mn' ? '📍 Хаяг байршил' : locale === 'kr' ? '📍 위치 정보' : '📍 Locations',
      query: locale === 'mn' ? 'хаяг байршил' : locale === 'kr' ? '위치' : 'location'
    },
    {
      text: locale === 'mn' ? '📞 Холбоо барих' : locale === 'kr' ? '📞 연락처' : '📞 Contact',
      query: locale === 'mn' ? 'холбоо барих' : locale === 'kr' ? '연락' : 'contact'
    },
    {
      text: locale === 'mn' ? '🏪 Салбар эрхлэх' : locale === 'kr' ? '🏪 프랜차이즈' : '🏪 Franchise',
      query: locale === 'mn' ? 'салбар эрхлэх' : locale === 'kr' ? '프랜차이즈' : 'franchise'
    }
  ];

  const handleQuickReply = (query: string, displayText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: displayText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const response = await generateResponse(query);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const response = await generateResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Bot size={24} />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot size={20} />
                  <div>
                    <h3 className="font-semibold">
                      {locale === 'mn' ? 'LaundryZone AI' : locale === 'kr' ? 'LaundryZone AI' : 'LaundryZone AI'}
                    </h3>
                    <p className="text-xs opacity-90">
                      {locale === 'mn' ? 'Онлайн туслах' : locale === 'kr' ? '온라인 어시스턴트' : 'Online Assistant'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isUser
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Quick Reply Buttons */}
                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-xs text-gray-500 text-center mb-2">
                      {locale === 'mn' ? 'Хурдан хариу:' : locale === 'kr' ? '빠른 답변:' : 'Quick replies:'}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickReplies.map((reply, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleQuickReply(reply.query, reply.text)}
                          className="bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-orange-700 border border-orange-200 hover:border-orange-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left"
                        >
                          {reply.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs ml-2">
                          {locale === 'mn' ? 'Бичиж байна...' : locale === 'kr' ? '입력 중...' : 'Typing...'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      locale === 'mn' 
                        ? 'Асуултаа бичнэ үү...' 
                        : locale === 'kr'
                        ? '질문을 입력하세요...'
                        : 'Type your question...'
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
