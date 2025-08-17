import React, { useState } from 'react';
import { Save, Phone, Mail, MapPin } from 'lucide-react';
import { useContactInfo } from '../../hooks/useContactInfo';

const ContactManager = () => {
  const { contactInfo, loading, error, updateContactInfo } = useContactInfo();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: ''
  });

  React.useEffect(() => {
    if (contactInfo) {
      setFormData({
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: contactInfo.address
      });
    }
  }, [contactInfo]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    await updateContactInfo(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    if (contactInfo) {
      setFormData({
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: contactInfo.address
      });
    }
    setEditing(false);
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
        <h2 className="text-2xl font-bold text-stone-800">Informations de Contact</h2>
        {!editing && (
          <button
            onClick={handleEdit}
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Modifier
          </button>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6">
        {editing ? (
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 mb-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>Téléphone</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="02 31 XX XX XX"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 mb-2">
                <Mail className="h-4 w-4 text-amber-600" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="contact@normandie-coiffure.fr"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-stone-700 mb-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Adresse</span>
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="8 Rue Henry Chéron, 14100 Lisieux"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-1">Téléphone</h3>
                <p className="text-stone-600">{contactInfo?.phone || 'Non défini'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-stone-500 to-stone-600 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-1">Email</h3>
                <p className="text-stone-600">{contactInfo?.email || 'Non défini'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-600 to-stone-600 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-1">Adresse</h3>
                <p className="text-stone-600 whitespace-pre-line">{contactInfo?.address || 'Non définie'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;