'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { MapPin, Clock, Phone, Filter, Search, SlidersHorizontal, Map, Facebook } from 'lucide-react';
import Image from 'next/image';

interface BranchesProps {
  locale: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  hours: string;
  phone: string;
  phone2?: string;
  email?: string;
  facebook?: string;
  image: string;
}

export function Branches({ locale }: BranchesProps) {
  const t = useTranslations();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedHours, setSelectedHours] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState<number>(12);

  // Branch data with real information from LaundryZone Mongolia website
  const branches: Branch[] = [
    {
      id: "Дүнжингарав",
      name: "Дүнжингарав",
      address: "Монгол улс, Улаанбаатар хот – 13312, Дүнжингарав, Баянзүрх дүүрэг, 26-р хороо, 'Sunny Town' хотхон",
      district: "Баянзүрх",
      lat: 47.9041,
      lng: 106.9393,
      hours: "08:00-24:00",
      phone: "+976 7272 2121-1",
      email: "laundryzone.mongolia@gmail.com",
      facebook: "https://www.facebook.com/laundryzone.mongolia/",
             image: "/images/Branches/Дүнжингарав.jpg"
    },
    {
      id: "Сансар-Emart",
      name: "Сансар-Emart",
      address: "Монгол улс, Улаанбаатар хот - 13381, Баянзүрх дүүрэг, 12-р хороолол-2, Сансар-Emart худалдааны төв",
      district: "Баянзүрх",
      lat: 47.9236,
      lng: 106.9319,
      hours: "08:00-24:00",
      phone: "+976 7272 2121-5",
      phone2: "+976 9008 2080",
      facebook: "https://shorturl.at/eAT06",
             image: "/images/Branches/Сансар.jpg"
    },
    {
      id: "Баянцээл",
      name: "Баянцээл",
      address: "Монгол улс, Улаанбаатар хот - 13345, Баянзүрх дүүрэг, 7-р Хороо, 2-р байр. Сансар Баянцээлийн туслахаар дээш өгсөөд МОБИКОМ, ЮНИТЕЛ-ийн хажууд",
      district: "Баянзүрх",
      lat: 47.9225,
      lng: 106.9338,
      hours: "08:00-24:00",
      phone: "+976 7272 2121-8",
      phone2: "+976 9411 0793",
      facebook: "https://www.facebook.com/LaundryZoneBayntseelSalbar/",
             image: "/images/Branches/Баянцээл.jpg"
    },
    {
      id: "Шархад - ДХИС",
      name: "Шархад - ДХИС",
      address: "ДХИС дээш өгсөөд Хэрлэн байрны 1 давхарт",
      district: "Баянзүрх",
      lat: 47.9175,
      lng: 106.9925,
      hours: "08:00-24:00",
      phone: "+976 7272 2121",
             phone2: "+976 9198 0242",
              image: "/images/placeholder_image.png"
    },
                   {
        id: "Монел Цайз 16",
        name: "Монел Цайз 16",
        address: "Баянзүрх дүүрэг, Улаанбаатар",
        district: "Баянзүрх",
        lat: 47.9245,
        lng: 106.9662,
        hours: "08:00-24:00",
        phone: "+976-95007446",
               image: "/images/Branches/Монел Цайз 16.jpg"
      },
                   {
        id: "Дарь Эх",
        name: "Дарь Эх",
        address: "Баянзүрх дүүрэг, Улаанбаатар",
        district: "Баянзүрх",
        lat: 47.9340,
        lng: 106.8962,
        hours: "08:00-24:00",
        phone: "+976-94954004",
               image: "/images/Branches/Дарь Эх.jpg"
      },
    {
      id: "1-р Хороолол",
      name: "1-р Хороолол",
      address: "1-р Хороолол Хархорин захын зүүн талын байр. Улаанбаатар хот - 16000, Баянгол дүүрэг, 29-р хороо, 55-12",
      district: "Баянгол",
      lat: 47.9113,
      lng: 106.8177,
      hours: "08:00-24:00",
      phone: "72722121-7",
      phone2: "95105868",
      email: "laundryzone.ulaanbaatar@gmail.com",
      facebook: "https://www.facebook.com/laundryzone.ulaanbaatar/",
             image: "/images/Branches/1-р хороолол.jpg"
    },
    {
      id: "21-р хороолол",
      name: "21-р хороолол",
      address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
      district: "Сонгинохайрхан",
      lat: 47.9211,
      lng: 106.8140,
      hours: "08:00-24:00",
             phone: "+976-90907777",
              image: "/images/placeholder_image.png"
    },
         {
       id: "Баянхошуу",
       name: "Баянхошуу",
       address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
       district: "Сонгинохайрхан",
       lat: 47.9557,
       lng: 106.8373,
       hours: "08:00-24:00",
       phone: "+976-89202457",
              image: "/images/Branches/Баянхошуу.jpg"
     },
         {
       id: "Орбит",
       name: "Орбит",
       address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
       district: "Сонгинохайрхан",
       lat: 47.9154,
       lng: 106.7511,
       hours: "08:00-24:00",
       phone: "+976-91960247",
              image: "/images/Branches/Орбит.jpg"
     },
         {
       id: "Чингэлтэй",
       name: "Чингэлтэй",
       address: "Чингэлтэй дүүрэг, Улаанбаатар",
       district: "Чингэлтэй",
       lat: 47.9684,
       lng: 106.9166,
       hours: "08:00-24:00",
       phone: "+976-94383003",
              image: "/images/Branches/Чингэлтэй.jpg"
     },
         {
       id: "Тэнгис Кино Театр",
       name: "Тэнгис Кино Театр",
       address: "Чингэлтэй дүүрэг, Улаанбаатар",
       district: "Чингэлтэй",
       lat: 47.9231,
       lng: 106.9034,
       hours: "08:00-24:00",
       phone: "+976-99806252",
              image: "/images/Branches/Тэнгис.jpg"
     },
         {
       id: "Хайлааст",
       name: "Хайлааст",
       address: "Чингэлтэй дүүрэг, Улаанбаатар",
       district: "Чингэлтэй",
       lat: 47.9610,
       lng: 106.8982,
       hours: "08:00-24:00",
       phone: "+976-85004010",
              image: "/images/Branches/Хайлааст.jpg"
     },
         {
       id: "Налайх",
       name: "Налайх",
       address: "Налайх дүүрэг, Улаанбаатар",
       district: "Налайх",
       lat: 47.7730,
       lng: 107.2406,
       hours: "08:00-24:00",
       phone: "+976-90126677",
              image: "/images/Branches/Налайх.jpg"
     },
    {
      id: "4-р хороолол",
      name: "4-р хороолол",
      address: "Монгол улс, Улаанбаатар хот – 16092, 4-р хороолол, Pearl Apartment\" орон сууцны 1 давхарт",
      district: "Баянгол",
      lat: 47.9214,
      lng: 106.8703,
      hours: "08:00-24:00",
      phone: "72722121-2",
      phone2: "+97690044848",
      facebook: "https://www.facebook.com/laundryzone.branch2/",
             image: "/images/Branches/4-р хороолол.jpg"
    },
    {
      id: "Барс Зах",
      name: "Барс Зах",
      address: "Улаанбаатар хот - 16051, Баянгол дүүрэг, 1-р хороо, Барс захын хойд туслах зам дагуу, ТӨРИЙН БАНК - ны баруун талд",
      district: "Баянгол",
      lat: 47.9097,
      lng: 106.8800,
      hours: "08:00-24:00",
      phone: "72722121-6",
      phone2: "90006818",
      email: "deegiid252@gmail.com",
      facebook: "https://shorturl.at/JPQUZ",
             image: "/images/Branches/Барс_Зах.jpg"
    },
         {
       id: "Нарны Хороолол",
       name: "Нарны Хороолол",
       address: "Баянгол дүүрэг, Улаанбаатар",
       district: "Баянгол",
       lat: 47.9250,
       lng: 106.9250,
       hours: "08:00-24:00",
       phone: "+976-96682329",
              image: "/images/Branches/Нарны хороолол.jpg"
     },
         {
       id: "Зурагт - Эх Нялхас",
       name: "Зурагт - Эх Нялхас",
       address: "Баянгол дүүрэг, Улаанбаатар",
       district: "Баянгол",
       lat: 47.9184,
       lng: 106.9177,
       hours: "08:00-24:00",
       phone: "+976-85815544",
              image: "/images/Branches/Эх нялхас.jpg"
     },
         {
       id: "Гэмтлийн Эмнэлэг",
       name: "Гэмтлийн Эмнэлэг",
       address: "Баянгол дүүрэг, Улаанбаатар",
       district: "Баянгол",
       lat: 47.9200,
       lng: 106.9200,
       hours: "08:00-24:00",
       phone: "+976-80602033",
              image: "/images/Branches/Гэмтэл.jpg"
     },
    {
      id: "Рашаант",
      name: "Рашаант",
      address: "Сүхбаатар дүүрэг, Улаанбаатар",
      district: "Сүхбаатар",
      lat: 47.9346,
      lng: 106.9161,
      hours: "08:00-24:00",
             phone: "+976-95007442",
              image: "/images/placeholder_image.png"
    },
         {
       id: "Дамбадаржаа",
       name: "Дамбадаржаа",
       address: "Сүхбаатар дүүрэг, Улаанбаатар",
       district: "Сүхбаатар",
       lat: 47.9250,
       lng: 106.9250,
       hours: "08:00-24:00",
       phone: "+976-95008683",
              image: "/images/Branches/Дамбадаржаа.jpg"
     },
         {
       id: "Хүүхдийн 100",
       name: "Хүүхдийн 100",
       address: "Сүхбаатар дүүрэг, Улаанбаатар",
       district: "Сүхбаатар",
       lat: 47.9115,
       lng: 106.8691,
       hours: "08:00-24:00",
       phone: "+976-80084979",
              image: "/images/Branches/Хүүхдийн 100.jpg"
     },
    {
      id: "Яармаг",
      name: "Яармаг",
      address: "Монгол улс, Улаанбаатар хот – 17100, Хан-Уул дүүрэг, Яармаг - FOOD CITY, Яармагийн урд дэнж-2",
      district: "Хан-Уул",
      lat: 47.8786,
      lng: 106.7995,
      hours: "08:00-24:00",
      phone: "72722121-3",
      phone2: "+97680007252",
      email: "laundryzone.yarmag3@gmail.com",
      facebook: "https://www.facebook.com/laundryzone.yarmag/",
             image: "/images/Branches/Яармаг.jpg"
    },
         {
       id: "19-р хороолол",
       name: "19-р хороолол",
       address: "Хан-Уул дүүрэг, Улаанбаатар",
       district: "Хан-Уул",
       lat: 47.9000,
       lng: 106.8652,
       hours: "08:00-24:00",
       phone: "+976-80602033",
              image: "/images/Branches/19-р хороолол.jpg"
     },
    {
      id: "Рапид - Хурд",
      name: "Рапид - Хурд",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-24:00",
             phone: "+976-77559099",
              image: "/images/placeholder_image.png"
    },
    {
      id: "Нисэх",
      name: "Нисэх",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-24:00",
             phone: "+976-90209194",
              image: "/images/placeholder_image.png"
    },
    {
      id: "kingTower",
      name: "МАРШАЛ-КингТауэр",
      address: "Монгол улс, Улаанбаатар хот – 17012, Хан-Уул дүүрэг, МАРШАЛ таун хотхон, \"KING TOWER\" 135-р байр",
      district: "Хан-Уул",
      lat: 47.8937,
      lng: 106.9229,
      hours: "08:00-24:00",
      phone: "72722121-4",
      phone2: "80084979",
      facebook: "https://www.facebook.com/LaundryZoneMarshalTown",
             image: "/images/Branches/МАРШАЛ-КингТауэр.jpg"
    }
  ];

  // Get unique districts
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(branches.map(branch => branch.district)));
    return uniqueDistricts.sort();
  }, []);

  // Filter branches
  const filteredBranches = useMemo(() => {
    return branches.filter(branch => {
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
  }, [branches, selectedDistrict, selectedHours, searchTerm]);

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
           <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
             {t('branches.subtitle')}
           </p>
         </motion.div>

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
              <div className="relative w-full h-48 bg-neutral-100 rounded-t-2xl overflow-hidden">
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
                  }`}
                  priority={index < 6}
                  loading={index < 6 ? "eager" : "lazy"}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoad={() => handleImageLoad(branch.id)}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col h-full">
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
                <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${branch.lat},${branch.lng}`}
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
