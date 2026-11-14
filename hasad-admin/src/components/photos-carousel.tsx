/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface EmblaCarouselProps {
  slides: string[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-[80%] md:min-w-[60%] p-2">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="block w-full h-auto max-h-80 object-contain rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default EmblaCarousel;
