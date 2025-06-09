// lib/csrf.ts

import Cookies from 'js-cookie';

// From cookie (preferred if server sets it this way)
export const getCsrfToken = () => {
  return Cookies.get('XSRF-TOKEN') || '';
};

// OR from <meta name="csrf-token" content="..."> if injected in HTML
export const getCsrfTokenFromMeta = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : '';
};
