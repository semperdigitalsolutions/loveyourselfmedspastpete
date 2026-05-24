// Optional hooks for conversion tracking / form handling.
// Example: fire Google Ads conversion when user clicks Book button.
document.querySelectorAll('a[href*="loveyourselfmedspastpete.com"], a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    // Replace with your gtag conversion event after Google Ads conversion action is configured.
    // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYY'});
  });
});
