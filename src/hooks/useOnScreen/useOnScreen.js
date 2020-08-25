import { useState,  useEffect } from 'react';

const useOnScreen = (ref, rootMargin = '0px', once = false) => {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const current = ref.current;
      const observer = new IntersectionObserver(
        ([entry], obs) => {
          // Update our state when observer callback fires
          setIntersecting(entry.isIntersecting);
          if(once){
            if(entry.isIntersecting > 0){
              obs.unobserve(current);
            }
          }
        },
        {
          rootMargin
        }
      );
      if (current) {
        observer.observe(current);
      }
      return () => {
        observer.unobserve(current);
      };
    }, [once, ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  
    return isIntersecting;
};

export default useOnScreen;