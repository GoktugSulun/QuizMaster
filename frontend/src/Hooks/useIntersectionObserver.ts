import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverProps {
  options?: IntersectionObserverOptions;
  dependencies?: any[];
  triggerOnce?: boolean;
  element?: HTMLDivElement | null; 
}

interface IntersectionEntry {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
}

const defaultOptions: IntersectionObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

const useIntersectionObserver = ({
  options = {},
  dependencies = [],
  triggerOnce = false,
  element = null
}: UseIntersectionObserverProps={}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionEntry | null>(null);
  const [intersectionRatio, setIntersectionRatio] = useState<number>(0);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => { 
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(Math.round(entry.intersectionRatio * 100));
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(ref.current!);
        }
      });
    };
    const observer = new IntersectionObserver(callback, { ...defaultOptions, ...options });

    if (element) {
      ref.current = element;
    }

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [...dependencies, JSON.stringify(options), element]);

  return { ref, isIntersecting, entry, intersectionRatio };
};

export default useIntersectionObserver;
