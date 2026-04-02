// Site-wide configuration
// Update these values with actual business information

export const siteConfig = {
  name: 'Love Yourself Med Spa',
  shortName: 'LYMS', // Short version for tight spaces
  tagline:
    'A luxury physician-guided med spa devoted to holistic beauty, natural renewal, and total transformation.',
  description:
    'Luxury med spa in Tierra Verde, FL — advanced medically guided treatments for body contouring, skin rejuvenation, and total wellness transformation.',
  logo: '/images/general/logo.png',

  // Contact Information
  address: {
    street: '1120 Pinellas Bayway S.',
    suite: 'Suite 208',
    city: 'Tierra Verde',
    state: 'FL',
    zip: '33715',
  },
  phone: '(727) 739-5070',
  email: 'shari@loveyourselfmedspastpete.com',

  // Social Media
  social: {
    instagram: '',
    facebook: '',
  },

  // Booking — Mangomint overlay integration (CompanyId 912584)
  booking: {
    url: 'https://booking.mangomint.com/912584',
  },

  // Business Hours
  hours: {
    weekdays: '9:00 AM - 9:00 PM',
    saturday: '9:00 AM - 7:00 PM',
    sunday: 'By Appointment',
  },
};

// Author profiles for blog posts
export const authors: Record<
  string,
  { name: string; role: string; bio: string; avatar: string }
> = {
  shari: {
    name: 'Shari Irwin',
    role: 'Owner & CEO',
    bio: 'With over 15 aesthetic certifications and a foundation in nursing, Shari brings together faith-driven purpose and a passion for transformation to help others achieve beauty, health, and vitality from the inside out.',
    avatar: '/images/providers/shari_headshot.png',
  },
};

// Navigation links
export const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
];

// Footer links
export const footerLinks = {
  explore: [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
