import type { SuperheroBase } from '../types/superhero';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useHero } from '../hooks/useHero';

interface HeroModalProps {
  hero: SuperheroBase;
  onClose: () => void;
}

export const HeroModal = ({ hero, onClose }: HeroModalProps) => {
  const [index, setIndex] = useState(0);
  const { data, isLoading, isError } = useHero(hero.id);
  const total = data?.images.length ?? 0;

  const prev = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div 
      className="fixed inset-0 z-50 bg-gray-300/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {isLoading ? <p> Loading.. </p> : isError ? <p> Error </p> :
        <div 
          className="relative bg-white rounded-xl p-6 w-full max-w-2xl flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black "
          >
            <X size={24} />
          </button>

          {total > 0 && (
            <div className="relative m-4">
              <img
                src={data?.images[index].url}
                alt={`Image ${index + 1}`}
                className="w-112 h-112 object-cover rounded-lg"
              />
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 "
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 "
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{data?.nickname}</h2>
          <p><strong>Real Name:</strong> {data?.real_name}</p>
          <p><strong>Origin:</strong> {data?.origin_description}</p>
          <p><strong>Superpowers:</strong> {data?.superpowers?.join(', ')}</p>
          <p><strong>Catch phrase:</strong> <em>"{data?.catch_phrase}"</em></p>
        </div>
      }
    </div>
  );
};
