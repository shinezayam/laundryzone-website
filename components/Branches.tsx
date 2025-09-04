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
      address: "Баянзүрх дүүрэг, 26-р хороо, Санни Таун хотхон, 1-р давхарт, Улаанбаатар хот, Монгол улс",
      district: "Баянзүрх",
      lat: 47.9041,
      lng: 106.9393,
      hours: "08:00-24:00",
      phone: "+976 9500 7443",
      email: "laundryzone.mongolia@gmail.com",
      facebook: "https://www.facebook.com/laundryzone.mongolia/",
             image: "/images/Branches/Дүнжингарав.jpg"
    },
    {
      id: "4-р хороолол",
      name: "4-р хороолол",
      address: "Баянгол дүүрэг, 8-р хороо, 4-р хороолол, Pearl Apartment\" орон сууцны 1 давхар, Улаанбаатар хот, Монгол улс",
      district: "Баянгол",
      lat: 47.9214,
      lng: 106.8703,
      hours: "08:00-24:00",
      phone: "72722121-2",
      phone2: "+976 9004 4848",
      facebook: "https://www.facebook.com/laundryzone.branch2/",
             image: "/images/Branches/4-р хороолол.jpg"
    },    
    {
      id: "Яармаг",
      name: "Яармаг",
      address: "Хан-Уул, 4-р хороо, Наадамчдын гудамж, Food City худалдааны төв, Улаанбаатар хот, Монгол улс",
      district: "Хан-Уул",
      lat: 47.9214,
      lng: 106.8703,
      hours: "08:00-24:00",
      phone: "+976 8865 7370",
      facebook: "https://www.facebook.com/laundryzone.yarmag",
             image: "/images/Branches/Яармаг.jpg"
    },
    {
      id: "Хүүхдийн 100",
      name: "Хүүхдийн 100",
      address: "Хүүхдийн 100, Наран молл-н зүүн урд, 68-р цэцэрлэгийн зүүн талд, Улаанбаатар хот, Монгол улс",
      district: "Сүхбаатар",
      lat: 47.9214,
      lng: 106.8703,
      hours: "08:00-24:00",
      phone: "+976 8008 4979",
      phone2: "+976 9961 6303",
      facebook: "https://www.facebook.com/LaundryZoneMarshalTown",
             image: "/images/Branches/Хүүхдийн 100.jpg"
    },
    {
      id: "Сансар И-март",
      name: "Сансар И-март",
      address: "12-р хороолол, Сансар И-март, Улаанбаатар хот, Монгол улс",
      district: "Баянзүрх",
      lat: 47.9236,
      lng: 106.9319,
      hours: "08:00-24:00",
      phone: "+976 7272 2121-5",
      phone2: "+976 9008 2080",
      facebook: "https://www.facebook.com/laundryzonesansaremart",
             image: "/images/Branches/Сансар.jpg"
    },
    {
      id: "Барс Зах",
      name: "Барс Зах",
      address: "Барс захын хойд туслах зам дагуу Хаан Банктай байрны хажуугийн 132-р байрны 1 давхарт, Улаанбаатар хот, Монгол улс",
      district: "Баянгол",
      lat: 47.9097,
      lng: 106.8800,
      hours: "08:00-24:00",
      phone: "72722121-6",
      phone2: "90006818",
      facebook: "https://www.facebook.com/laundrybars",
             image: "/images/Branches/Барс_Зах.jpg"
    },
    {
      id: "Өмнөговь аймаг",
      name: "Өмнөговь аймаг",
      address: "Гүний ус ХК-нийн урд талд, Даланзадгад сум, Өмнөговь аймаг, Монгол улс",
      district: "Орон нутаг",
      lat: 47.9097,
      lng: 106.8800,
      hours: "08:00-24:00",
      phone: "+976 8309 5555",
      facebook: "https://www.facebook.com/profile.php?id=100084351392239",
             image: "/images/Branches/Өмнөговь.jpg"
    },
    {
      id: "1-р Хороолол",
      name: "1-р Хороолол",
      address: "Баянгол дүүрэг, 20-р хороо, Улаанбаатар хот, Монгол улс",
      district: "Баянгол",
      lat: 47.9113,
      lng: 106.8177,
      hours: "08:00-24:00",
      phone: "+976 9510 5868",
      facebook: "https://www.facebook.com/laundryzone.ulaanbaatar/",
             image: "/images/Branches/1-р хороолол.jpg"
    },
    {
      id: "Баянцээл",
      name: "Баянцээл",
      address: "Баянзүрх дүүрэг, 7-р Хороо, Сансар Баянцээлийн туслахаар дээш өгсөөд МОБИКОМ, ЮНИТЕЛ-ийн хажууд 2-р байр, Улаанбаатар хот, Монгол улс",
      district: "Баянзүрх",
      lat: 47.9225,
      lng: 106.9338,
      hours: "08:00-24:00",
      phone: "+976 9411 0793",
      facebook: "https://www.facebook.com/LaundryZoneBayntseelSalbar/",
             image: "/images/Branches/Баянцээл.jpg"
    },
    {
      id: "Налайх",
      name: "Налайх",
      address: "Налайх дүүрэг, 2-р хороо, Уурхайчдын гудамж-2, Тайж төвийн хойно, Улаанбаатар хот, Монгол улс",
      district: "Налайх",
      lat: 47.7730,
      lng: 107.2406,
      hours: "08:00-24:00",
      phone: "+976 9012 6677",
      facebook: "https://www.facebook.com/laundryzone.nalaikh",
             image: "/images/Branches/Налайх.jpg"
    },
    {
      id: "Шархад - ДХИС",
      name: "Шархад - ДХИС",
      address: "Баянзүрх дүүрэг, 8-р хороо, Шар хад-1, Хилчний гудамж, 121-р байр, 101 тоот, Улаанбаатар хот, Монгол улс",
      district: "Баянзүрх",
      lat: 47.9175,
      lng: 106.9925,
      hours: "08:00-24:00",
      phone: "+976 7611 1247",
      facebook: "https://www.facebook.com/Laundryzone.sharkhad",
              image: "/images/Branches/Шархад.jpg"
    },
    {
      id: "Рашаант - 32",
      name: "Рашаант - 32",
      address: "Сүхбаатар дүүрэг, 11-х хороо, Рашаант хотхон, 1 давхар, Улаанбаатар хот, Монгол улс",
      district: "Сүхбаатар",
      lat: 47.9245,
      lng: 106.9662,
      hours: "08:00-24:00",
      phone: "+976 9500 7442",
      facebook: "https://www.facebook.com/laundryzone.rashaant32",
             image: "/images/Branches/Рашаант.jpg"
    },
    {
        id: "Монел - Цайз 16",
        name: "Монел - Цайз 16",
        address: "Баянзүрх дүүрэг, 22-р хороо, Монелийн гэрлэн дохиотой уулзварын зүүн хойно, 101 тоот байр, Улаанбаатар хот, Монгол улс",
        district: "Баянзүрх",
        lat: 47.9245,
        lng: 106.9662,
        hours: "08:00-24:00",
        phone: "+976 9500 7446",
        facebook: "https://www.facebook.com/laundryzone.monel",
               image: "/images/Branches/Монел Цайз 16.jpg"
      },
      {
        id: "19-р хороолол",
        name: "19-р хороолол",
        address: "Хан-Уул дүүрэг, 2-р хороо, 19 үйлчилгээний төвөөс Номин агуулах руу явах зам дагуу, Улаанбаатар хот, Монгол улс",
        district: "Хан-Уул",
        lat: 47.9000,
        lng: 106.8652,
        hours: "08:00-24:00",
        phone: "+976 8060 2033",
        facebook: "https://www.facebook.com/profile.php?id=100087135199549",
              image: "/images/Branches/19-р хороолол.jpg"
      },
      {
        id: "21 - Содон хороолол",
        name: "21 - Содон хороолол",
        address: "Сонгинохайрхан дүүрэг, 37-р хороо, Содон хороолол, 104-р байр, Улаанбаатар хот, Монгол улс",
        district: "Сонгинохайрхан",
        lat: 47.9211,
        lng: 106.8140,
        hours: "08:00-24:00",
        phone: "+976 9090 7777",
        facebook: "https://www.facebook.com/LaundryzoneSodon",
                image: "/images/Branches/21 - Содон хороолол.jpg"
      },
      {
        id: "Дорнод аймаг",
        name: "Дорнод аймаг",
        address: "Дорнод аймаг, Чойбалсан хот, Юнителтэй 70-р байр, Гэгээ төвийн В1 давхарт, Монгол улс",
        district: "Орон нутаг",
        lat: 47.9211,
        lng: 106.8140,
        hours: "08:00-24:00",
        phone: "+976 9191 6818",
        facebook: "https://www.facebook.com/profile.php?id=100088826766556",
                image: "/images/Branches/Дорнод.jpg"
      },
      {
        id: "Зурагт - Эх Нялхас",
        name: "Зурагт - Эх Нялхас",
        address: "Баянгол дүүрэг, 11-р хороо, 4-р хороолол, Хувьсгалын зам, (МҮОНРТ-ын урд) Гэрэлт Очир хотхон, 30А байр, Улаанбаатар хот, Монгол улс",
        district: "Баянгол",
        lat: 47.9184,
        lng: 106.9177,
        hours: "08:00-24:00",
        phone: "+976 8581 5544",
        facebook: "https://www.facebook.com/profile.php?id=100095010397188",
               image: "/images/Branches/Эх нялхас.jpg"
      },
      {
        id: "Эрдэнэт салбар",
        name: "Эрдэнэт салбар",
        address: "Баян-Өндөр сум, Цагаанчулуут баг, 7-р хороолол, 1-120/3 байр, 103 тоот",
        district: "Орон нутаг",
        lat: 47.9184,
        lng: 106.9177,
        hours: "08:00-24:00",
        phone: "+976 9500 7856",
        facebook: "https://www.facebook.com/laundryzone.erdenet/",
               image: "/images/Branches/Эрдэнэт.jpg"
      },
      {
        id: "Хөвсгөл аймаг - Мөрөн салбар",
        name: "Хөвсгөл аймаг - Мөрөн салбар",
        address: "Мөрөн хот, Согоот 2, Есөн эрдэнэ хотхон, 217-р байр",
        district: "Орон нутаг",
        lat: 47.9184,
        lng: 106.9177,
        hours: "08:00-24:00",
        phone: "+976 9422 3447",
        facebook: "https://www.facebook.com/laundryzone.khuvsgul/",
               image: "/images/Branches/Хөвсгөл аймаг - Мөрөн салбар.jpg"
      },
      {
        id: "Нарны Хороолол",
        name: "Нарны Хороолол",
        address: "Баянгол дүүрэг, 26-р хороо, Нарны хороолол, 2-р байр,Улаанбаатар хот, Монгол улс",
        district: "Баянгол",
        lat: 47.9250,
        lng: 106.9250,
        hours: "08:00-24:00",
        phone: "+976 9668 2329",
        facebook: "https://www.facebook.com/profile.php?id=100093604088219",
               image: "/images/Branches/Нарны хороолол.jpg"
      },
      {
        id: "10-р хороолол - И-март",
        name: "10-р хороолол - И-март",
        address: "Баянгол дүүрэг, 6-р хороо, 10-р хорооллын И-март, В1 давхарт, Улаанбаатар хот, Монгол улс",
        district: "Баянгол дүүрэг",
        lat: 47.9184,
        lng: 106.9177,
        hours: "08:00-24:00",
        phone: "+976 9000 3801",
        facebook: "https://www.facebook.com/profile.php?id=100083213588146",
               image: "/images/Branches/10-р хороолол - И-март.jpg"
      },
      {
        id: "Рапид - Хурд",
        name: "Рапид - Хурд",
        address: "Хан-Уул дүүрэг, 15-р хороо, Рапид харш, 29-р байр, Улаанбаатар хот, Монгол улс",
        district: "Хан-Уул",
        lat: 47.9250,
        lng: 106.9250,
        hours: "08:00-24:00",
        phone: "+976 8802 8550",
                image: "/images/Branches/Нисэх.jpg"
      },
      {
        id: "Гэмтлийн Эмнэлэг",
        name: "Гэмтлийн Эмнэлэг",
        address: "Баянгол дүүрэг, 30-р хороо, Саппорогоос гэмтлийн эмнэлэг өгсөх зам дагуу Вmart төвийн 1 давхарт, Улаанбаатар хот, Монгол улс",
        district: "Баянгол",
        lat: 47.9200,
        lng: 106.9200,
        hours: "08:00-24:00",
        phone: "+976 8060 2033",
        facebook: "https://www.facebook.com/profile.php?id=61552825743219",
               image: "/images/Branches/Гэмтэл.jpg"
      },
      {
        id: "Дарь Эх",
        name: "Дарь Эх",
        address: "Баянзүрх дүүрэг, 29-р хороо, 2-р хэсэг, Сэлбийн 10 - 88 тоот, Улаанбаатар хот, Монгол улс",
        district: "Баянзүрх",
        lat: 47.9340,
        lng: 106.8962,
        hours: "08:00-24:00",
        phone: "+976 9594 4004",
        facebook: "https://www.facebook.com/laundryzone.dari.ekh",
               image: "/images/Branches/Дарь Эх.jpg"
      },
      {
        id: "Чингэлтэй - 7 буудал",
        name: "Чингэлтэй - 7 буудал",
        address: "Чингэлтэй дүүрэг, Яргайт 33 Т-569 Ш-20 (Чингэлтэй дүүрэг рүү эргээд 500м), Улаанбаатар хот, Монгол улс",
        district: "Чингэлтэй",
        lat: 47.9684,
        lng: 106.9166,
        hours: "08:00-24:00",
        phone: "+976 9438 3003",
        facebook: "https://www.facebook.com/laundryzone.chingeltei",
               image: "/images/Branches/Чингэлтэй.jpg"
      },
      {
        id: "Хөвсгөл аймаг - Номин салбар",
        name: "Хөвсгөл аймаг - Номин салбар",
        address: "Хөвсгөл аймаг, Мөрөн сум, Номин агуулахаас 250м, Тэнхлэг зочид буудлын чанх ард төв зам дагуу 24-р байр, Монгол улс",
        district: "Орон нутаг",
        lat: 47.9184,
        lng: 106.9177,
        hours: "08:00-24:00",
        phone: "",
               image: "/images/Branches/Хөвсгөл аймаг - Мөрөн салбар.jpg"
      },
      {
        id: "Нисэх",
        name: "Нисэх",
        address: "Хан-Уул дүүрэг, 21-р хороо, Космос хотхоны 1 давхарт, Буянт-Ухаа спорт цогцолборын баруун талд, Улаанбаатар хот, Монгол улс",
        district: "Хан-Уул",
        lat: 47.9250,
        lng: 106.9250,
        hours: "08:00-24:00",
        phone: "+976 9020 9194",
        facebook: "https://www.facebook.com/profile.php?id=61563123433927",
                image: "/images/placeholder_image.png"
      },
      {
       id: "Баянхошуу",
       name: "Баянхошуу",
       address: "Сонгинохайрхан дүүрэг, 9-р хороо, Баруун Уул 1-р гудамж (Баянхошуу Жанцангийн уулзварын хойно), Улаанбаатар хот, Монгол улс",
       district: "Сонгинохайрхан",
       lat: 47.9557,
       lng: 106.8373,
       hours: "08:00-24:00",
       phone: "+976 8920 2457",
       facebook: "https://www.facebook.com/profile.php?id=61567297173651",
              image: "/images/Branches/Баянхошуу.jpg"
     },
     {
      id: "Бичил хороолол",
      name: "Бичил хороолол",
      address: "Баянгол дүүрэг, Энхболдын зам руу эргээд 50м, Улаанбаатар хот, Монгол улс",
      district: "Баянгол",
      lat: 47.9557,
      lng: 106.8373,
      hours: "08:00-24:00",
      phone: "+976 9980 6252",
      facebook: "https://www.facebook.com/laundryzone.tengis",
             image: "/images/Branches/Тэнгис.jpg"
    },
     {
       id: "Орбит",
       name: "Орбит",
       address: "Сонгинохайрхан дүүрэг, 20-р хороо, Орбитын уулзвар, Алаг тараг төв, Улаанбаатар хот, Монгол улс",
       district: "Сонгинохайрхан",
       lat: 47.9154,
       lng: 106.7511,
       hours: "08:00-24:00",
       phone: "+976 9196 0247",
       facebook: "https://www.facebook.com/profile.php?id=100069384228854",
              image: "/images/Branches/Орбит.jpg"
     },
         {
       id: "Хайлааст",
       name: "Хайлааст",
       address: "Чингэлтэй дүүрэг, 15-р хороо, Хайлаастын хуучин эцэс, Өрхийн эмнэлэг тийш эргээд 150м, Түвшин-Ундраа компанийн байр, Улаанбаатар хот, Монгол улс",
       district: "Чингэлтэй",
       lat: 47.9610,
       lng: 106.8982,
       hours: "08:00-24:00",
       phone: "+976 8500 4010",
       facebook: "https://www.facebook.com/profile.php?id=100057454611542",
              image: "/images/Branches/Хайлааст.jpg"
     },
         {
       id: "Дамбадаржаа",
       name: "Дамбадаржаа",
       address: "Сүхбаатар дүүрэг, 16-р хороо, Дамбадаржаа 58-р сургуулийн замын хойно, Өвөр согоот руу өгсдөг замаар 10м, Улаанбаатар хот, Монгол улс",
       district: "Сүхбаатар",
       lat: 47.9250,
       lng: 106.9250,
       hours: "08:00-24:00",
       phone: "+976 9500 8683",
       facebook: "https://www.facebook.com/laundryzone.damba",
              image: "/images/Branches/Дамбадаржаа.jpg"
     },
    {
      id: "Увс аймаг",
      name: "Увс аймаг",
      address: "Увс аймаг, Улаангом хот, Гивааны талбайн ард Өгөөмөр амин дэм байр",
      district: "Орон нутаг",
      lat: 47.8937,
      lng: 106.9229,
      hours: "08:00-24:00",
      phone: "+976 9091 2468",
      facebook: "https://www.facebook.com/profile.php?id=61572590766659",
             image: "/images/Branches/Увс аймаг.jpg"
    },
    {
      id: "Дорноговь - Сайншанд",
      name: "Дорноговь - Сайншанд",
      address: "Дорноговь аймаг, Сайншанд сум, 3-р баг, Б.Мааньзав гудамж, Залуус хороолол, 32-р байр",
      district: "Орон нутаг",
      lat: 47.8937,
      lng: 106.9229,
      hours: "08:00-24:00",
      phone: "+976 8850 1980",
      facebook: "https://www.facebook.com/DornogobiLaundryzone",
             image: "/images/Branches/Дорноговь.jpg"
    },
    {
      id: "Төв аймаг - Зуунмод",
      name: "Төв аймаг - Зуунмод",
      address: "Төв аймаг, Зуунмод сум, 5-р баг, Нацагдорж чандмань гудамж, 201 тоот (Стадионы зүүн талд зам дагуу)",
      district: "Орон нутаг",
      lat: 47.8937,
      lng: 106.9229,
      hours: "08:00-24:00",
      phone: "+976 8520 2211",
      facebook: "https://www.facebook.com/profile.php?id=61574842010456",
             image: "/images/Branches/Зуунмод.jpg"
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
