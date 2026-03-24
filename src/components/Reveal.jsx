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
          // Tarayıcının önce başlangıç halini (gizli) çizmesini bekleyip 
          // sonra animasyonu başlatıyoruz → süzülme garantili!
          requestAnimationFrame(() => {
            entry.target.classList.add('active');
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observerMap.set(threshold, observer);
  return observer;
};

const Reveal = ({ children, threshold = 0.1, delay = 0, className = '', initialActive = false }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (initialActive) return; // Zaten aktifse observer'a gerek yok
    
    const el = elementRef.current;
    if (!el) return;

    const observer = getSharedObserver(threshold);
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [threshold, initialActive]);

  return (
    <div
      ref={elementRef}
      className={`reveal ${className} ${initialActive ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
