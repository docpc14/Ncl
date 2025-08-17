import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { Service } from '../../lib/supabase';

const ServicesManager = () => {
  const { services, loading, error, updateService, createService, deleteService } = useServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    price_from: 0,
    icon: 'Scissors',
    category: 'general',
    is_active: true,
    order_index: 0
  });

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateService(editingId, formData);
    } else {
      await createService(formData as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
    }
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price_from: 0,
      icon: 'Scissors',
      category: 'general',
      is_active: true,
      order_index: 0
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price_from: 0,
      icon: 'Scissors',
      category: 'general',
      is_active: true,
      order_index: 0
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette prestation ?')) {
      await deleteService(id);
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
        <h2 className="text-2xl font-bold text-stone-800">Gestion des Prestations</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">Nouvelle Prestation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price_from}
                onChange={(e) => setFormData({ ...formData, price_from: parseFloat(e.target.value) })}
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
                <option value="coupe">Coupe</option>
                <option value="coloration">Coloration</option>
                <option value="soins">Soins</option>
                <option value="evenement">Événement</option>
                <option value="general">Général</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Icône</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Scissors, Palette, etc."
              />
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
              className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      )}

      {/* Liste des prestations */}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border border-stone-200 rounded-xl p-4">
            {editingId === service.id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_from}
                    onChange={(e) => setFormData({ ...formData, price_from: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
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
                <div className="md:col-span-2 flex justify-end space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Annuler</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-stone-800">{service.name}</h3>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">
                      À partir de {service.price_from}€
                    </span>
                    <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full text-sm">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-stone-600">{service.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;