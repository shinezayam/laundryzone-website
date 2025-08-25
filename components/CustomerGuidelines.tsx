'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, CheckCircle, Info, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';

interface CustomerGuidelinesProps {
  locale: string;
}

export function CustomerGuidelines({ locale }: CustomerGuidelinesProps) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const clearFilter = () => {
    setSearchTerm('');
    setIsFilterActive(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsFilterActive(value.length > 0);
  };

  const guidelines = [
    {
      icon: "🏷️",
      titleKey: "guidelines.items.washing_instructions.title",
      contentKey: "guidelines.items.washing_instructions.content"
    },
    {
      icon: "🎨",
      titleKey: "guidelines.items.color_separation.title",
      contentKey: "guidelines.items.color_separation.content"
    },
    {
      icon: "🔍",
      titleKey: "guidelines.items.check_pockets.title",
      contentKey: "guidelines.items.check_pockets.content"
    },
    {
      icon: "👕",
      titleKey: "guidelines.items.stretchy_items.title",
      contentKey: "guidelines.items.stretchy_items.content"
    },
    {
      icon: "⏰",
      titleKey: "guidelines.items.supervision.title",
      contentKey: "guidelines.items.supervision.content"
    },
    {
      icon: "🚫",
      titleKey: "guidelines.items.no_pets.title",
      contentKey: "guidelines.items.no_pets.content"
    },
    {
      icon: "⚖️",
      titleKey: "guidelines.items.capacity_limit.title",
      contentKey: "guidelines.items.capacity_limit.content"
    },
    {
      icon: "🏠",
      titleKey: "guidelines.items.household_only.title",
      contentKey: "guidelines.items.household_only.content"
    },
    {
      icon: "🕐",
      titleKey: "guidelines.items.closing_time.title",
      contentKey: "guidelines.items.closing_time.content"
    },
    {
      icon: "🤝",
      titleKey: "guidelines.items.gentle_use.title",
      contentKey: "guidelines.items.gentle_use.content"
    },
    {
      icon: "👨‍💼",
      titleKey: "guidelines.items.follow_staff.title",
      contentKey: "guidelines.items.follow_staff.content"
    },
    {
      icon: "⚠️",
      titleKey: "guidelines.items.customer_responsibility.title",
      contentKey: "guidelines.items.customer_responsibility.content"
    },
    {
      icon: "🎨",
      titleKey: "guidelines.items.color_restoration.title",
      contentKey: "guidelines.items.color_restoration.content"
    },
    {
      icon: "🧼",
      titleKey: "guidelines.items.stain_removal.title",
      contentKey: "guidelines.items.stain_removal.content"
    },
    {
      icon: "🙏",
      titleKey: "guidelines.items.staff_respect.title",
      contentKey: "guidelines.items.staff_respect.content"
    }
  ];

  const filteredGuidelines = useMemo(() => {
    let filtered = guidelines;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(guideline => 
        t(guideline.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(guideline.contentKey).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Show only first 6 if not showing all
    if (!showAll) {
      filtered = filtered.slice(0, 6);
    }

    return filtered;
  }, [searchTerm, showAll, t]);

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-accent-50">
      <div className="container-custom">
        {/* Header with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent">
            {t('guidelines.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-6">
            {t('guidelines.subtitle')}
          </p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-neutral-200">
              <Info className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-neutral-600">
                {guidelines.length} {t('guidelines.guideline_count')}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder={t('guidelines.search_placeholder')}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-neutral-200 focus:border-accent-500 focus:outline-none shadow-sm transition-all duration-300 text-base"
              />
              {isFilterActive && (
                <button
                  onClick={clearFilter}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-accent-100 text-accent-600 rounded-full hover:bg-accent-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Clear Filter Button */}
            {isFilterActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mt-4"
              >
                <button
                  onClick={clearFilter}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm text-sm ${
                    isFilterActive
                      ? 'bg-accent-500 text-white hover:bg-accent-600'
                      : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {t('guidelines.clear_filter')}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Guidelines Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredGuidelines.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer relative overflow-hidden border-l-4 border-accent-500 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => toggleItem(index)}
                >
                  <div className="relative z-10">
                    <div className="flex items-start space-x-3">
                      <motion.div 
                        className="text-2xl p-2 rounded-lg bg-accent-50 text-accent-600"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {guideline.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-2 text-neutral-900 leading-tight">
                          {t(guideline.titleKey)}
                        </h3>
                        
                        <AnimatePresence>
                          {expandedItems.includes(index) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm leading-relaxed text-neutral-600 mb-3">
                                {t(guideline.contentKey)}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-accent-600">
                            {expandedItems.includes(index) 
                              ? t('guidelines.collapse') 
                              : t('guidelines.expand')
                            }
                          </span>
                          <motion.div
                            animate={{ rotate: expandedItems.includes(index) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-1 rounded-full bg-accent-50 text-accent-600"
                          >
                            {expandedItems.includes(index) ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {guidelines.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-10"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {showAll ? t('guidelines.show_less') : t('guidelines.show_all')}
              </button>
            </motion.div>
          )}
        </div>

        {/* Enhanced Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-2xl p-8 text-white shadow-lg">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                {t('guidelines.thank_you.title')}
              </h3>
              <p className="text-lg text-accent-100 max-w-2xl mx-auto leading-relaxed">
                {t('guidelines.thank_you.content')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
