import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Hammer,
  Users,
  Package,
  Wrench,
  Ruler,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  details?: string[];
  image?: string;
}

const iconMap = {
  construction: Hammer,
  consultancy: Users,
  material: Package,
  renovation: Wrench,
  design: Ruler,
  management: ClipboardList,
};

const imageMap: { [key: string]: string } = {
  construction: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
  consultancy: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  material: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
  renovation: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
  design: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
  management: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export default function ServiceCard({ title, icon, description, details = [], image }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Hammer;
  const serviceImage = image || imageMap[icon as keyof typeof imageMap] || imageMap.construction;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={serviceImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="p-3 bg-secondary rounded-lg mr-3">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-6">
      
        <p className="text-gray-700 mb-4 leading-relaxed">
          {description}
        </p>

        <AnimatePresence>
          {isExpanded && details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-primary font-semibold mb-2">Service Details:</h4>
                <ul className="space-y-2">
                  {details.map((detail, index) => (
                    <li key={index} className="text-gray-700 flex items-start text-sm">
                      <ArrowRight className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 flex-wrap">
          {details.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300"
            >
              <span className="mr-2 text-sm">
                {isExpanded ? 'Show Less' : 'View Details'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}

          <Link
            to="/contact"
            className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all duration-300 font-medium"
          >
            <span className="mr-2 text-sm">Get Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}