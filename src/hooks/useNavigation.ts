import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/');
    const page = segments[segments.length - 1] || 'index';
    setCurrentPage(page);
  }, [location]);

  const isActive = (href: string): boolean => {
    const hrefName = href.split('/').pop() || '';
    return currentPage === hrefName || hrefName === currentPage;
  };

  return { isActive };
};
