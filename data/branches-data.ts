// Branch data shared across components — single source of truth.
// Edit branches here; Branches.tsx, Hero.tsx and PricingTable.tsx all read from this file.

// Displayed branch count for marketing overlays (hero banner + pricing posters).
// TODO: replace with `branches.length` once the missing branches are added to the data array below.
export const DISPLAYED_BRANCH_COUNT = 47;

export interface Branch {
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
  mapsUrl?: string;
  image: string;
  comingSoon?: boolean;
}

// Branch names mapped to their province IDs
export const branchToProvince: Record<string, string> = {
  // Dornod province
  'Дорнод аймаг': 'MN061',
  // Orkhon province (Erdenet)
  'Эрдэнэт салбар': 'MN035',
  'Эрдэнэт - Гранд Гарден': 'MN035',
  // Khövsgöl province
  'Хөвсгөл аймаг - Мөрөн салбар': 'MN041',
  'Хөвсгөл аймаг - Номин салбар': 'MN041',
  // Uvs province
  'Увс аймаг': 'MN046',
  // Töv province (Zuunmod)
  'Төв аймаг - Зуунмод': 'MN047',
  // Dornogovi province (Sainshand)
  'Дорноговь - Сайншанд': 'MN063',
  // Ömnögovi province
  'Өмнөговь аймаг': 'MN053',
  // Övörkhangai province (Arvaikheer)
  'Өвөрхангай - Арвайхээр': 'MN055',
  // Darkhan-Uul province
  'Дархан Найрамдал Master State': 'MN037',
  'Дархан Том&Томс салбар': 'MN037',
  // Arkhangai province
  'Архангай салбар': 'MN073',
  // Bayankhongor province
  'Баянхонгор салбар': 'MN067',
};

