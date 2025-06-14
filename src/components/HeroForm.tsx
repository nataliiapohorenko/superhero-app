import { useEffect, useRef, useState } from 'react';
import type { Superhero } from '../types/superhero';
import { useDeleteImage } from '../hooks/useDeleteImage';

interface HeroFormProps {
  initial?: Superhero;
  onSubmit: (heroData: Omit<Superhero, 'id' | 'images'>) => void;
  onImagesUpload?: (files: File[]) => void;
  loading?: boolean;
}

type UploadImage = {
  file: File;
  preview: string;
};

export const HeroForm = ({ initial, onSubmit, onImagesUpload, loading }: HeroFormProps) => {
  const [nickname, setNickname] = useState(initial?.nickname || '');
  const [realName, setRealName] = useState(initial?.real_name || '');
  const [originDescription, setOriginDescription] = useState(initial?.origin_description || '');
  const [superpowers, setSuperpowers] = useState(initial?.superpowers?.join(', ') || '');
  const [catchPhrase, setCatchPhrase] = useState(initial?.catch_phrase || '');
  const [images, setImages] = useState<UploadImage[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(initial?.images?.map(img => img.url) || []);
  const [imagesMarkedForDelete, setImagesMarkedForDelete] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteImage = useDeleteImage();

  useEffect(() => {
    if (onImagesUpload) {
      onImagesUpload(images.map(f => f.file));
    }
  }, [images, onImagesUpload]);

  useEffect(() => {
  if (initial?.images) {
    setExistingImages(initial.images.map(img => img.url));
  }
}, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const heroData = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      catch_phrase: catchPhrase,
      superpowers: superpowers.split(',').map(s => s.trim()),
    };
    onSubmit(heroData);

    if (initial?.id && imagesMarkedForDelete.length > 0) {
    imagesMarkedForDelete.forEach((url) => {
      const imageName = url.split('/').pop();
      deleteImage.mutate({ heroId: initial.id!, imageName: imageName! });
    });
    setImagesMarkedForDelete([]);
  }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray: UploadImage[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages(fileArray);
    }
  };

  const handleRemovePreview = (src: string) => {
    URL.revokeObjectURL(src)
    setImages((prev) => prev.filter((f) => f.preview !== src));
  };


  const handleRemoveExistingImage = (url: string) => {
    if (!initial?.id) return;
    setExistingImages(prev => prev.filter(img => img !== url));
    setImagesMarkedForDelete(prev => [...prev, url]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Real Name" value={realName} onChange={(e) => setRealName(e.target.value)} className="w-full p-2 border rounded" required/>
      <textarea placeholder="Origin Description" value={originDescription} onChange={(e) => setOriginDescription(e.target.value)} className="w-full p-2 border rounded" required/>
      <input type="text" placeholder="Superpowers (comma-separated)" value={superpowers} onChange={(e) => setSuperpowers(e.target.value)} className="w-full p-2 border rounded" required/>
      <input type="text" placeholder="Catch Phrase" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} className="w-full p-2 border rounded" required/>

      <div>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => fileInputRef.current?.click()}
        >
          Pick files
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>


      {images.length > 0 && (
        <>
          <p className='mt-4 mb-2'>New images:</p>
          <div className="flex gap-2 flex-wrap">
            {images.map(({ preview }, i) => (
              <div key={i} className="relative">
                <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(preview)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {existingImages.length > 0 && (
        <>
          <p className='mt-4 mb-2'>Existing images:</p>
          <div className="flex gap-2 flex-wrap">
            {existingImages.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="existing" className="w-24 h-24 object-cover rounded border" />
                <button type="button" onClick={() => handleRemoveExistingImage(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-sm">×</button>
              </div>
            ))}
          </div>
        </>
      )}

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};
