export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'residential' | 'commercial' | 'industrial' | 'healthcare' | 'infrastructure';
  description: string;
  completionYear: string;
  duration?: string;
  images: string[];
  features?: string[];
}

export const projects: Project[] = [
  {
    id: 'royal-palace-kapindipanga',
    title: 'Royal Palace - Kapindipanga',
    location: 'Solwezi, North-Western Province',
    category: 'residential',
    description: 'Construction of a modern royal palace for the area chief in Kapindipanga, Solwezi. This prestigious project combines traditional architectural elements with modern construction techniques and amenities, creating a dignified residence befitting the cultural significance of the chiefdom.',
    completionYear: '2022',
    duration: '18 months',
    images: [
      '/projects/royal-palace-kapindipanga-1.jpg',
      '/projects/royal-palace-kapindipanga-2.jpg',
      '/projects/royal-palace-kapindipanga-3.jpg',
      '/projects/royal-palace-kapindipanga-4.jpg',
    ],
    features: [
      'Traditional architectural design with modern amenities',
      'Ceremonial halls and meeting spaces',
      'Modern plumbing and electrical systems',
      'Security features and compound development',
      'Landscaping and outdoor facilities',
    ],
  },
  {
    id: 'royal-palace-kizela',
    title: 'Royal Palace - Kizela',
    location: 'Mufumbwe, North-Western Province',
    category: 'residential',
    description: 'Construction of a royal palace for the chiefdom in Kizela, Mufumbwe. This project showcases our expertise in blending cultural heritage with contemporary construction standards, providing a functional and prestigious residence for traditional leadership.',
    completionYear: '2023',
    duration: '16 months',
    images: [
      '/projects/royal-palace-kizela-1.jpg',
      '/projects/royal-palace-kizela-2.jpg',
      '/projects/royal-palace-kizela-3.jpg',
      '/projects/royal-palace-kizela-4.jpg',
    ],
    features: [
      'Culturally appropriate design and layout',
      'High-quality construction materials',
      'Modern infrastructure integration',
      'Compound and perimeter security',
      'Water and power supply systems',
    ],
  },
  {
    id: 'clinic-chadiza',
    title: 'Rural Health Clinic',
    location: 'Chadiza, Eastern Province',
    category: 'healthcare',
    description: 'Construction of a fully equipped rural health clinic in Chadiza to support local healthcare delivery. This vital infrastructure project provides essential medical services to the community, featuring examination rooms, a maternity ward, pharmacy, and laboratory facilities.',
    completionYear: '2023',
    duration: '12 months',
    images: [
      '/projects/clinic-chadiza-1.jpg',
      '/projects/clinic-chadiza-2.jpg',
      '/projects/clinic-chadiza-3.jpg',
      '/projects/clinic-chadiza-4.jpg',
    ],
    features: [
      'Examination and consultation rooms',
      'Maternity and delivery ward',
      'Pharmacy and medicine storage',
      'Laboratory and diagnostic facilities',
      'Staff quarters and administrative offices',
      'Emergency power backup systems',
    ],
  },
  {
    id: 'infrastructure-mpika-1',
    title: 'Infrastructure Development - Mpika',
    location: 'Mpika, Muchinga Province',
    category: 'infrastructure',
    description: 'Comprehensive building and maintenance works in the Mpika area, including construction of community facilities, road improvements, and structural renovations. Our team delivered quality infrastructure solutions that enhance community development and economic activities.',
    completionYear: '2022-2023',
    duration: 'Ongoing projects',
    images: [
      '/projects/mpika-infrastructure-1.jpg',
      '/projects/mpika-infrastructure-2.jpg',
      '/projects/mpika-infrastructure-3.jpg',
      '/projects/mpika-infrastructure-4.jpg',
    ],
    features: [
      'Road construction and rehabilitation',
      'Community building projects',
      'Structural maintenance and repairs',
      'Water and drainage systems',
      'General construction services',
    ],
  },
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
