import type { Superhero } from '../types/superhero';
import { Pencil, Trash2 } from 'lucide-react';

interface HeroCardProps {
  hero: Superhero;
  onClick: (hero: Superhero) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HeroCard = ({ hero, onClick, onEdit, onDelete }: HeroCardProps) => {
  return (
    <div 
      className="relative bg-white w-64 h-64 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(hero)}
    >
      <img
        src={hero.images[0]?.url || '/placeholder.jpg'}
        alt={hero.nickname}
        className="w-full h-48 object-cover"
      />

      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={(e) => {e.stopPropagation(); onEdit(hero.id)}}
          className="p-1 bg-white rounded-full shadow hover:bg-gray-100 "
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={(e) => {e.stopPropagation(); onDelete(hero.id)}}
          className="p-1 bg-white rounded-full shadow hover:bg-gray-100 "
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{hero.nickname}</h3>
      </div>
    </div>
  );
};
