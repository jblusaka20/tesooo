export const lazyLoadImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = reject;
    img.src = imageUrl;
  });
};

export const preloadImages = (imageUrls: string[]): Promise<string[]> => {
  return Promise.all(imageUrls.map(url => lazyLoadImage(url)));
};

export const setupIntersectionObserver = (
  elements: NodeListOf<Element>,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options || { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  return observer;
};
