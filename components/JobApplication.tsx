'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Building2,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  DollarSign,
  Briefcase,
  Send,
  Download,
  Phone,
  Mail
} from 'lucide-react';

interface JobApplicationProps {
  jobId: string;
  locale: string;
}

const jobApplicationSchema = z.object({
  name: z.string().min(2, 'name_min'),
  email: z.string().email('email_invalid'),
  phone: z.string().min(8, 'phone_min'),
  message: z.string().min(10, 'message_min'),
  noCv: z.boolean().optional(),
});

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

export function JobApplication({ jobId, locale }: JobApplicationProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const noCv = watch('noCv');

  const jobData = {
    branch_service_consultant: {
      icon: <Building2 className="w-8 h-8 text-accent-600" />,
      color: 'from-accent-50 to-accent-100',
      borderColor: 'border-accent-200',
      experience: '2+ years',
      type: 'Full-time',
      location: 'Ulaanbaatar, Mongolia',
      title: locale === 'mn' ? 'Салбарын үйлчилгээний зөвлөх' : 'Branch Service Consultant',
      description: locale === 'mn' ? 'Манай салбаруудад гайхалтай үйлчлүүлэгчийн үйлчилгээ болон дэмжлэг үзүүлэх' : 'Provide excellent customer service and support at our branch locations.',
      requirements: locale === 'mn' ? [
        'Харилцагчтай ажиллах туршлага',
        'Сайн харилцааны ур чадвар',
        'Англи хэлний мэдлэг',
        'Компьютерийн үндсэн мэдлэг'
      ] : [
        'Customer service experience',
        'Excellent communication skills',
        'English language proficiency',
        'Basic computer skills'
      ],
      responsibilities: locale === 'mn' ? [
        'Үйлчлүүлэгчдэд үйлчилгээ үзүүлэх',
        'Салбарын үйл ажиллагааг дэмжих',
        'Тоног төхөөрөмжийн засвар үйлчилгээ',
        'Тайлан гаргах'
      ] : [
        'Provide customer service',
        'Support branch operations',
        'Equipment maintenance',
        'Generate reports'
      ]
    },
    human_resources: {
      icon: <Users className="w-8 h-8 text-accent-600" />,
      color: 'from-accent-50 to-accent-100',
      borderColor: 'border-accent-200',
      experience: '3+ years',
      type: 'Full-time',
      location: 'Ulaanbaatar, Mongolia',
      title: locale === 'mn' ? 'Хүний нөөцийн мэргэжилтэн' : 'Human Resources Specialist',
      description: locale === 'mn' ? 'Ажилд авах, ажилтны харилцаа, ХН-ийн үйл явцыг удирдах' : 'Manage recruitment, employee relations, and HR processes.',
      requirements: locale === 'mn' ? [
        'ХН-ийн салбарт 3+ жилийн туршлага',
        'Хүний нөөцийн менежментийн мэдлэг',
        'Харилцааны ур чадвар',
        'Хууль эрх зүйн мэдлэг'
      ] : [
        '3+ years experience in HR',
        'Human resource management knowledge',
        'Communication skills',
        'Legal knowledge'
      ],
      responsibilities: locale === 'mn' ? [
        'Ажилд авах үйл явц удирдах',
        'Ажилтны харилцаа удирдах',
        'ХН-ийн бодлого хэрэгжүүлэх',
        'Сургалт зохион байгуулах'
      ] : [
        'Manage recruitment process',
        'Handle employee relations',
        'Implement HR policies',
        'Organize training programs'
      ]
    },
    international_relations: {
      icon: <Globe className="w-8 h-8 text-accent-600" />,
      color: 'from-accent-50 to-accent-100',
      borderColor: 'border-accent-200',
      experience: '2+ years',
      type: 'Full-time',
      location: 'Ulaanbaatar, Mongolia',
      title: locale === 'mn' ? 'Олон улсын харилцааны мэргэжилтэн' : 'International Relations Manager',
      description: locale === 'mn' ? 'Олон улсын түншлэл, бизнес хөгжүүлэлттэй ажиллах' : 'Handle international partnerships and business development.',
      requirements: locale === 'mn' ? [
        'Олон улсын бизнест туршлага',
        'Англи хэлний сайн мэдлэг',
        'Харилцааны ур чадвар',
        'Бизнес хөгжүүлэлтийн мэдлэг'
      ] : [
        'International business experience',
        'Excellent English proficiency',
        'Communication skills',
        'Business development knowledge'
      ],
      responsibilities: locale === 'mn' ? [
        'Олон улсын түншлэл удирдах',
        'Бизнес хөгжүүлэлт хийх',
        'Харилцаа холбоо тогтоох',
        'Тайлан гаргах'
      ] : [
        'Manage international partnerships',
        'Develop business opportunities',
        'Establish communications',
        'Generate reports'
      ]
    }
  };

  const currentJob = jobData[jobId as keyof typeof jobData];

  if (!currentJob) {
    return (
      <div className="pt-32 lg:pt-40 pb-24 bg-gradient-to-br from-neutral-50 via-white to-accent-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {locale === 'mn' ? 'Ажлын байр олдсонгүй' : 'Job Not Found'}
          </h1>
          <p className="text-lg text-neutral-600">
            {locale === 'mn' ? 'Уучлаарай, энэ ажлын байр олдсонгүй.' : 'Sorry, this job position was not found.'}
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: JobApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Get CV file from the file input
    const cvInput = document.getElementById('cv') as HTMLInputElement;
    const cvFile = cvInput?.files?.[0] || null;
    
    const submitData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: currentJob.title,
      message: data.message,
      cv: data.noCv ? null : cvFile,
      noCv: data.noCv || false
    };

    try {
      // Send job application via API
      const response = await fetch('/api/job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit job application');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 lg:pt-40 pb-24 bg-gradient-to-br from-neutral-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Job Header */}
            <div className={`bg-gradient-to-br ${currentJob.color} rounded-3xl p-10 border-2 ${currentJob.borderColor} shadow-2xl`}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                  {currentJob.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                    {currentJob.title}
                  </h1>
                  <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-xl text-neutral-700 leading-relaxed mb-8">
                {currentJob.description}
              </p>
              
              {/* Job Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-6 h-6 text-accent-600 mr-3" />
                    <div className="text-sm font-medium text-neutral-600">
                      {locale === 'mn' ? 'Туршлага' : 'Experience'}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-neutral-900">{currentJob.experience}</div>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-6 h-6 text-accent-600 mr-3" />
                    <div className="text-sm font-medium text-neutral-600">
                      {locale === 'mn' ? 'Төрөл' : 'Type'}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-neutral-900">{currentJob.type}</div>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 col-span-2">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-6 h-6 text-accent-600 mr-3" />
                    <div className="text-sm font-medium text-neutral-600">
                      {locale === 'mn' ? 'Байршил' : 'Location'}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-neutral-900">{currentJob.location}</div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-accent-100 rounded-2xl flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-accent-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  {locale === 'mn' ? 'Шаардлага' : 'Requirements'}
                </h2>
              </div>
              <div className="space-y-4">
                {currentJob.requirements.map((requirement: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start bg-accent-50 rounded-xl p-4 border border-accent-100"
                  >
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-neutral-700 font-medium">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-accent-100 rounded-2xl flex items-center justify-center mr-4">
                  <ArrowRight className="w-6 h-6 text-accent-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  {locale === 'mn' ? 'Үүрэг хариуцлага' : 'Responsibilities'}
                </h2>
              </div>
              <div className="space-y-4">
                {currentJob.responsibilities.map((responsibility: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start bg-accent-50 rounded-xl p-4 border border-accent-100"
                  >
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-neutral-700 font-medium">{responsibility}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-10 border border-neutral-200 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  {locale === 'mn' ? 'Өргөдөл гаргах' : 'Application Form'}
                </h2>
                <p className="text-neutral-600">
                  {locale === 'mn' ? 'Доорх формыг бөглөж өргөдөл гаргана уу' : 'Please fill out the form below to apply'}
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-gradient-to-r from-accent-50 to-accent-100 border-2 border-accent-200 rounded-2xl"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-accent-800 font-semibold text-lg">
                      {locale === 'mn' ? 'Өргөдөл амжилттай илгээгдлээ!' : 'Application submitted successfully!'}
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <p className="text-red-800 font-semibold text-lg">
                      {locale === 'mn' ? 'Алдаа гарлаа. Дахин оролдоно уу.' : 'An error occurred. Please try again.'}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-3">
                    {locale === 'mn' ? 'Нэр' : 'Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-accent-500 transition-all duration-300 bg-white/50 ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-neutral-200 focus:border-accent-500'
                    }`}
                    placeholder={locale === 'mn' ? 'Нэрээ оруулна уу' : 'Enter your name'}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {t(`contact.form.validation.${errors.name.message}`)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-3">
                    {locale === 'mn' ? 'И-мэйл' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-accent-500 transition-all duration-300 bg-white/50 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-neutral-200 focus:border-accent-500'
                    }`}
                    placeholder={locale === 'mn' ? 'И-мэйл хаягаа оруулна уу' : 'Enter your email'}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {t(`contact.form.validation.${errors.email.message}`)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-3">
                    {locale === 'mn' ? 'Утас' : 'Phone'} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-accent-500 transition-all duration-300 bg-white/50 ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-neutral-200 focus:border-accent-500'
                    }`}
                    placeholder={locale === 'mn' ? 'Утасны дугаараа оруулна уу' : 'Enter your phone number'}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {t(`contact.form.validation.${errors.phone.message}`)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-semibold text-neutral-700 mb-3">
                    {locale === 'mn' ? 'CV' : 'CV'}
                  </label>
                  
                  {/* No CV Option */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="noCv"
                        {...register('noCv')}
                        className="w-5 h-5 text-accent-600 bg-white border-2 border-neutral-300 rounded focus:ring-accent-500 focus:ring-2"
                        onChange={(e) => {
                          const fileInput = document.getElementById('cv') as HTMLInputElement;
                          if (e.target.checked) {
                            fileInput.disabled = true;
                            fileInput.value = '';
                          } else {
                            fileInput.disabled = false;
                          }
                        }}
                      />
                      <span className="text-sm text-neutral-600">
                        {locale === 'mn' ? 'CV байхгүй' : 'No CV'}
                      </span>
                    </label>
                  </div>

                  {/* CV File Input */}
                  <div className="relative">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-5 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent-100 file:text-accent-700 hover:file:bg-accent-200"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Download className="w-5 h-5 text-neutral-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-3">
                    {locale === 'mn' ? 'Нэмэлт мэдээлэл' : 'Additional Message'}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={5}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-accent-500 transition-all duration-300 resize-none bg-white/50 ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-neutral-200 focus:border-accent-500'
                    }`}
                    placeholder={locale === 'mn' ? 'Нэмэлт мэдээлэл оруулна уу...' : 'Enter additional information...'}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {t(`contact.form.validation.${errors.message.message}`)}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl ${
                    Object.keys(errors).length > 0
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      {locale === 'mn' ? 'Илгээж байна...' : 'Submitting...'}
                    </>
                  ) : Object.keys(errors).length > 0 ? (
                    <>
                      <Send className="w-6 h-6 mr-3" />
                      {locale === 'mn' ? 'Мэдээлэл бүрэн оруулна уу' : 'Please complete all fields'}
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 mr-3" />
                      {locale === 'mn' ? 'Өргөдөл илгээх' : 'Submit Application'}
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-12 pt-8 border-t-2 border-neutral-200">
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {locale === 'mn' ? 'Холбоо барих' : 'Contact'}
                  </h3>
                  <p className="text-neutral-600">
                    {locale === 'mn' ? 'Асуулт байвал холбогдоно уу' : 'Contact us if you have any questions'}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center bg-white/50 rounded-xl p-4 border border-neutral-200">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-500">
                        {locale === 'mn' ? 'Утас' : 'Phone'}
                      </div>
                      <div className="text-lg font-semibold text-neutral-900">+976 7272-2121</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/50 rounded-xl p-4 border border-neutral-200">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-500">
                        {locale === 'mn' ? 'И-мэйл' : 'Email'}
                      </div>
                      <div className="text-sm font-semibold text-neutral-900 break-all">laundryzone.info@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}