'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { MapPin, Clock, Phone, Wifi, Droplets, Filter, X, Search, SlidersHorizontal, Map, Settings } from 'lucide-react';

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
  services: string[];
  images: string[];
}

export function Branches({ locale }: BranchesProps) {
  const t = useTranslations();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedHours, setSelectedHours] = useState<string>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);

  // Function to translate service names
  const translateService = (service: string) => {
    switch (service) {
      case 'Self-service':
        return t('branches.service_types.self_service');
      case 'Wash & Dry':
        return t('branches.service_types.wash_dry');
      case 'Wi-Fi':
        return t('branches.service_types.wifi');
      case 'Detergent':
        return t('branches.service_types.detergent');
      default:
        return service;
    }
  };

  // Branch data with districts - updated hours to 08:00-00:00
  const branches: Branch[] = [
    {
      id: "Дүнжингарав",
      name: "Дүнжингарав",
             address: "Монгол улс, Улаанбаатар хот – 13312, Дүнжингарав, Баянзүрх дүүрэг, 26-р хороо, Sunny Town хотхон",
      district: "Баянзүрх",
      lat: 47.9041,
      lng: 106.9393,
      hours: "08:00-00:00",
      phone: "+976-95007443",
      services: ["Self-service", "Wash & Dry", "Wi-Fi"],
      images: ["/images/branches/mnd-1.jpg"]
    },
    {
      id: "Сансар Emart",
      name: "Сансар Emart",
      address: "Баянзүрх дүүрэг, Улаанбаатар",
      district: "Баянзүрх",
      lat: 47.9236,
      lng: 106.9319,
      hours: "08:00-00:00",
      phone: "+976-90082888",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/sukhbaatar-1.jpg"]
    },
    {
      id: "Баянцээл",
      name: "Баянцээл",
      address: "Баянзүрх дүүрэг, Улаанбаатар",
      district: "Баянзүрх",
      lat: 47.9225,
      lng: 106.9338,
      hours: "08:00-00:00",
      phone: "+976-94110793",
      services: ["Self-service", "Wash & Dry", "Wi-Fi"],
      images: ["/images/branches/bayangol-1.jpg"]
    },
    {
      id: "Шархад - ДХИС",
      name: "Шархад - ДХИС",
      address: "Баянзүрх дүүрэг, Улаанбаатар",
      district: "Баянзүрх",
      lat: 47.9175,
      lng: 106.9925,
      hours: "08:00-00:00",
      phone: "+976-91980247",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Монел Цайз 16",
      name: "Монел Цайз 16",
      address: "Баянзүрх дүүрэг, Улаанбаатар",
      district: "Баянзүрх",
      lat: 47.9245,
      lng: 106.9662,
      hours: "08:00-00:00",
      phone: "+976-95007446",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/sukhbaatar-1.jpg"]
    },
    {
      id: "Дарь Эх",
      name: "Дарь Эх",
      address: "Баянзүрх дүүрэг, Улаанбаатар",
      district: "Баянзүрх",
      lat: 47.9340,
      lng: 106.8962,
      hours: "08:00-00:00",
      phone: "+976-94954004",
      services: ["Self-service", "Wash & Dry", "Wi-Fi"],
      images: ["/images/branches/bayangol-1.jpg"]
    },
    {
      id: "1-р хороолол",
      name: "1-р хороолол",
      address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
      district: "Сонгинохайрхан",
      lat: 47.9113,
      lng: 106.8177,
      hours: "08:00-00:00",
      phone: "+976-95105868",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "21-р хороолол",
      name: "21-р хороолол",
      address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
      district: "Сонгинохайрхан",
      lat: 47.9211,
      lng: 106.8140,
      hours: "08:00-00:00",
      phone: "+976-90907777",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Баянхошуу",
      name: "Баянхошуу",
      address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
      district: "Сонгинохайрхан",
      lat: 47.9557,
      lng: 106.8373,
      hours: "08:00-00:00",
      phone: "+976-89202457",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Орбит",
      name: "Орбит",
      address: "Сонгинохайрхан дүүрэг, Улаанбаатар",
      district: "Сонгинохайрхан",
      lat: 47.9154,
      lng: 106.7511,
      hours: "08:00-00:00",
      phone: "+976-91960247",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Чингэлтэй",
      name: "Чингэлтэй",
      address: "Чингэлтэй дүүрэг, Улаанбаатар",
      district: "Чингэлтэй",
      lat: 47.9684,
      lng: 106.9166,
      hours: "08:00-00:00",
      phone: "+976-94383003",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Тэнгис Кино Театр",
      name: "Тэнгис Кино Театр",
      address: "Чингэлтэй дүүрэг, Улаанбаатар",
      district: "Чингэлтэй",
      lat: 47.9231,
      lng: 106.9034,
      hours: "08:00-00:00",
      phone: "+976-99806252",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Хайлааст",
      name: "Хайлааст",
      address: "Чингэлтэй дүүрэг, Улаанбаатар",
      district: "Чингэлтэй",
      lat: 47.9610,
      lng: 106.8982,
      hours: "08:00-00:00",
      phone: "+976-85004010",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Налайх",
      name: "Налайх",
      address: "Налайх дүүрэг, Улаанбаатар",
      district: "Налайх",
      lat: 47.7730,
      lng: 107.2406,
      hours: "08:00-00:00",
      phone: "+976-90126677",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "4-р хороолол",
      name: "4-р хороолол",
      address: "Баянгол дүүрэг, Улаанбаатар",
      district: "Баянгол",
      lat: 47.9214,
      lng: 106.8703,
      hours: "08:00-00:00",
      phone: "+976-90044848",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/sukhbaatar-1.jpg"]
    },
    {
      id: "Барс",
      name: "Барс",
      address: "Баянгол дүүрэг, Улаанбаатар",
      district: "Баянгол",
      lat: 47.9097,
      lng: 106.8800,
      hours: "08:00-00:00",
      phone: "+976-90006818",
      services: ["Self-service", "Wash & Dry", "Wi-Fi"],
      images: ["/images/branches/bayangol-1.jpg"]
    },
    {
      id: "Нарны Хороолол",
      name: "Нарны Хороолол",
      address: "Баянгол дүүрэг, Улаанбаатар",
      district: "Баянгол",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-00:00",
      phone: "+976-96682329",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Зурагт - Эх Нялхас",
      name: "Зурагт - Эх Нялхас",
      address: "Баянгол дүүрэг, Улаанбаатар",
      district: "Баянгол",
      lat: 47.9184,
      lng: 106.9177,
      hours: "08:00-00:00",
      phone: "+976-85815544",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/sukhbaatar-1.jpg"]
    },
    {
      id: "Гэмтлийн Эмнэлэг",
      name: "Гэмтлийн Эмнэлэг",
      address: "Баянгол дүүрэг, Улаанбаатар",
      district: "Баянгол",
      lat: 47.9200,
      lng: 106.9200,
      hours: "08:00-00:00",
      phone: "+976-80602033",
      services: ["Self-service", "Wash & Dry", "Wi-Fi"],
      images: ["/images/branches/bayangol-1.jpg"]
    },
    {
      id: "Рашаант",
      name: "Рашаант",
      address: "Сүхбаатар дүүрэг, Улаанбаатар",
      district: "Сүхбаатар",
      lat: 47.9346,
      lng: 106.9161,
      hours: "08:00-00:00",
      phone: "+976-95007442",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Дамбадаржаа",
      name: "Дамбадаржаа",
      address: "Сүхбаатар дүүрэг, Улаанбаатар",
      district: "Сүхбаатар",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-00:00",
      phone: "+976-95008683",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Хүүхдийн 100",
      name: "Хүүхдийн 100",
      address: "Сүхбаатар дүүрэг, Улаанбаатар",
      district: "Сүхбаатар",
      lat: 47.9115,
      lng: 106.8691,
      hours: "08:00-00:00",
      phone: "+976-80084979",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Яармаг",
      name: "Яармаг",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.8786,
      lng: 106.7995,
      hours: "08:00-00:00",
      phone: "+976-80007252",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "19-р хороолол",
      name: "19-р хороолол",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.9000,
      lng: 106.8652,
      hours: "08:00-00:00",
      phone: "+976-80602033",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Рапид - Хурд",
      name: "Рапид - Хурд",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-00:00",
      phone: "+976-77559099",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "Нисэх",
      name: "Нисэх",
      address: "Хан-Уул дүүрэг, Улаанбаатар",
      district: "Хан-Уул",
      lat: 47.9250,
      lng: 106.9250,
      hours: "08:00-00:00",
      phone: "+976-90209194",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    },
    {
      id: "kingTower",
      name: "Маршал-Кинг Тауэр",
      address: "Монгол улс, Улаанбаатар хот – 17012, Хан-Уул дүүрэг, МАРШАЛ таун хотхон, \"KING TOWER\" 135-р байр.",
      district: "Хан-Уул",
      lat: 47.8937,
      lng: 106.9229,
      hours: "08:00-00:00",
      phone: "+976-80084979",
      services: ["Self-service", "Wash & Dry", "Wi-Fi", "Detergent"],
      images: ["/images/branches/khan-uul-1.jpg"]
    }
  ];

  // Get unique districts and services
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(branches.map(branch => branch.district)));
    return uniqueDistricts.sort();
  }, []);

  const allServices = useMemo(() => {
    const services = new Set<string>();
    branches.forEach(branch => {
      branch.services.forEach(service => services.add(service));
    });
    return Array.from(services);
  }, []);

  // Filter branches
  const filteredBranches = useMemo(() => {
    return branches.filter(branch => {
      // District filter
      if (selectedDistrict !== 'all' && branch.district !== selectedDistrict) {
        return false;
      }

      // Hours filter
      if (selectedHours !== 'all' && branch.hours !== selectedHours) {
        return false;
      }

      // Services filter
      if (selectedServices.length > 0) {
        const hasAllSelectedServices = selectedServices.every(service => 
          branch.services.includes(service)
        );
        if (!hasAllSelectedServices) {
          return false;
        }
      }

      // Search filter
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
  }, [branches, selectedDistrict, selectedHours, selectedServices, searchTerm]);

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Self-service':
        return <Settings size={16} className="text-purple-500" />;
      case 'Wash & Dry':
        return <Droplets size={16} className="text-blue-500" />;
      case 'Wi-Fi':
        return <Wifi size={16} className="text-green-500" />;
      case 'Detergent':
        return <Droplets size={16} className="text-orange-500" />;
      default:
        return <Settings size={16} className="text-gray-500" />;
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedDistrict('all');
    setSelectedHours('all');
    setSelectedServices([]);
    setSearchTerm('');
  };

  const handleBranchSelect = (branch: Branch) => {
    setMapLoading(true);
    setSelectedBranch(branch);
    // Simulate loading time for map update
    setTimeout(() => setMapLoading(false), 500);
  };

  const hasActiveFilters = selectedDistrict !== 'all' || selectedHours !== 'all' || selectedServices.length > 0 || searchTerm;

  // Function to get Google Maps embed URL based on selected branch
  const getGoogleMapsUrl = (branch: Branch | null) => {
    if (!branch) {
      // Default to Ulaanbaatar center if no branch is selected
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264770776!2d106.8384355!3d47.904556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzE2LjQiTiAxMDbCsDUwJzE4LjQiRQ!5e0!3m2!1sen!2smn!4v1703123456789";
    }
    
         // Use the actual embed URLs provided for each branch
     const embedUrls: { [key: string]: string } = {
       "Дүнжингарав": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.6686086229383!2d106.939326019707!3d47.904099093853965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96936a2ffe88df%3A0xc038abb9ca8304c5!2zTGF1bmRyeXpvbmUgLSDQlNKv0L3QttC40L3Qs9Cw0YDQsNCyINGB0LDQu9Cx0LDRgA!5e0!3m2!1sen!2smn!4v1756045651375!5m2!1sen!2smn",
       "Сансар Emart": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.565515172927!2d106.93191094005255!3d47.92355021781323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969215f3f9493f%3A0x5bb3cc4e7abf2678!2sEmart%20-%20Chinggis!5e0!3m2!1sen!2smn!4v1756046430599!5m2!1sen!2smn",
       "Баянцээл": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5347.434718010074!2d106.93383567770994!3d47.9225061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969348b726645b%3A0x178080586aeacb95!2zTGF1bmRyeSBab25lIC0g0KHQsNC90YHQsNGAINCx0LDRj9C90YbRjdGN0Lsg0YHQsNC70LHQsNGA!5e0!3m2!1sen!2smn!4v1756046458783!5m2!1sen!2smn",
       "Барс": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5348.757089007919!2d106.88003467771!3d47.9097125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96937d1dcbbf6b%3A0x97404549ea77d8cc!2sLaundryzone%20Bars%20salbar!5e0!3m2!1sen!2smn!4v1756046575855!5m2!1sen!2smn",
       "Маршал-Кинг Тауэр": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.205024848992!2d106.92285299825255!3d47.893716899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693d00bdb7cd9%3A0x23be7dfd11b1d151!2s135%2C%20HUD%20-%2017%20khoroo%2C%20Ulaanbaatar%2017012!5e0!3m2!1sen!2smn!4v1756046611881!5m2!1sen!2smn",
       "19-р хороолол": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21399.061234540168!2d106.86521801083983!3d47.89995649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693b989d2ba77%3A0x4881500bcea478d9!2zTGF1bmRyeXpvbmUg06nTqdGA0YLTqdOpINKv0LnQu9GH0LvRjdGFINGD0LPQsNCw0LvQs9GL0L0g0LPQsNC30LDRgCAxOS3RgCDRhdC-0YDQvtC-0LvQvtC7INGB0LDQu9Cx0LDRgA!5e0!3m2!1sen!2smn!4v1756046671745!5m2!1sen!2smn",
       "Яармаг": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30275.31290986684!2d106.79952249598232!3d47.87861992561864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693ea721af58d%3A0xaacdc394d25acdcf!2sLaundryzone!5e0!3m2!1sen!2smn!4v1756046709535!5m2!1sen!2smn",
       "Хүүхдийн 100": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21394.286901935146!2d106.86905221833133!3d47.911505999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930180bb3539%3A0xaa4a93db7ac7919a!2zTGF1bmRyeVpvbmUg0KXSr9Kv0YXQtNC40LnQvS0xMDAg0YHQsNC70LHQsNGA!5e0!3m2!1sen!2smn!4v1756046873193!5m2!1sen!2smn",
       "Дарь Эх": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21384.967970531867!2d106.89617391083985!3d47.9340432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96931eb19afe73%3A0x615280160f9382c8!2zTGF1bmRyeXpvbmUg06nTqdGA0YLTqdOpINKv0LnQu9GH0LvRjdGFINGD0LPQsNCw0LvQs9GL0L0g0LPQsNC30LDRgCAi0JTQsNGA0Ywt0K3RhSIg0YHQsNC70LHQsNGA!5e0!3m2!1sen!2smn!4v1756046920747!5m2!1sen!2smn",
       "1-р хороолол": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21394.381989551348!2d106.81767724564214!3d47.911275995824695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693d44802980d%3A0x41c1f850e06b1aeb!2sLaundryzone!5e0!3m2!1sen!2smn!4v1756046960019!5m2!1sen!2smn",
       "Шархад - ДХИС": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2248.535462621297!2d106.9925255774009!3d47.917533366275336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9691ceac5641d7%3A0x685fe0e251ff989d!2zTGF1bmRyeXpvbmUgLSDigJzQqNCw0YAg0YXQsNC04oCdINGB0LDQu9Cx0LDRgA!5e0!3m2!1sen!2smn!4v1756047073674!5m2!1sen!2smn",
       "Рашаант": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d668.2732378616205!2d106.91611756970894!3d47.934585698201424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969300421e4987%3A0x8fcf9f3910835d99!2sGuren-4%20salbar!5e0!3m2!1sen!2smn!4v1756047433305!5m2!1sen!2smn",
       "Налайх": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10725.741405099867!2d107.24058665541992!3d47.77300570000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d942193dfb2ce57%3A0xeac17c25ed3b85b5!2zTGF1bmRyeXpvbmUgLSDQndCw0LvQsNC50YUg0YHQsNC70LHQsNGA!5e0!3m2!1sen!2smn!4v1756047517326!5m2!1sen!2smn",
       "4-р хороолол": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.7736602645828!2d106.87030258885497!3d47.921416800000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693004ad7e883%3A0x1391e5501f4a2638!2zTGF1bmRyeXpvbmUg0YXQvtGA0L7QvtC70L7QuyDRgdCw0LvQsdCw0YA!5e0!3m2!1sen!2smn!4v1756047643937!5m2!1sen!2smn",
       "21-р хороолол": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.7883273448656!2d106.81401729583739!3d47.92113302262929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ed002dfcef7f%3A0xb9a09cde85b715d0!2z0KHQvtC00L7QvSDRhdC-0YDQvtC-0LvQvtC7!5e0!3m2!1sen!2smn!4v1756048079141!5m2!1sen!2smn",
       "Баянхошуу": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5344.003006951514!2d106.83734398603734!3d47.95569500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ed58cecff71b%3A0x442fb45d0f1adfcd!2z0JbQsNC90YbQsNC9INGF0YPQtNCw0LvQtNCw0LDQvdGLINGC06nQsg!5e0!3m2!1sen!2smn!4v1756048452841!5m2!1sen!2smn",
       "Монел Цайз 16": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167.1009786132089!2d106.9662175078162!3d47.92447373701224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9691f1393fafb5%3A0x27ad7a201a3528e8!2sWXF8%2BMHP%2C%20BZD%20-%2032%20khoroo%2C%20Ulaanbaatar%2013292!5e0!3m2!1sen!2smn!4v1756048792211!5m2!1sen!2smn",
       "Тэнгис Кино Театр": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d562.0734267681963!2d106.9034202604436!3d47.923095925049466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693582a1e1051%3A0x9132246d12fcdb2b!2z0KfQuNC80Y3QsyDRgtOp0LI!5e0!3m2!1sen!2smn!4v1756048890069!5m2!1sen!2smn",
       "Хайлааст": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d944.5983252903601!2d106.89823446234453!3d47.96099281301293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d968dd14f802083%3A0x4e5bbfad612ef470!2zTGF1bmRyeXpvbmUg0KXQsNC50LvQsNCw0YHRgiDRgdCw0LvQsdCw0YA!5e0!3m2!1sen!2smn!4v1756049057872!5m2!1sen!2smn",
       "Орбит": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10696.339820485546!2d106.7511039424778!3d47.91539362228019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ed0075914641%3A0xe0af1d4ae4bf8e06!2sOrbit%20salbar%20Laundryzone!5e0!3m2!1sen!2smn!4v1756049181318!5m2!1sen!2smn",
       "Чингэлтэй": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d561.5806583632741!2d106.91655500105718!3d47.968430226313735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d968d0c57a60bdd%3A0x426cdeb8018e6ffa!2zNyDQkdCj0KPQlNCQ0Js!5e0!3m2!1sen!2smn!4v1756049319608!5m2!1sen!2smn"
     };
    
    // Return the specific embed URL for the branch, or default if not found
    return embedUrls[branch.name] || embedUrls[branch.id] || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264770776!2d106.8384355!3d47.904556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzE2LjQiTiAxMDbCsDUwJzE4LjQiRQ!5e0!3m2!1sen!2smn!4v1703123456789";
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
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                                     <div className="p-4 lg:p-6 bg-gradient-to-r from-neutral-50 to-accent-50">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                          <option value="08:00-00:00">08:00-00:00</option>
                        </select>
                      </div>

                      {/* Services Filter */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-neutral-700 flex items-center gap-2">
                                                     <Wifi size={16} className="text-accent-500" />
                          {t('branches.filter_services')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {allServices.map(service => (
                            <button
                              key={service}
                              onClick={() => toggleService(service)}
                                                           className={`px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm rounded-lg border transition-all duration-200 ${
                               selectedServices.includes(service)
                                                                   ? 'bg-accent-500 text-white border-accent-500 shadow-md scale-105'
                                                                   : 'bg-gradient-to-br from-white to-neutral-50 text-neutral-600 border-neutral-200 hover:border-accent-300 hover:from-accent-50 hover:to-accent-100'
                             }`}
                            >
                              {translateService(service)}
                            </button>
                          ))}
                        </div>
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branch Cards - Scrollable */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-soft p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                 <MapPin size={20} className="text-accent-500" />
                {t('branches.nearby_branches')}
              </h3>
                             <div className="max-h-[700px] overflow-y-auto space-y-4 pr-2">
                <AnimatePresence>
                  {filteredBranches.map((branch, index) => (
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                                             className={`card cursor-pointer transition-all duration-200 relative ${
                         selectedBranch?.id === branch.id 
                                                      ? 'ring-0 ring-accent-500  bg-gradient-to-br from-accent-50 to-accent-100 shadow-lg scale-[1.02]' 
                           : 'hover:shadow-medium hover:scale-[1.01]'
                       }`}
                      onClick={() => handleBranchSelect(branch)}
                    >
                      {/* Selected Indicator */}
                      {selectedBranch?.id === branch.id && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                      )}
                                                                     <div className="flex items-start space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MapPin size={18} className="text-accent-500" />
                          </div>
                         
                         <div className="flex-1 min-w-0">
                           <h4 className="text-base lg:text-lg font-semibold text-neutral-900 mb-1">
                             {branch.name}
                           </h4>
                           
                                                       <div className="space-y-2 text-sm text-neutral-600">
                              <div className="flex items-center space-x-2">
                                <MapPin size={14} className="text-neutral-400" />
                                <span className="truncate">{branch.district}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Clock size={14} className="text-neutral-400" />
                                <span>{branch.hours}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Phone size={14} className="text-neutral-400" />
                                <span className="truncate">{branch.phone}</span>
                              </div>
                            </div>
                           
                                                       {/* Services */}
                            <div className="mt-3">
                              <div className="flex flex-wrap gap-2">
                               {branch.services.map((service) => (
                                 <div
                                   key={service}
                                                                       className="inline-flex items-center space-x-1 lg:space-x-1.5 px-2 lg:px-3 py-1 lg:py-1.5 bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 rounded-lg text-xs font-medium text-accent-700 shadow-sm hover:shadow-md transition-all duration-200"
                                 >
                                   {getServiceIcon(service)}
                                   <span className="hidden sm:inline">{translateService(service)}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       {/* View on Map Button */}
                       <div className="mt-3 pt-3 border-t border-neutral-100">
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             handleBranchSelect(branch);
                           }}
                           className="w-full text-xs text-accent-600 hover:text-accent-700 font-medium flex items-center justify-center gap-1 transition-colors"
                         >
                           <Map size={12} />
                           {t('branches.view_on_map')}
                         </button>
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredBranches.length === 0 && (
                  <div className="text-center py-8 text-neutral-500">
                    {t('branches.no_results')}
                  </div>
                )}
              </div>
            </div>
          </div>

                     {/* Google Maps - Fixed */}
           <div className="lg:col-span-2 order-1 lg:order-2">
             <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-soft p-4 lg:p-6 h-[400px] lg:h-[600px]">
               <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                 <Map size={18} className="text-accent-500 lg:w-5 lg:h-5" />
                 {selectedBranch ? `${t('branches.map_title')} - ${selectedBranch.name}` : t('branches.map_title')}
               </h3>
              
                            {/* Google Maps Embed with Fallback */}
                             <div className="w-full h-full rounded-xl overflow-hidden relative">
                               {/* Loading Overlay */}
                               {mapLoading && (
                                 <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-xl">
                                   <div className="text-center">
                                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-2"></div>
                                     <p className="text-sm text-neutral-600">{t('branches.loading_map')}</p>
                                   </div>
                                 </div>
                               )}
                 <iframe
                   src={getGoogleMapsUrl(selectedBranch)}
                   width="100%"
                   height="100%"
                   style={{ border: 0 }}
                   allowFullScreen
                   loading="lazy"
                   referrerPolicy="no-referrer-when-downgrade"
                   title={`LaundryZone ${selectedBranch?.name || 'Branches'} Map`}
                   key={selectedBranch?.id || 'default'} // Force re-render when branch changes
                 />
                 
                 {/* Fallback if iframe fails */}
                 <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   <div className="text-center p-6">
                     <Map size={48} className="text-accent-500 mx-auto mb-4" />
                     <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                       {t('branches.map_title')}
                     </h4>
                     <p className="text-neutral-600 text-sm mb-4">
                       {t('branches.map_subtitle')}
                     </p>
                     <a
                       href="https://www.google.com/maps/search/laundryzone/@47.904556,106.8384355,12.5z?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                     >
                       <Map size={16} />
                       {t('branches.open_google_maps')}
                     </a>
                   </div>
                 </div>
               </div>

                             
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          {/* <div className="bg-gradient-to-r from-accent-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('branches.find_nearest')}
            </h3>
            <p className="text-accent-100 mb-6 max-w-2xl mx-auto">
              {t('branches.cta_description')}
            </p>
            <a
              href={`/${locale}/contact`}
                             className="bg-gradient-to-br from-white to-neutral-50 text-accent-500 hover:from-neutral-100 hover:to-neutral-200 font-medium py-3 px-6 rounded-2xl transition-all duration-200 inline-flex items-center"
            >
              {t('branches.get_directions')}
            </a>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
