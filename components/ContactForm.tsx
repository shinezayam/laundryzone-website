'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { createContactEmail, sendEmailViaMailto, EMAIL_CONFIG } from '@/lib/email';

interface ContactFormProps {
  locale: string;
}

const contactSchema = z.object({
  name: z.string().min(2, 'name_min'),
  email: z.string().email('email_invalid'),
  phone: z.string().min(8, 'phone_min'),
  message: z.string().min(10, 'message_min'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create email content using the email template
      const { subject, body } = createContactEmail(data);
      
      // Send email via mailto link
      sendEmailViaMailto(EMAIL_CONFIG.TO, subject, body);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          {t('contact.form.name')} *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
            errors.name ? 'border-red-500' : 'border-neutral-600'
          }`}
          placeholder={t('contact.form.name_placeholder')}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center"
          >
            <AlertCircle size={14} className="mr-1" />
            {t(`contact.form.validation.${errors.name.message}`)}
          </motion.p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          {t('contact.form.email')} *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
            errors.email ? 'border-red-500' : 'border-neutral-600'
          }`}
          placeholder={t('contact.form.email_placeholder')}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center"
          >
            <AlertCircle size={14} className="mr-1" />
            {t(`contact.form.validation.${errors.email.message}`)}
          </motion.p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
          {t('contact.form.phone')} *
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ${
            errors.phone ? 'border-red-500' : 'border-neutral-600'
          }`}
          placeholder={t('contact.form.phone_placeholder')}
        />
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center"
          >
            <AlertCircle size={14} className="mr-1" />
            {t(`contact.form.validation.${errors.phone.message}`)}
          </motion.p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          {t('contact.form.message')} *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 resize-none ${
            errors.message ? 'border-red-500' : 'border-neutral-600'
          }`}
          placeholder={t('contact.form.message_placeholder')}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center"
          >
            <AlertCircle size={14} className="mr-1" />
            {t(`contact.form.validation.${errors.message.message}`)}
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
              <span>{t('contact.form.sending')}</span>
            </>
          ) : (
            <>
              <Send size={16} className="text-white" />
              <span>{t('contact.form.send')}</span>
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle size={20} className="text-green-400" />
            <span className="text-green-400 font-medium">
              {t('contact.form.success_message')}
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3"
          >
            <AlertCircle size={20} className="text-red-400" />
            <span className="text-red-400 font-medium">
              {t('contact.form.error_message')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Notice */}
      <p className="text-xs text-neutral-400 text-center">
        {t('contact.form.privacy_notice')}
      </p>
    </form>
  );
}
