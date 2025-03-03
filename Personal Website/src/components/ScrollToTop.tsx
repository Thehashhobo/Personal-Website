import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll the <body> element to the top
    document.body.scrollTop = 0;

    // Optionally also scroll <html>, for compatibility
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
