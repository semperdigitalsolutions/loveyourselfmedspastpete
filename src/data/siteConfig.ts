// Site-wide configuration
// Update these values with actual business information

export const siteConfig = {
  name: 'Love Yourself Enough To Transform',
  shortName: 'LYETT', // Short version for tight spaces
  tagline: 'A luxury physician-guided med spa devoted to holistic beauty, natural renewal, and total transformation.',
  description: 'Luxury med spa in Tierra Verde, FL — advanced medically guided treatments for body contouring, skin rejuvenation, and total wellness transformation.',

  // Contact Information
  address: {
    street: '1120 Pinellas Bayway S.',
    suite: 'Suite 208',
    city: 'Tierra Verde',
    state: 'FL',
    zip: '33715',
  },
  phone: '(555) 012-3456',
  email: 'info@loveyourselfenoughspa.com',

  // Social Media
  social: {
    instagram: 'https://instagram.com/loveyourselfenoughspa',
    facebook: 'https://facebook.com/loveyourselfenoughspa',
  },

  // Booking (UPDATE WHEN READY)
  booking: {
    url: '#', // Replace with booking URL
  },

  // Business Hours
  hours: {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed',
  },
};

// Navigation links
export const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

// Footer links
export const footerLinks = {
  explore: [
    { label: 'Our Story', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
