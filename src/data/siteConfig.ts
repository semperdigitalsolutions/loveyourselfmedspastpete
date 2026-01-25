// Site-wide configuration
// Update these values with actual business information

export const siteConfig = {
  name: 'Total Transformation',
  tagline: 'A sanctuary for faith-led wellness and clinical anti-aging excellence.',
  description: 'Holistic medical spa combining clinical excellence with spiritual wellness in North Carolina.',
  
  // Contact Information (UPDATE WITH REAL INFO)
  address: {
    street: '123 Wellness Way',
    suite: 'Suite 100',
    city: 'City',
    state: 'NC',
    zip: '12345',
  },
  phone: '(555) 012-3456',
  email: 'hello@totaltransformation.com',
  
  // Social Media
  social: {
    instagram: 'https://instagram.com/totaltransformation',
    facebook: 'https://facebook.com/totaltransformation',
  },
  
  // Booking (Mangomint - UPDATE WHEN READY)
  booking: {
    url: '#', // Replace with Mangomint booking URL
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
