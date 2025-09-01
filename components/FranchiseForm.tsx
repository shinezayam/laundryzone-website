'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Download, Users, Settings, Award, Headphones } from 'lucide-react';
import { createFranchiseEmail, sendEmailViaMailto, sendFranchiseEmailViaAPI, EMAIL_CONFIG } from '@/lib/email';

interface FranchiseFormProps {
  locale: string;
}

const franchiseSchema = z.object({
  name: z.string().min(2, 'name_min'),
  email: z.string().email('email_invalid'),
  phone: z.string().min(8, 'phone_min'),
  city: z.string().min(2, 'city_min'),
  budget: z.string().min(1, 'budget_required'),
  message: z.string().min(10, 'message_min'),
});

type FranchiseFormData = z.infer<typeof franchiseSchema>;

export function FranchiseForm({ locale }: FranchiseFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FranchiseFormData>({
    resolver: zodResolver(franchiseSchema),
  });

  const benefits = [
    {
      icon: Users,
      title: t('franchise.benefits.training'),
      description: t('franchise.benefits.training_desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Settings,
      title: t('franchise.benefits.support'),
      description: t('franchise.benefits.support_desc'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Award,
      title: t('franchise.benefits.equipment'),
      description: t('franchise.benefits.equipment_desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Headphones,
      title: t('franchise.benefits.branding'),
      description: t('franchise.benefits.branding_desc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const budgetRanges = [
    { key: 'under_50m', value: t('franchise.budget_ranges.under_50m') },
    { key: '50m_100m', value: t('franchise.budget_ranges.50m_100m') },
    { key: '100m_200m', value: t('franchise.budget_ranges.100m_200m') },
    { key: '200m_500m', value: t('franchise.budget_ranges.200m_500m') },
    { key: 'over_500m', value: t('franchise.budget_ranges.over_500m') },
  ];

  const onSubmit = async (data: FranchiseFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Try to send via API endpoint first
      await sendFranchiseEmailViaAPI(data);
      console.log('Franchise email sent successfully via API');
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // If API fails, try mailto fallback
      try {
        console.log('API failed, trying mailto fallback');
        const { subject, body } = createFranchiseEmail(data);
        sendEmailViaMailto(EMAIL_CONFIG.TO, subject, body);
        setSubmitStatus('success');
        reset();
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } catch (fallbackError) {
        console.error('Both API and mailto failed:', fallbackError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Franchise Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
               {t('franchise.why_title')}
             </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className={`p-3 rounded-xl ${benefit.bgColor} flex-shrink-0`}>
                    <benefit.icon size={24} className={benefit.color} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Brochure */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {t('franchise.download_title')}
              </h3>
              <p className="text-neutral-600 mb-4">
                {t('franchise.download_description')}
              </p>
              <div className="w-full">
                <button className="w-full bg-[#F4781F] hover:bg-[#E06A1A] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Download size={16} className="text-white" />
                  <span>{t('franchise.download_brochure')}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Franchise Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t('common.franchise_inquiry')}</h3>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.name')} *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder={t('common.enter_name')}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.name.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder={t('common.enter_email')}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.email.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.phone')} *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder={t('common.enter_phone')}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.phone.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* City Field */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.city')} *
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
                      errors.city ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder={t('common.enter_city')}
                  />
                  {errors.city && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.city.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* Budget Field */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.budget')} *
                  </label>
                  <select
                    {...register('budget')}
                    id="budget"
                    className={`w-full px-4 py-3 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 appearance-none bg-white ${
                      errors.budget ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px 12px'
                    }}
                  >
                    <option value="">{t('common.select_budget')}</option>
                    {budgetRanges.map((range) => (
                      <option key={range.key} value={range.key}>
                        {range.value}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.budget.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('franchise.form.message')} *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500' : 'border-neutral-300'
                    }`}
                                         placeholder={t('franchise.message_placeholder')}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {t(`franchise.validation.${errors.message.message}`)}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F4781F] hover:bg-[#E06A1A] disabled:bg-neutral-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-1 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: 'none',
                      textDecoration: 'none',
                      outline: 'none',
                      transform: 'none'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('common.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="text-white" />
                        <span>{t('franchise.form.submit')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
                  >
                    <CheckCircle size={20} className="text-green-500" />
                                         <span className="text-green-700 font-medium">
                       {t('franchise.success_message')}
                     </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                  >
                    <AlertCircle size={20} className="text-red-500" />
                                         <span className="text-red-700 font-medium">
                       {t('franchise.error_message')}
                     </span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
