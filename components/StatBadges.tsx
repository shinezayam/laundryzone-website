'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, CreditCard, Wifi, Droplets } from 'lucide-react';

export function StatBadges() {
  const t = useTranslations();

  const stats = [
    {
      icon: Clock,
      label: t('stats.24_7'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: CreditCard,
      label: t('stats.cashless'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Wifi,
      label: t('stats.wifi'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Droplets,
      label: t('stats.detergent'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${stat.bgColor} ${stat.color} text-sm font-medium`}
        >
          <stat.icon size={16} />
          <span>{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
