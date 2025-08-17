import { useState, useEffect } from 'react';
import { supabase, GalleryImage } from '../lib/supabase';

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (file: File, imageData: Omit<GalleryImage, 'id' | 'image_url' | 'created_at' | 'updated_at'>) => {
    try {
      // Upload du fichier vers Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Récupération de l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Insertion en base
      const { error: insertError } = await supabase
        .from('gallery_images')
        .insert([{ ...imageData, image_url: publicUrl }]);

      if (insertError) throw insertError;
      await fetchImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload');
    }
  };

  const updateImage = async (id: string, updates: Partial<GalleryImage>) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    updateImage,
    deleteImage,
    refetch: fetchImages
  };
};