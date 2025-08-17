import React, { useState } from 'react';
import { Save, FileText, Edit2 } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';

const ContentManager = () => {
  const { content, loading, error, updateContent, getContent } = useSiteContent();
  const [editingContent, setEditingContent] = useState<Record<string, string>>({});

  const contentSections = [
    {
      section: 'hero',
      title: 'Section Hero',
      fields: [
        { key: 'title_line1', label: 'Titre ligne 1', type: 'text' },
        { key: 'title_line2', label: 'Titre ligne 2', type: 'text' },
        { key: 'subtitle', label: 'Sous-titre', type: 'textarea' }
      ]
    },
    {
      section: 'about',
      title: 'Section À Propos',
      fields: [
        { key: 'title', label: 'Titre', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]
    },
    {
      section: 'services',
      title: 'Section Prestations',
      fields: [
        { key: 'title', label: 'Titre', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]
    },
    {
      section: 'gallery',
      title: 'Section Galerie',
      fields: [
        { key: 'title', label: 'Titre', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]
    },
    {
      section: 'contact',
      title: 'Section Contact',
      fields: [
        { key: 'title', label: 'Titre', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]
    }
  ];

  const handleEdit = (section: string, key: string) => {
    const currentValue = getContent(section, key);
    setEditingContent(prev => ({
      ...prev,
      [`${section}.${key}`]: currentValue
    }));
  };

  const handleSave = async (section: string, key: string) => {
    const editKey = `${section}.${key}`;
    const newValue = editingContent[editKey];
    
    if (newValue !== undefined) {
      await updateContent(section, key, newValue);
      setEditingContent(prev => {
        const newState = { ...prev };
        delete newState[editKey];
        return newState;
      });
    }
  };

  const handleCancel = (section: string, key: string) => {
    const editKey = `${section}.${key}`;
    setEditingContent(prev => {
      const newState = { ...prev };
      delete newState[editKey];
      return newState;
    });
  };

  const handleChange = (section: string, key: string, value: string) => {
    const editKey = `${section}.${key}`;
    setEditingContent(prev => ({
      ...prev,
      [editKey]: value
    }));
  };

  const isEditing = (section: string, key: string) => {
    return editingContent[`${section}.${key}`] !== undefined;
  };

  const getEditingValue = (section: string, key: string) => {
    return editingContent[`${section}.${key}`] || '';
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Erreur: {error}</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-6 w-6 text-amber-600" />
        <h2 className="text-2xl font-bold text-stone-800">Gestion du Contenu</h2>
      </div>

      <div className="space-y-8">
        {contentSections.map((section) => (
          <div key={section.section} className="bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-stone-800 mb-4">{section.title}</h3>
            
            <div className="space-y-4">
              {section.fields.map((field) => {
                const currentValue = getContent(section.section, field.key);
                const editing = isEditing(section.section, field.key);
                const editingValue = getEditingValue(section.section, field.key);

                return (
                  <div key={field.key} className="border border-stone-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-stone-700">
                        {field.label}
                      </label>
                      {!editing && (
                        <button
                          onClick={() => handleEdit(section.section, field.key)}
                          className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 text-sm"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Modifier</span>
                        </button>
                      )}
                    </div>

                    {editing ? (
                      <div className="space-y-3">
                        {field.type === 'textarea' ? (
                          <textarea
                            value={editingValue}
                            onChange={(e) => handleChange(section.section, field.key, e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => handleChange(section.section, field.key, e.target.value)}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        )}
                        
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleCancel(section.section, field.key)}
                            className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => handleSave(section.section, field.key)}
                            className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            <Save className="h-4 w-4" />
                            <span>Enregistrer</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-stone-50 rounded-lg p-3">
                        <p className="text-stone-700 whitespace-pre-wrap">
                          {currentValue || <span className="text-stone-400 italic">Aucun contenu</span>}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;