// Branch data with real information from LaundryZone Mongolia website
export const branches: Branch[] = [
  {
    id: "Дүнжингарав",
    name: "Дүнжингарав",
    address: "Баянзүрх дүүрэг, 26-р хороо, Санни Таун хотхон, 1-р давхарт, Улаанбаатар хот, Монгол улс",
    district: "Баянзүрх",
    lat: 47.9041,
    lng: 106.9393,
    hours: "08:00-24:00",
    phone: "+976 9500 7443",
    email: "laundryzone.info@gmail.com",
    facebook: "https://www.facebook.com/laundryzone.mongolia/",
    mapsUrl: "https://maps.app.goo.gl/p9jwFNGR3kasCx9L8",
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
    mapsUrl: "https://maps.app.goo.gl/xDH9S1sNKYBUUWP1A",
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
    mapsUrl: "https://maps.app.goo.gl/gwkDBzLq6HoXL2za9",
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
    mapsUrl: "https://maps.app.goo.gl/g2YbMyShsBu6BbZZ8",
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
    mapsUrl: "https://maps.app.goo.gl/t2o1BiiJBabU5GZ79",
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
    mapsUrl: "https://maps.app.goo.gl/AaaHkf5HwbBDsnVQ6",
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
    mapsUrl: "https://maps.app.goo.gl/Do1rtmG6PQhpfsFb7",
           image: "/images/Branches/Өмнөговь.png"
  },
  {
    id: "1-р Хороолол",
    name: "1-р Хороолол",
    mapsUrl: "https://maps.app.goo.gl/K81JRKBKhc9MmTgz9",
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
    mapsUrl: "https://maps.app.goo.gl/HinpZqUTM8wRiQKd9",
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
    mapsUrl: "https://maps.app.goo.gl/jyps4NWYbMNTk2eh7",
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
    mapsUrl: "https://maps.app.goo.gl/4bJrsx5uYeLG3j2m9",
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
    mapsUrl: "https://maps.app.goo.gl/1NFt8GmCJU4xqAGd8",
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
      mapsUrl: "https://maps.app.goo.gl/ZncMNKW2Xpxcokiw8",
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
      mapsUrl: "https://maps.app.goo.gl/Hpyjo2RAnuGsc4q17",
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
      mapsUrl: "https://maps.app.goo.gl/HAH4JvPUfJgC3utj8",
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
      mapsUrl: "https://maps.app.goo.gl/7wzXXKUVbVLUUJro8",
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
      mapsUrl: "https://maps.app.goo.gl/sLoJ6N3e8iGu6yWU7",
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
      mapsUrl: "https://maps.app.goo.gl/yEdvRdaDBKHmZqVN6",
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
      mapsUrl: "https://maps.app.goo.gl/hCnjp2Nt51bc9HiP8",
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
      mapsUrl: "https://maps.app.goo.gl/YRtVzQNFMgPvzM8w6",
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
      mapsUrl: "https://maps.app.goo.gl/n2rir9mFQ6Lfk97XA",
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
      mapsUrl: "https://maps.app.goo.gl/7bQzQDJ9W69mJWSf7",
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
      mapsUrl: "https://maps.app.goo.gl/wMM7uCr7VQPtNnuTA",
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
      mapsUrl: "https://maps.app.goo.gl/1Afacppe95n1cQZDA",
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
      facebook: "https://www.facebook.com/laundryzone.chingeltei/",
      mapsUrl: "https://www.facebook.com/laundryzone.chingeltei/",
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
      facebook: "https://www.facebook.com/profile.php?id=61557198998129",
      mapsUrl: "https://maps.app.goo.gl/gdohmTGeBHc4nzfx5",
             image: "/images/Branches/Хөвсгөл-Номин.jpg"
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
      mapsUrl: "https://maps.app.goo.gl/ZPDdztk69FanibU27",
              image: "/images/Branches/Нисэх.png"
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
     mapsUrl: "https://maps.app.goo.gl/NjciBJvrf3VMSKBm9",
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
    mapsUrl: "https://maps.app.goo.gl/ypq81tsSvY9Hnv7S9",
           image: "/images/Branches/Бичил.jpg"
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
     mapsUrl: "https://maps.app.goo.gl/tLw4HSjk6q6aAcWHA",
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
     mapsUrl: "https://maps.app.goo.gl/jwS5ihBdMBNPwJUD6",
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
     mapsUrl: "https://maps.app.goo.gl/WVFoPw6tMGJjedLy5",
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
    mapsUrl: "https://maps.app.goo.gl/ewUH9LJdbeXyqcX96",
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
    mapsUrl: "https://maps.app.goo.gl/z5FH3qgbLiEoYFmU7",
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
    phone2: "+976 8815 6945",
    facebook: "https://www.facebook.com/profile.php?id=61574842010456",
    mapsUrl: "https://maps.app.goo.gl/kEEnnUfoBUkdRB5QA",
           image: "/images/Branches/Зуунмод.jpg"
  },
  {
    id: "Яармаг-Мандала хотхон",
    name: "Яармаг-Мандала хотхон",
    address: "Хан-Уул дүүрэг, 23-р хороо, Мандала гарден хотхон, 1475-р байр, 1 давхарт, Улаанбаатар хот, Монгол улс",
    district: "Хан-Уул",
    lat: 47.8654,
    lng: 106.8342,
    hours: "08:00-24:00",
    phone: "+976 9101 0226",
    phone2: "+976 7708 7709",
    facebook: "https://www.facebook.com/profile.php?id=61584498733899",
    mapsUrl: "https://maps.app.goo.gl/s5Ha4F14mQZff4kA7",
    image: "/images/Branches/Яармаг-Мандала.png"
  },
  {
    id: "Эрдэнэт - Гранд Гарден",
    name: "Эрдэнэт - Гранд Гарден",
    address: "Орхон аймаг, Баян-Өндөр сум, 2-р баг, Гранд Гарден ресиденс, 10-3 байр, Ү-3 тоот",
    district: "Орон нутаг",
    lat: 49.0316,
    lng: 104.0712,
    hours: "08:00-24:00",
    phone: "+976 7708 7709",
    facebook: "https://www.facebook.com/people/LaundryZone-Эрдэнэт-хот-Grand-Garden-салбар/61584512854633/",
    mapsUrl: "https://maps.app.goo.gl/Lj695GQAYf8ZTjN9A",
    image: "/images/Branches/Эрдэнэт-Гранд-Гарден.png"
  },
  {
    id: "Улиастай - БЗД",
    name: "Улиастай - БЗД",
    address: "Баянзүрх дүүрэг, 23-р хороо, 3-р хэсэг, сургуулийн 1296 тоот, Улиастайн хуучин эцэс, Улаанбаатар хот, Монгол улс",
    district: "Баянзүрх",
    lat: 47.9129,
    lng: 107.0367,
    hours: "08:00-24:00",
    phone: "+976 8815 6945",
    phone2: "+976 8520 2211",
    facebook: "https://www.facebook.com/laundryzone.mongolia",
    mapsUrl: "https://maps.app.goo.gl/RWqpPV8qovME389h9",
    image: "/images/Branches/Улиастай-БЗД.png"
  },
  {
    id: "Өвөрхангай - Арвайхээр",
    name: "Өвөрхангай - Арвайхээр",
    address: "Өвөрхангай аймаг, Арвайхээр, Ноён-3 гудамж, 303 тоот (11-ийн шар дэлгүүр буюу \"Батдаваа\" хүнсний дэлгүүрийн замын эсрэг талд)",
    district: "Орон нутаг",
    lat: 46.2603,
    lng: 102.7012,
    hours: "08:00-24:00",
    phone: "+976 9950 2325",
    phone2: "+976 9408 7440",
    facebook: "https://www.facebook.com/profile.php?id=61578460486564",
    mapsUrl: "https://maps.app.goo.gl/1iwGhGbtaKvaqAar8",
    image: "/images/Branches/Өвөрхангай-Арвайхээр.png"
  },
  {
    id: "Гачуурт",
    name: "Гачуурт",
    address: "Гачууртын Цагаан дэлгүүрийн уулзвараас урагшаа 300м байрлах \"ТА ЧИ\" төвд, Улаанбаатар хот, Монгол улс",
    district: "Баянзүрх",
    lat: 47.9300,
    lng: 107.2000,
    hours: "08:00-24:00",
    phone: "+976 8818 1646",
    mapsUrl: "https://maps.app.goo.gl/hUipRVxpn9W9kEJ59",
    image: "/images/Branches/Гачуурт.png"
  },
  // Coming Soon Branches
  {
    id: "Дархан Найрамдал Master State",
    name: "Дархан Найрамдал Master State",
    address: "Дархан-Уул аймгийн Найрамдал Master State хотхоны A8-р блок",
    district: "Орон нутаг",
    lat: 49.4867,
    lng: 105.9228,
    hours: "08:00-24:00",
    phone: "+976 9408 7441",
    image: "/images/Branches/Дархан.png"
  },
  {
    id: "Архангай салбар",
    name: "Архангай салбар",
    address: "Тун удахгүй нээгдэнэ",
    district: "Орон нутаг",
    lat: 47.4500,
    lng: 101.4500,
    hours: "08:00-24:00",
    phone: "+976 9408 7442",
    image: "/images/placeholder_image.png",
    comingSoon: true
  },
  {
    id: "Дархан Том&Томс салбар",
    name: "Дархан Том&Томс салбар",
    address: "Дархан-Уул аймгийн Оргил супермаркетийн хажууд, Буудай хотхонд",
    district: "Орон нутаг",
    lat: 49.4867,
    lng: 105.9228,
    hours: "08:00-24:00",
    phone: "+976 9939 8126",
    image: "/images/Branches/Дархан-Том&Томс.png"
  },
  {
    id: "Баянхонгор салбар",
    name: "Баянхонгор салбар",
    address: "Тун удахгүй нээгдэнэ",
    district: "Орон нутаг",
    lat: 46.1944,
    lng: 100.7211,
    hours: "08:00-24:00",
    phone: "",
    image: "/images/placeholder_image.png",
    comingSoon: true
  }
];
