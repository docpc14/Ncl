import React, { useState } from 'react';
import { Upload, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import { GalleryImage } from '../../lib/supabase';

const GalleryManager = () => {
  const { images, loading, error, uploadImage, updateImage, deleteImage } = useGallery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    description: '',
    category: 'salon',
    is_featured: false,
    order_index: 0
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData(image);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateImage(editingId, formData);
    } else if (selectedFile) {
      await uploadImage(selectedFile, formData as Omit<GalleryImage, 'id' | 'image_url' | 'created_at' | 'updated_at'>);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowUploadForm(false);
    setFormData({
      title: '',
      description: '',
      category: 'salon',
      is_featured: false,
      order_index: 0
    });
    setSelectedFile(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      await deleteImage(id);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Erreur: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800">Gestion de la Galerie</h2>
        <button
          onClick={() => setShowUploadForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Upload className="h-4 w-4" />
          <span>Ajouter une image</span>
        </button>
      </div>

      {/* Formulaire d'upload */}
      {showUploadForm && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">Nouvelle Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">Fichier image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="salon">Salon</option>
                <option value="before_after">Avant/Après</option>
                <option value="styling">Styling</option>
                <option value="team">Équipe</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-stone-700">Image mise en avant</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Annuler</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedFile}
              className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      )}

      {/* Grille des images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="border border-stone-200 rounded-xl overflow-hidden">
            {editingId === image.id ? (
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="salon">Salon</option>
                      <option value="before_after">Avant/Après</option>
                      <option value="styling">Styling</option>
                      <option value="team">Équipe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Annuler</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-amber-600 text-white px-3 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
                  {image.image_url ? (
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-stone-400" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-stone-800">{image.title}</h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(image)}
                        className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full text-xs">
                      {image.category}
                    </span>
                    {image.is_featured && (
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                        Mise en avant
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600">{image.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;