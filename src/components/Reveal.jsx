import { useEffect, useRef } from 'react';

// Threshold değeri başına tek bir paylaşılan observer.
// Tüm Reveal instanceları bu map'ten observer alır,
// yeni instance oluşturmaz → ~20x daha az bellek kullanımı.
const observerMap = new Map();

const getSharedObserver = (threshold) => {
  if (observerMap.has(threshold)) return observerMap.get(threshold);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Animasyon bir kez tetiklendi, artık izlemeye gerek yok
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observerMap.set(threshold, observer);
  return observer;
};

const Reveal = ({ children, threshold = 0.1, delay = 0, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = getSharedObserver(threshold);
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
