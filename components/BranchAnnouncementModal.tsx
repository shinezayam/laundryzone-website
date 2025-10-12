'use client';

import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BranchAnnouncementModalProps {
  locale: string;
}

export function BranchAnnouncementModal({ locale }: BranchAnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after a short delay every time the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const text = {
    mn: {
      comingSoon: 'ТҮН УДАХГҮЙ НЭЭГДЭНЭ',
      mainTitle: 'Шинэ салбар тун удахгүй',
      branchNumber: '36 дахь салбар',
      branchName: 'Нисэх - Мандала гарден салбар',
      address: 'Хан-Уул Дүүрэг, 23-р хороо, Арцатын ам, Мандала гарден хотхон',
      branchLabel: 'Салбарын нэр',
      addressLabel: 'Хаяг',
      closeButton: 'Ойлголоо'
    },
    en: {
      comingSoon: 'COMING SOON',
      mainTitle: 'New Branch Opening Soon',
      branchNumber: 'Our 36th Branch',
      branchName: 'Nisekh - Mandala Garden Branch',
      address: 'Khan-Uul District, 23rd Khoroo, Artsatyn Am, Mandala Garden Complex',
      branchLabel: 'Branch Name',
      addressLabel: 'Address',
      closeButton: 'Got it'
    },
    kr: {
      comingSoon: '곧 오픈',
      mainTitle: '새 지점 곧 오픈',
      branchNumber: '36번째 지점',
      branchName: '니세크 - 만달라 가든 지점',
      address: '칸울 구역, 23호로, 아르차틴 암, 만달라 가든 단지',
      branchLabel: '지점명',
      addressLabel: '주소',
      closeButton: '확인'
    }
  };

  const content = text[locale as keyof typeof text] || text.mn;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors duration-200 group"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-10">
                {/* Branch Number */}
                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                    {content.branchNumber}
                  </p>
                  <div className="w-12 h-1 bg-accent-500 mx-auto rounded-full"></div>
                </div>

                {/* Main Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-8 leading-tight uppercase">
                  {content.mainTitle}
                </h2>

                {/* Branch Info Card */}
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 mb-8 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Branch Name */}
                  <div className="mb-5">
                    <p className="text-xl font-bold text-accent-600 text-center">
                      {content.branchName}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-5">
                    <div className="w-full h-0.5 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 rounded-full"></div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {content.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {content.closeButton}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

