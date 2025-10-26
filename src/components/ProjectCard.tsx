import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  images: string[];
  completionYear: string;
  description?: string;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  location,
  category,
  images,
  completionYear,
  description,
  onViewDetails
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800';

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onViewDetails}
    >
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={imageError ? fallbackImage : images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            onError={handleImageError}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">
          {title}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-2 text-secondary" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Calendar size={16} className="mr-2 text-secondary" />
          <span>Completed: {completionYear}</span>
        </div>

        {description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="text-secondary font-semibold inline-flex items-center group/btn hover:text-secondary-dark transition-colors"
          whileHover={{ x: 5 }}
        >
          View Details
          <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
