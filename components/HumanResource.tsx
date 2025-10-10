'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Globe, 
  CheckCircle, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Star,
  ArrowRight,
  Building2,
  Heart,
  Award,
  TrendingUp,
  Shield,
  Calendar,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Target,
  Zap,
  BookOpen,
  UserPlus
} from 'lucide-react';

interface HumanResourceProps {
  locale: string;
}

export function HumanResource({ locale }: HumanResourceProps) {
  const t = useTranslations();
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);

  const positions = [
    {
      key: 'branch_service_consultant',
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      experience: locale === 'mn' ? '2+ жил' : locale === 'kr' ? '2년 이상' : '2+ years',
      type: locale === 'mn' ? 'Бүтэн цагийн' : locale === 'kr' ? '정규직' : 'Full-time',
      title: locale === 'mn' ? 'Үйлчилгээний зөвлөх ажилтан' : locale === 'kr' ? '서비스 컨설턴트' : 'Service Consultant',
      description: locale === 'mn' ? 'Угаалгын газраар үйлчлүүлэх, тоног төхөөрөмж ашиглах зөвлөмж өгч, дэмжлэг үзүүлэх' : 
                   locale === 'kr' ? '세탁소 이용 및 장비 사용에 대한 안내를 제공하고 지원' : 
                   'Provide guidance on using the laundry facilities and equipment, and offer support'
    },
    {
      key: 'human_resources',
      icon: <Users className="w-8 h-8 text-green-600" />,
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      experience: locale === 'mn' ? '3+ жил' : locale === 'kr' ? '3년 이상' : '3+ years',
      type: locale === 'mn' ? 'Бүтэн цагийн' : locale === 'kr' ? '정규직' : 'Full-time',
      title: locale === 'mn' ? 'Хүний нөөцийн мэргэжилтэн' : locale === 'kr' ? '인적자원 전문가' : 'Human Resources Specialist',
      description: locale === 'mn' ? 'Хүний нөөц бүрдүүлэх, удирдан зохион байгуулах, ажилтны сургалт зохион байгуулах' : 
                   locale === 'kr' ? '인적자원 구축, 관리 조직, 직원 교육 조직' : 
                   'Build human resources, manage and organize, and arrange employee training'
    },
    {
      key: 'international_relations',
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      experience: locale === 'mn' ? '2+ жил' : locale === 'kr' ? '2년 이상' : '2+ years',
      type: locale === 'mn' ? 'Бүтэн цагийн' : locale === 'kr' ? '정규직' : 'Full-time',
      title: locale === 'mn' ? 'Гадаад харилцааны мэргэжилтэн' : locale === 'kr' ? '해외 관계 전문가' : 'International Relations Manager',
      description: locale === 'mn' ? 'Гадаад харилцааг өргөжүүлэх, хамтран ажиллах' : 
                   locale === 'kr' ? '해외 관계 확장 및 협력' : 
                   'Expand international relations and collaborate'
    }
  ];

  const applicationSteps = [
    {
      key: 'step_1',
      icon: <FileText className="w-6 h-6" />,
      title: locale === 'mn' ? 'Анкет илгээх' : locale === 'kr' ? '지원서 제출' : 'Submit Application',
      description: locale === 'mn' ? 'Анкет болон танилцуулга илгээнэ үү' : locale === 'kr' ? '이력서와 자기소개서 제출' : 'Send your resume and cover letter'
    },
    {
      key: 'step_2',
      icon: <Target className="w-6 h-6" />,
      title: locale === 'mn' ? 'Анхны шалгалт' : locale === 'kr' ? '1차 심사' : 'Initial Screening',
      description: locale === 'mn' ? 'Утас эсвэл видео ярилцлага' : locale === 'kr' ? '전화 또는 화상 인터뷰' : 'Phone or video interview'
    },
    {
      key: 'step_3',
      icon: <UserPlus className="w-6 h-6" />,
      title: locale === 'mn' ? 'Ярилцлага' : locale === 'kr' ? '면접' : 'Interview',
      description: locale === 'mn' ? 'Биечлэн эсвэл видео ярилцлага' : locale === 'kr' ? '대면 또는 화상 면접' : 'In-person or video interview'
    },
    {
      key: 'step_4',
      icon: <BookOpen className="w-6 h-6" />,
      title: locale === 'mn' ? 'Үнэлгээ' : locale === 'kr' ? '평가' : 'Assessment',
      description: locale === 'mn' ? 'Ур чадвар болон компанийн соёлтой нийцэх үнэлгээ' : locale === 'kr' ? '기술 및 문화 적합성 평가' : 'Skills and culture fit evaluation'
    },
    {
      key: 'step_5',
      icon: <Award className="w-6 h-6" />,
      title: locale === 'mn' ? 'Эцсийн шийдвэр' : locale === 'kr' ? '최종 결정' : 'Final Decision',
      description: locale === 'mn' ? 'Ажлын санал болон бэлтгэл' : locale === 'kr' ? '채용 제안 및 온보딩' : 'Job offer and onboarding'
    }
  ];

  const companyStats = [
    { 
      number: '50+', 
      label: locale === 'mn' ? 'Ажилчид' : locale === 'kr' ? '직원' : 'Employees', 
      icon: <Users className="w-6 h-6" /> 
    },
    { 
      number: '35+', 
      label: locale === 'mn' ? 'Салбар' : locale === 'kr' ? '지점' : 'Branches', 
      icon: <Building2 className="w-6 h-6" /> 
    },
    { 
      number: '5+', 
      label: locale === 'mn' ? 'Жилийн туршлага' : locale === 'kr' ? '년 경험' : 'Years Experience', 
      icon: <Award className="w-6 h-6" /> 
    },
    { 
      number: '98%', 
      label: locale === 'mn' ? 'Сэтгэл ханамж' : locale === 'kr' ? '만족도' : 'Satisfaction', 
      icon: <Heart className="w-6 h-6" /> 
    }
  ];

  const cultureValues = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: locale === 'mn' ? 'Хүний эрх' : locale === 'kr' ? '인권' : 'Human Rights',
      description: locale === 'mn' ? 'Бид бүх ажилчдынхаа эрхийг хүндэтгэж, хамгаалдаг' : 
                   locale === 'kr' ? '우리는 모든 직원의 권리를 존중하고 보호합니다' : 
                   'We respect and protect the rights of all our employees'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: locale === 'mn' ? 'Хөгжил ба төлөвшүүлэлт' : locale === 'kr' ? '성장 및 개발' : 'Growth & Development',
      description: locale === 'mn' ? 'Тасралтгүй суралцаж, туршлага хуримтлуулах боломжууд' : 
                   locale === 'kr' ? '지속적으로 배우고 경험을 쌓을 수 있는 기회' : 
                   'Opportunities to continuously learn and gain experience'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: locale === 'mn' ? 'Аюулгүй байдал' : locale === 'kr' ? '안전 및 보안' : 'Safety & Security',
      description: locale === 'mn' ? 'Аюулгүй ажлын орчин болон ажлын байрны тогтвортой байдал' : 
                   locale === 'kr' ? '안전한 작업 환경과 직업 안정성' : 
                   'Safe working environment and job security'
    },
    {
      icon: <UserPlus className="w-8 h-8 text-purple-500" />,
      title: locale === 'mn' ? 'Хамтын ажиллагаа' : locale === 'kr' ? '협력' : 'Collaboration',
      description: locale === 'mn' ? 'Баг хамт олны харилцан дэмжлэг болон халуун дулаан уур амьсгал' : 
                   locale === 'kr' ? '팀의 상호 지원과 따뜻한 분위기' : 
                   'Mutual support and warm atmosphere within the team'
    }
  ];

  const benefits = locale === 'mn' ? [
    'Өрсөлдөхүйц цалингийн багц',
    'Эрүүл мэндийн даатгал',
    'Мэргэжлийн хөгжил',
    'Уян хатан ажлын цаг',
    'Жилийн амралт болон амралтын өдрүүд',
    'Гүйцэтгэлийн урамшуулал',
    'Багийн хөгжүүлэлтийн үйл ажиллагаа',
    'Ажлын амжилттай болох боломжууд',
    'Орчин үеийн ажлын орчин'
  ] : locale === 'kr' ? [
    '경쟁력 있는 급여 패키지',
    '건강보험 적용',
    '전문성 개발',
    '유연한 근무 시간',
    '연차 및 휴일',
    '성과 보너스',
    '팀 빌딩 활동',
    '경력 성장 기회',
    '현대적인 업무 환경'
  ] : [
    'Competitive Salary Package',
    'Health Insurance Coverage',
    'Professional Development',
    'Flexible Working Hours',
    'Annual Leave & Holidays',
    'Performance Bonuses',
    'Team Building Activities',
    'Career Growth Opportunities',
    'Modern Work Environment'
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-accent-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('nav.human_resources')}
            </h1>
            <p className="text-xl text-accent-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {locale === 'mn' ? 'Монголын тэргүүлэгч өөртөө үйлчлэх угаалгын компанийн нэг гишүүн болоорой' : 
               locale === 'kr' ? '몽골의 선도적인 셀프 서비스 세탁소 회사의 일원이 되세요' : 
               'Become a member of Mongolia\'s leading self-service laundry company'}
            </p>
            <p className="text-lg text-accent-100 max-w-4xl mx-auto leading-relaxed">
              {locale === 'mn' ? 'Монголд хамгийн анх нэвтрүүлж буй шинэлэг үйлчилгээ-шинэ соёлыг, өрх бүрт, өрхийн гишүүн бүрт хүргэж, айл гэрийг аз жаргалтай болгох буянтай үйлсэд гар нийлэн ажиллах хүсэлтэй хүмүүсийг урьж байна.' : 
               locale === 'kr' ? '몽골에서 처음으로 도입되는 혁신적인 서비스와 새로운 문화를 모든 가정과 가족 구성원에게 전달하고, 가정을 행복하게 만드는 의미 있는 일에 함께 참여하고자 하는 분들을 초대합니다.' : 
               'We invite those who wish to work together in the meaningful endeavor of bringing innovative services and new culture—first introduced in Mongolia—to every household and family member, making families happier.'}
            </p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-accent-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Culture & Values */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {locale === 'mn' ? 'Манай компанийн соёл' : 
               locale === 'kr' ? '우리 회사 문화' : 
               'Our Company Culture'}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {locale === 'mn' ? 'Дэлхийн түвшний орчин үеийн смарт-тав тухтай үйлчилгээг эх орондоо нутагшуулах үнэ цэнтэй үйлсэд гар бие оролцож байгаагаараа бахархдаг. Харилцан дэмтэй, халуун дулаан уур амьсгалтай бид нэг хамт олон, бид нэг гэр бүл' : 
               locale === 'kr' ? '세계 수준의 현대적이고 스마트하며 편안한 서비스를 조국에 도입하는 가치 있는 일에 직접 참여하고 있다는 것을 자랑스럽게 생각합니다. 서로를 지지하고 따뜻한 분위기 속에서 우리는 하나의 팀이자 하나의 가족입니다' : 
               'We are proud to be personally involved in the valuable work of bringing world-class modern, smart, and comfortable services to our homeland. With mutual support and a warm atmosphere, we are one team, one family'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section id="available-positions" className="py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {locale === 'mn' ? 'Ажлын байрны танилцуулга' : 
               locale === 'kr' ? '직무 소개' : 
               'Job Position Introduction'}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {locale === 'mn' ? 'Та манай ажлын байрны мэдээлэлтэй танилцана уу.' : 
               locale === 'kr' ? '우리의 직무 정보를 확인해 보세요.' : 
               'Please review our job position information.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {position.icon}
                    <h3 className="text-xl font-bold text-neutral-900 ml-4">
                      {position.title}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">
                  {position.description}
                </p>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-neutral-500 mb-1">
                      {locale === 'mn' ? 'Туршлага' : locale === 'kr' ? '경력' : 'Experience'}
                    </div>
                    <div className="font-semibold text-neutral-900">{position.experience}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-500 mb-1">
                      {locale === 'mn' ? 'Төрөл' : locale === 'kr' ? '유형' : 'Type'}
                    </div>
                    <div className="font-semibold text-neutral-900">{position.type}</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  onClick={() => {
                    window.location.href = `/${locale}/jobs/${position.key}`;
                  }}
                >
                  <span className="flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    {locale === 'mn' ? 'Анкет бөглөх' : locale === 'kr' ? '지원하기' : 'Apply Now'}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {locale === 'mn' ? 'Ажилд орох процесс' : 
               locale === 'kr' ? '지원 절차' : 
               'Application Process'}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {locale === 'mn' ? 'Манай энгийн, ил тод ажилд авах процесс нь танд хамгийн сайн туршлага олгох боломжийг хангадаг.' : 
               locale === 'kr' ? '우리의 간단하고 투명한 채용 과정은 최고의 경험을 보장합니다.' : 
               'Our simple and transparent hiring process ensures you have the best experience.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-200 via-accent-300 to-accent-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative text-center group"
                >
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 border-2 border-accent-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative z-10 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-accent-600 mb-2">{index + 1}</div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Employee Benefits */}
      <section className="py-24 bg-gradient-to-br from-accent-50 to-accent-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {locale === 'mn' ? 'Ажилчдын ашиг тус' : 
               locale === 'kr' ? '직원 혜택' : 
               'Employee Benefits'}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {locale === 'mn' ? 'Бид ажилчдынхаа сайн сайхан байдал болон ажлын амжилттай болохыг дэмжихийн тулд иж бүрэн ашиг тусыг санал болгодог.' : 
               locale === 'kr' ? '직원들의 복지와 경력 성장을 지원하기 위해 포괄적인 혜택을 제공합니다.' : 
               'We offer comprehensive benefits to support our employees\' well-being and career growth.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 group h-full"
              >
                <div className="flex items-center">
                  <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-7 h-7 text-white flex-shrink-0" fill="currentColor" />
                  </div>
                  <span className="font-semibold text-neutral-900 text-lg">{benefit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact-section" className="py-24 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'mn' ? 'Холбоо бариарай' : 
               locale === 'kr' ? '연락하세요' : 
               'Get In Touch'}
            </h2>
            <p className="text-xl text-accent-100 max-w-3xl mx-auto">
              {locale === 'mn' ? 'Манай багт нэгдэхэд бэлэн үү? Боломжтой боломжуудын талаар илүү ихийг мэдэхийн тулд өнөөдөр бидэнтэй холбоо барина уу.' : 
               locale === 'kr' ? '저희 팀에 합류할 준비가 되셨나요? 가능한 기회에 대해 더 알아보려면 오늘 저희에게 연락하세요.' : 
               'Ready to join our team? Contact us today to learn more about available opportunities.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'mn' ? 'Утас' : locale === 'kr' ? '전화' : 'Phone'}
              </h3>
              <p className="text-accent-100 text-lg">+976 7272 2121</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'mn' ? 'И-мэйл' : locale === 'kr' ? '이메일' : 'Email'}
              </h3>
              <p className="text-accent-100 text-sm break-all">laundryzone.info@gmail.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'mn' ? 'Ажлын цаг' : locale === 'kr' ? '근무 시간' : 'Working Hours'}
              </h3>
              <p className="text-accent-100 text-lg">Mon-Fri 9:00-18:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'mn' ? 'Байршил' : locale === 'kr' ? '위치' : 'Location'}
              </h3>
              <p className="text-accent-100 text-lg">Ulaanbaatar, Mongolia</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-12 py-5 bg-white text-accent-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              onClick={() => window.location.href = 'tel:+97672722121'}
            >
              <Phone className="w-6 h-6 mr-3" />
              {locale === 'mn' ? 'Холбоо барих' : locale === 'kr' ? '연락하기' : 'Contact Us'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-12 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-2xl hover:bg-white/30 transition-all duration-300 text-lg"
              onClick={() => {
                const element = document.getElementById('available-positions');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Briefcase className="w-6 h-6 mr-3" />
              {locale === 'mn' ? 'Ажлын байр харах' : locale === 'kr' ? '채용 공고 보기' : 'View Positions'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}