import { useState } from 'react';
import { HeroCard } from '../components/HeroCard';
import { useHeroes } from '../hooks/useHeroes';
import type { SuperheroBase } from '../types/superhero';
import { HeroModal } from '../components/HeroModal';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../components/ConfirmModal';
import { useDeleteHero } from '../hooks/useDeleteHero';

const HeroesPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useHeroes(page);
  const [selectedHero, setSelectedHero] = useState<SuperheroBase | null>(null);
  const [heroToDelete, setHeroToDelete] = useState<SuperheroBase | null>(null);
  const deleteHero = useDeleteHero();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    const hero = data?.heroes.find((h) => h.id === id);
    if (hero) setHeroToDelete(hero);
  };

  const confirmDelete = () => {
    if (heroToDelete) {
      deleteHero.mutate(heroToDelete.id, {
        onSuccess: () => setHeroToDelete(null),
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const totalPages = Math.ceil(data?.total ? data?.total / 5 : 1);

  return (
    <>
      <div className='flex justify-end'>
        <button className='mt-6 mr-8 mb-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300' onClick={handleCreate}>
          Create new Hero
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center p-4">
        {data?.heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            onClick={() => setSelectedHero(hero)}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedHero && (
        <HeroModal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      )}

      <ConfirmModal
        isOpen={!!heroToDelete}
        onCancel={() => setHeroToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete hero"
        message={`Are you sure want to delete hero "${heroToDelete?.nickname}"?`}
        isLoading={deleteHero.isPending}
      />
    </>
  );
};

export default HeroesPage
