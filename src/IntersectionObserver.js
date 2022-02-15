import { useEffect } from 'react';

const ROOT_MARGIN = '100px'
const THRESHOLD = '0.10'
let listenerCallbacks = new WeakMap();
let observer;

const handleIntersections = (entries) => {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

const  getIntersectionObserver = () => {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLD,
    });
  }
  return observer;
}

export const useIntersection = (elem, callback) => {
  useEffect(() => {
    let target = elem.current;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}

