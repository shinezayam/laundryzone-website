'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Droplets, 
  Wind, 
  Gauge,
  Timer,
  Thermometer,
  Settings,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface EquipmentSpecs {
  capacity: string;
  cycles: string[];
  duration: string;
  powerRating: string;
  gasConsumption?: string;
  weight?: string;
  features: string[];
  dimensions: string;
  model: string;
}

interface EquipmentItem {
  id: string;
  type: 'washer' | 'dryer';
  brand: string;
  model: string;
  image: string;
  specs: EquipmentSpecs;
}

export function Equipment() {
  const t = useTranslations('equipment');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const washers: EquipmentItem[] = [
    {
      id: 'lg-washer-18',
      type: 'washer',
      brand: 'LG',
      model: 'LR-18 TP2',
      image: '/images/washers/세탁기 LR-18 TP2.png',
      specs: {
        capacity: '18kg',
        cycles: ['Cotton', 'Quick Wash', 'Heavy Duty', 'Delicates', 'Eco'],
        duration: '30-45 min',
        powerRating: '2.2kW',
        features: ['TurboWash', 'Steam Technology', 'SmartThinQ'],
        dimensions: '65 × 68 × 95 cm',
        model: 'LR-18 TP2'
      }
    },
    {
      id: 'lg-washer-25',
      type: 'washer',
      brand: 'LG',
      model: 'LR-25 TP2',
      image: '/images/washers/세탁기 LR-25 TP2.png',
      specs: {
        capacity: '25kg',
        cycles: ['Cotton', 'Quick Wash', 'Mixed Fabrics', 'Heavy Duty'],
        duration: '28-40 min',
        powerRating: '3.0kW',
        features: ['6 Motion DD', 'Steam+', 'TurboWash'],
        dimensions: '70 × 72 × 100 cm',
        model: 'LR-25 TP2'
      }
    },
    {
      id: 'lg-washer-45',
      type: 'washer',
      brand: 'LG',
      model: 'LW-45N',
      image: '/images/washers/세탁기 LW-45N.png',
      specs: {
        capacity: '45kg',
        cycles: ['Cotton', 'Quick Wash', 'Heavy Duty', 'Delicates', 'Eco'],
        duration: '30-45 min',
        powerRating: '4.0kW',
        features: ['TurboWash', 'Steam Technology', 'SmartThinQ'],
        dimensions: '75 × 80 × 115 cm',
        model: 'LW-45N'
      }
    },
    {
      id: 'lg-washer-70',
      type: 'washer',
      brand: 'LG',
      model: 'LW-70N',
      image: '/images/washers/세탁기 LW-70N.png',
      specs: {
        capacity: '70kg',
        cycles: ['Cotton', 'Quick Wash', 'Mixed Fabrics', 'Heavy Duty'],
        duration: '35-50 min',
        powerRating: '5.0kW',
        features: ['6 Motion DD', 'Steam+', 'TurboWash'],
        dimensions: '80 × 85 × 120 cm',
        model: 'LW-70N'
      }
    },
    {
      id: 'samsung-washer-40',
      type: 'washer',
      brand: 'Samsung',
      model: 'SCK040',
      image: '/images/washers/세탁기 SCK040.png',
      specs: {
        capacity: '40kg',
        cycles: ['Super Speed', 'Normal', 'Heavy Duty', 'Bedding'],
        duration: '25-38 min',
        powerRating: '3.5kW',
        features: ['Super Speed', 'Steam Wash', 'Self Clean+'],
        dimensions: '70 × 75 × 110 cm',
        model: 'SCK040'
      }
    },
    {
      id: 'samsung-washer-60',
      type: 'washer',
      brand: 'Samsung',
      model: 'SCK060',
      image: '/images/washers/세탁기 SCK060.png',
      specs: {
        capacity: '60kg',
        cycles: ['Super Speed', 'Normal', 'Heavy Duty', 'Sanitize'],
        duration: '30-45 min',
        powerRating: '4.5kW',
        features: ['VRT Plus', 'Steam Wash', 'Self Clean+'],
        dimensions: '75 × 80 × 115 cm',
        model: 'SCK060'
      }
    },
    {
      id: 'samsung-washer-80',
      type: 'washer',
      brand: 'Samsung',
      model: 'SCK080',
      image: '/images/washers/세탁기 SCK080.png',
      specs: {
        capacity: '80kg',
        cycles: ['Super Speed', 'Normal', 'Heavy Duty', 'Bedding', 'Sanitize'],
        duration: '35-50 min',
        powerRating: '5.5kW',
        features: ['VRT Plus', 'Steam Technology', 'Self Clean+'],
        dimensions: '80 × 85 × 120 cm',
        model: 'SCK080'
      }
    },
    {
      id: 'samsung-washer-100',
      type: 'washer',
      brand: 'Samsung',
      model: 'SCK100',
      image: '/images/washers/세탁기 SCK100.png',
      specs: {
        capacity: '100kg',
        cycles: ['Super Speed', 'Normal', 'Heavy Duty', 'Bedding', 'Sanitize'],
        duration: '40-60 min',
        powerRating: '6.0kW',
        features: ['VRT Plus', 'Steam Technology', 'Self Clean+'],
        dimensions: '85 × 90 × 130 cm',
        model: 'SCK100'
      }
    },
    {
      id: 'ctn-washer-50',
      type: 'washer',
      brand: 'CTN',
      model: 'CTN-50',
      image: '/images/CTN-50 전기.png',
      specs: {
        capacity: '50kg',
        cycles: ['Cotton', 'Heavy Duty', 'Quick Wash', 'Sanitize'],
        duration: '35-50 min',
        powerRating: '4.8kW',
        features: ['Electric Powered', 'Industrial Grade', 'Energy Efficient'],
        dimensions: '80 × 90 × 125 cm',
        model: 'CTN-50'
      }
    }
  ];

  const dryers: EquipmentItem[] = [
    {
      id: 'samsung-dryer-35',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SK035',
      image: '/images/dryers/SK035 E-전 N-가스.png',
      specs: {
        capacity: '35kg',
        cycles: ['Normal', 'Heavy Duty', 'Delicates', 'Quick Dry'],
        duration: '35-50 min',
        powerRating: '4.0kW',
        features: ['Electric/Gas Options', 'Moisture Sensor', 'Wrinkle Care'],
        dimensions: '70 × 75 × 105 cm',
        model: 'SK035'
      }
    },
    {
      id: 'samsung-dryer-50',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SK050',
      image: '/images/dryers/SK050 E-전기 N-가스.png',
      specs: {
        capacity: '50kg',
        cycles: ['Cotton', 'Mixed Fabrics', 'Time Dry', 'Air Dry'],
        duration: '40-60 min',
        powerRating: '5.5kW',
        features: ['Electric/Gas Options', 'Sensor Dry', 'Anti-Wrinkle'],
        dimensions: '75 × 80 × 115 cm',
        model: 'SK050'
      }
    },
    {
      id: 'samsung-dryer-75',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SK075',
      image: '/images/dryers/SK075 E-전기 N-가스.png',
      specs: {
        capacity: '75kg',
        cycles: ['Normal', 'Heavy Duty', 'Quick Dry', 'Delicate'],
        duration: '45-65 min',
        powerRating: '6.5kW',
        features: ['Electric/Gas Options', 'Advanced Sensor', 'Commercial'],
        dimensions: '80 × 85 × 125 cm',
        model: 'SK075'
      }
    },
    {
      id: 'samsung-dryer-120',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SK120',
      image: '/images/dryers/SK120 E-전기 N-가스.png',
      specs: {
        capacity: '120kg',
        cycles: ['Normal', 'Heavy Duty', 'Quick Dry', 'Industrial'],
        duration: '50-80 min',
        powerRating: '8.0kW',
        features: ['Electric/Gas Options', 'Heavy Duty', 'Commercial Grade'],
        dimensions: '90 × 95 × 140 cm',
        model: 'SK120'
      }
    },
    {
      id: 'samsung-dryer-skt30n',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SKT30N',
      image: '/images/dryers/SKT30N 가스.png',
      specs: {
        capacity: '30kg',
        cycles: ['Normal', 'Quick Dry', 'Gentle', 'Air Fluff'],
        duration: '30-45 min',
        powerRating: '3.8kW',
        features: ['Gas Powered', 'Energy Efficient', 'Compact Design'],
        dimensions: '65 × 70 × 100 cm',
        model: 'SKT30N'
      }
    },
    {
      id: 'samsung-dryer-skt45n',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SKT45N',
      image: '/images/dryers/SKT45N 가스.png',
      specs: {
        capacity: '45kg',
        cycles: ['Normal', 'Heavy Duty', 'Quick Dry', 'Air Dry'],
        duration: '35-55 min',
        powerRating: '4.5kW',
        features: ['Gas Powered', 'High Efficiency', 'Durable Build'],
        dimensions: '70 × 75 × 110 cm',
        model: 'SKT45N'
      }
    },
    {
      id: 'lg-dryer-wh230',
      type: 'dryer',
      brand: 'LG',
      model: 'WH-230GN/GP',
      image: '/images/dryers/WH-230GN - LNG  WH-230GP - LPG.png',
      specs: {
        capacity: '230kg',
        cycles: ['Industrial', 'Heavy Duty', 'Normal', 'Quick Dry'],
        duration: '60-90 min',
        powerRating: '12.0kW',
        features: ['LNG/LPG Options', 'Industrial Grade', 'High Capacity'],
        dimensions: '120 × 110 × 160 cm',
        model: 'WH-230GN/GP'
      }
    },
    {
      id: 'samsung-dryer-skt60n',
      type: 'dryer',
      brand: 'Samsung',
      model: 'SKT60N',
      image: '/images/dryers/SKT45N 가스.png',
      specs: {
        capacity: '60kg',
        cycles: ['Normal', 'Heavy Duty', 'Quick Dry', 'Commercial'],
        duration: '40-65 min',
        powerRating: '5.5kW',
        gasConsumption: '28kW',
        features: ['Gas Powered', 'Commercial Grade', 'High Capacity'],
        dimensions: '75 × 80 × 115 cm',
        model: 'SKT60N'
      }
    },
    {
      id: 'lg-dryer-wh180',
      type: 'dryer',
      brand: 'LG',
      model: 'WH-180GP',
      image: '/images/dryers/WH-230GN - LNG  WH-230GP - LPG.png',
      specs: {
        capacity: '180kg',
        cycles: ['Industrial', 'Heavy Duty', 'Normal', 'Express'],
        duration: '55-85 min',
        powerRating: '10.5kW',
        gasConsumption: '45kW',
        weight: '380kg',
        features: ['LPG Powered', 'Industrial Grade', 'Heavy Duty'],
        dimensions: '110 × 100 × 150 cm',
        model: 'WH-180GP'
      }
    }
  ];

  const EquipmentCard = ({ item }: { item: EquipmentItem }) => {
    const isHovered = hoveredItem === item.id;

    return (
      <motion.div
        className="relative"
        onHoverStart={() => setHoveredItem(item.id)}
        onHoverEnd={() => setHoveredItem(null)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 h-full min-h-[500px] flex flex-col ${
          isHovered ? 'shadow-2xl border-accent-200' : 'shadow-soft border-neutral-200'
        }`}>
          {/* Equipment Image - Square Frame */}
          <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#E5E5E5' }}>
            <Image
              src={item.image}
              alt={`${item.brand} ${item.type === 'washer' ? t('types.washer') : t('types.dryer')} ${item.model}`}
              fill
              className="object-contain object-center p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                // Fallback to a placeholder or existing image
                (e.target as HTMLImageElement).src = '/images/laundryzone-hero.jpg';
              }}
            />
            {/* Brand Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
              item.brand === 'LG' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {item.brand}
            </div>
          </div>

          {/* Basic Info */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  {item.brand} {item.type === 'washer' ? t('types.washer') : t('types.dryer')}
                </h3>
                <p className="text-sm text-neutral-600 font-mono">{item.model}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent-500">{item.specs.capacity}</p>
                <p className="text-sm text-neutral-600">{t('specs.capacity')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Timer size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-700">{item.specs.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-700">{item.specs.powerRating}</span>
              </div>
            </div>

            {/* Hover Details */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? 'auto' : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-neutral-200 pt-4 mt-4">
                {/* Cycles */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-900 mb-2">{t('specs.cycles')}:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.specs.cycles.map((cycle, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                      >
                        {cycle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-900 mb-2">{t('specs.features')}:</p>
                  <div className="space-y-1">
                    {item.specs.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-neutral-700">
                        <Star size={12} className="text-accent-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="text-xs text-neutral-600">
                  <span className="font-medium">{t('specs.dimensions')}:</span> {item.specs.dimensions}
                </div>
              </div>
            </motion.div>

            {/* Always visible CTA */}
            <motion.div 
              className="mt-auto pt-4"
              animate={{ opacity: isHovered ? 0.7 : 1 }}
            >
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>{t('hover_details')}</span>
                <ChevronRight size={16} className="text-accent-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        {/* Washers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mr-4">
              <Droplets size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">{t('categories.washers')}</h2>
              <p className="text-neutral-600">{t('categories.washers_desc')}</p>
            </div>
          </div>

          <div className="w-full" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '2rem',
            gridAutoRows: '1fr'
          }}>
            {washers.slice(0, 9).map((washer) => (
              <EquipmentCard key={washer.id} item={washer} />
            ))}
          </div>
        </motion.div>

        {/* Dryers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mr-4">
              <Wind size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">{t('categories.dryers')}</h2>
              <p className="text-neutral-600">{t('categories.dryers_desc')}</p>
            </div>
          </div>

          <div className="w-full" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '2rem',
            gridAutoRows: '1fr'
          }}>
            {dryers.slice(0, 9).map((dryer) => (
              <EquipmentCard key={dryer.id} item={dryer} />
            ))}
          </div>
        </motion.div>

        {/* Equipment Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-200">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-100 text-brand-600 mb-4">
                  <Settings size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('stats.machines.count')}
                </h3>
                <p className="text-neutral-600">
                  {t('stats.machines.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent-100 text-accent-600 mb-4">
                  <Thermometer size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('stats.temperature.range')}
                </h3>
                <p className="text-neutral-600">
                  {t('stats.temperature.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-100 text-green-600 mb-4">
                  <Gauge size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('stats.capacity.max')}
                </h3>
                <p className="text-neutral-600">
                  {t('stats.capacity.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-100 text-purple-600 mb-4">
                  <Star size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {t('stats.efficiency.rating')}
                </h3>
                <p className="text-neutral-600">
                  {t('stats.efficiency.description')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}