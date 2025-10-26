import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <Slider {...sliderSettings}>
                  {project.images.map((image, index) => (
                    <div key={index} className="outline-none">
                      <div className="relative h-96 rounded-xl overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <MapPin size={20} className="text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <Calendar size={20} className="text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="font-semibold text-gray-900">{project.completionYear}</p>
                  </div>
                </div>

                {project.duration && (
                  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                    <Clock size={20} className="text-secondary mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{project.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-3">Project Overview</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-secondary mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Next slide"
    >
      <ChevronRight size={24} className="text-gray-800" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} className="text-gray-800" />
    </button>
  );
};

export default ProjectModal;
