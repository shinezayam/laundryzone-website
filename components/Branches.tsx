'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { MapPin, Clock, Phone, Filter, Search, SlidersHorizontal, Map, Facebook } from 'lucide-react';
import Image from 'next/image';
import { branches, branchToProvince } from '@/data/branches-data';

interface BranchesProps {
  locale: string;
  showHeader?: boolean;
}

export function Branches({ locale, showHeader = true }: BranchesProps) {
  const t = useTranslations();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedHours, setSelectedHours] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState<number>(12);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [allProvincesSelected, setAllProvincesSelected] = useState<boolean>(true);

  // Listen for messages from the map iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'provinces-updated') {
        setSelectedProvinces(event.data.provinces || []);
        setAllProvincesSelected(event.data.allSelected || false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);


  // Get unique districts
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(branches.map(branch => branch.district)));
    return uniqueDistricts.sort();
  }, []);

  // Filter branches and sort with coming soon first
  const filteredBranches = useMemo(() => {
    const filtered = branches.filter(branch => {
      // Province/Map filter - only apply if not all provinces are selected
      if (!allProvincesSelected && selectedProvinces.length > 0) {
        // Get the province for this branch (default to Ulaanbaatar MN1)
        const branchProvince = branchToProvince[branch.name] || 'MN1';
        // Check if this branch's province is in the selected provinces
        if (!selectedProvinces.includes(branchProvince)) {
          return false;
        }
      }

      if (selectedDistrict !== 'all' && branch.district !== selectedDistrict) {
        return false;
      }
      if (selectedHours !== 'all' && branch.hours !== selectedHours) {
        return false;
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          branch.name.toLowerCase().includes(searchLower) ||
          branch.address.toLowerCase().includes(searchLower) ||
          branch.district.toLowerCase().includes(searchLower);
        if (!matchesSearch) {
          return false;
        }
      }
      return true;
    });
    // Sort: coming soon first, then newest-added first (reverse array order)
    return filtered.reverse().sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return -1;
      if (!a.comingSoon && b.comingSoon) return 1;
      return 0;
    });
  }, [branches, selectedDistrict, selectedHours, searchTerm, selectedProvinces, allProvincesSelected, branchToProvince]);

  const clearFilters = () => {
    setSelectedDistrict('all');
    setSelectedHours('all');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedDistrict !== 'all' || selectedHours !== 'all' || searchTerm;

  const handleImageLoad = (branchId: string) => {
    setImagesLoaded(prev => new Set(prev).add(branchId));
  };

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, filteredBranches.length));
  };

  return (
    <section id="branches" className="section-padding bg-neutral-50">
      <div className="container-custom">
                 {/* Section Header */}
         {showHeader && (
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16"
           >
             <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
               {t('branches.title')}
             </h2>
             <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
               {t('branches.subtitle')}
             </p>
             {/* Mongolia Map - iframe for complete CSS isolation */}
             <div className="flex justify-center">
               <iframe
                 src={`/map-interactive.html?locale=${locale}`}
                 className="w-full max-w-2xl border-0"
                 style={{ height: '400px' }}
                 title="Mongolia Map"
               />
             </div>
           </motion.div>
         )}

                 {/* Enhanced Filter Bar */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-6 lg:mb-8"
         >
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-soft overflow-hidden">
            {/* Search Bar with Toggle */}
            <div className="p-4 lg:p-6 border-b border-neutral-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="text"
                    placeholder={t('branches.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:from-white focus:to-neutral-50 transition-all duration-200 text-sm lg:text-base"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 lg:py-4 rounded-xl font-medium transition-all duration-200 ${
                    showFilters || hasActiveFilters
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  <span className="hidden sm:inline">{t('branches.filters')}</span>
                  {hasActiveFilters && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

                         {/* Expandable Filter Panel */}
             {showFilters && (
               <div className="overflow-hidden">
                 <div className="p-4 lg:p-6 bg-gradient-to-r from-neutral-50 to-accent-50">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                     {/* District Filter */}
                     <div className="space-y-3">
                       <label className="block text-sm font-semibold text-neutral-700 flex items-center gap-2">
                         <MapPin size={16} className="text-accent-500" />
                         {t('branches.filter_district')}
                       </label>
                       <select
                         value={selectedDistrict}
                         onChange={(e) => setSelectedDistrict(e.target.value)}
                         className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                       >
                         <option value="all">{t('branches.all_districts')}</option>
                         {districts.map(district => (
                           <option key={district} value={district}>{district}</option>
                         ))}
                       </select>
                     </div>

                     {/* Hours Filter */}
                     <div className="space-y-3">
                       <label className="block text-sm font-semibold text-neutral-700 flex items-center gap-2">
                         <Clock size={16} className="text-accent-500" />
                         {t('branches.filter_hours')}
                       </label>
                       <select
                         value={selectedHours}
                         onChange={(e) => setSelectedHours(e.target.value)}
                         className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                       >
                         <option value="all">{t('branches.all_hours')}</option>
                         <option value="08:00-24:00">08:00-24:00</option>
                       </select>
                     </div>

                     {/* Clear Filters */}
                     <div className="flex items-end">
                       <button
                         onClick={clearFilters}
                         disabled={!hasActiveFilters}
                         className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                           hasActiveFilters
                             ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 shadow-md'
                             : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                         }`}
                       >
                         {t('branches.clear_filters')}
                       </button>
                     </div>
                   </div>

                   {/* Results Count */}
                   <div className="mt-6 pt-4 border-t border-neutral-200">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-neutral-600">
                         {t('branches.results_count', { count: filteredBranches.length, total: branches.length })}
                       </span>
                       {hasActiveFilters && (
                         <div className="flex items-center gap-2 text-xs text-accent-600 bg-accent-100 px-3 py-1 rounded-full">
                           <Filter size={12} />
                           <span>{t('branches.filters_active')}</span>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             )}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.slice(0, displayCount).map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card relative bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-80 bg-neutral-100 rounded-t-2xl overflow-hidden">
                {/* Coming Soon Badge */}
                {branch.comingSoon && (
                  <div className="absolute top-3 right-3 z-10 bg-accent-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    {t('branches.coming_soon')}
                  </div>
                )}
                {/* Loading Skeleton */}
                {!imagesLoaded.has(branch.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse" />
                )}
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-300 ${
                    imagesLoaded.has(branch.id) ? 'opacity-100' : 'opacity-0'
                  } ${branch.comingSoon ? 'grayscale opacity-70' : ''}`}
                  priority={index < 6}
                  loading={index < 6 ? "eager" : "lazy"}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoad={() => handleImageLoad(branch.id)}
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-full">
                <div className="flex-1">
                  <h4 className="text-lg lg:text-xl font-bold text-neutral-900 mb-3">
                    {branch.name}
                  </h4>
                  <div className="space-y-3 text-sm text-neutral-600">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-accent-500" />
                      <span className="font-medium">{branch.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-accent-500" />
                      <span className="font-medium truncate">{branch.phone}</span>
                    </div>
                    {branch.phone2 && (
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-accent-500" />
                        <span className="font-medium truncate">{branch.phone2}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions - Fixed at bottom */}
                <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {branch.comingSoon ? (
                    <div className="flex-1 inline-flex items-center justify-center gap-2 px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-accent-600 bg-accent-50 border-2 border-accent-200">
                      {t('branches.opening_soon')}
                    </div>
                  ) : (
                    <>
                      <a
                        href={branch.mapsUrl || `https://www.google.com/maps?q=${branch.lat},${branch.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-orange-600 border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200"
                      >
                         <Map size={14} className="sm:w-4 sm:h-4" />
                         <span>{t('branches.view_on_maps')}</span>
                      </a>
                      <a
                        href={branch.facebook || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                          branch.facebook
                            ? 'text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
                            : 'text-neutral-400 border-2 border-neutral-300 bg-neutral-50 cursor-not-allowed'
                        }`}
                        onClick={!branch.facebook ? (e) => e.preventDefault() : undefined}
                      >
                         <Facebook size={14} className="sm:w-4 sm:h-4" />
                         <span>{t('branches.visit_facebook_button')}</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredBranches.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-white rounded-xl font-medium hover:bg-accent-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('branches.load_more') || 'Load More Branches'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
