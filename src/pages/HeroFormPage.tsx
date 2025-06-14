import { useParams, useNavigate } from 'react-router-dom';
import { useHero } from '../hooks/useHero';
import { useCreateHero } from '../hooks/useCreateHero';
import { useUpdateHero } from '../hooks/useUpdateHero';
import { useUploadImages } from '../hooks/useUploadImages';
import { HeroForm } from '../components/HeroForm';
import type { Superhero } from '../types/superhero';
import { useCallback, useState } from 'react';

const HeroFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const isEdit = !!id;
  
  const { data: hero, isLoading } = useHero(id || '', isEdit);
  const createHero = useCreateHero();
  const updateHero = useUpdateHero(id || '');
  const uploadImages = useUploadImages();

  const handleSubmit = (heroData: Omit<Superhero, "id" | "images">) => {
    if (isEdit) {
      updateHero.mutate(heroData, {
        onSuccess: () => {
          if (imagesToUpload.length > 0 && id) {
            const fd = new FormData();
            imagesToUpload.forEach((file) => fd.append('images', file));
            uploadImages.mutate({ id, formData: fd });
          }
          navigate('/')
        }
      });
    } else {
      createHero.mutate(heroData, {
        onSuccess: (newHero) => {
          if (imagesToUpload.length > 0) {
            const fd = new FormData();
            imagesToUpload.forEach((file) => fd.append('images', file));
            uploadImages.mutate({ id: newHero.id, formData: fd });
          }
          navigate('/');
        }
      });
    }
  };

  const handleImageUpload = useCallback((files: File[]) => {
    setImagesToUpload(files);
  }, []);

  if (isEdit && isLoading) return <p>Uploading hero...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => navigate('/')}>Back</button>
      <h2 className="ml-4 text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Create'} hero</h2>
      <HeroForm
        initial={hero}
        onSubmit={handleSubmit}
        onImagesUpload={handleImageUpload}
        loading={createHero.isPending || updateHero.isPending}
      />
    </div>
  );
};

export default HeroFormPage;