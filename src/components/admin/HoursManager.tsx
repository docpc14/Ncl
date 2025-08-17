import React, { useState } from 'react';
import { Save, Clock } from 'lucide-react';
import { useOpeningHours } from '../../hooks/useOpeningHours';

const HoursManager = () => {
  const { hours, loading, error, updateHours, getDayName, formatTime } = useOpeningHours();
  const [editingHours, setEditingHours] = useState<Record<number, any>>({});

  const handleToggleDay = (dayOfWeek: number, isOpen: boolean) => {
    setEditingHours(prev => ({
      ...prev,
      [dayOfWeek]: {
        ...prev[dayOfWeek],
        is_open: isOpen,
        opening_time: isOpen ? (prev[dayOfWeek]?.opening_time || '09:00') : null,
        closing_time: isOpen ? (prev[dayOfWeek]?.closing_time || '18:00') : null
      }
    }));
  };

  const handleTimeChange = (dayOfWeek: number, field: 'opening_time' | 'closing_time', value: string) => {
    setEditingHours(prev => ({
      ...prev,
      [dayOfWeek]: {
        ...prev[dayOfWeek],
        [field]: value
      }
    }));
  };

  const handleSave = async (dayOfWeek: number) => {
    const updates = editingHours[dayOfWeek];
    if (updates) {
      await updateHours(dayOfWeek, updates);
      setEditingHours(prev => {
        const newState = { ...prev };
        delete newState[dayOfWeek];
        return newState;
      });
    }
  };

  const getCurrentValue = (dayOfWeek: number, field: string) => {
    const editing = editingHours[dayOfWeek];
    if (editing && editing[field] !== undefined) {
      return editing[field];
    }
    const hour = hours.find(h => h.day_of_week === dayOfWeek);
    return hour ? hour[field as keyof typeof hour] : null;
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
        <Clock className="h-6 w-6 text-amber-600" />
        <h2 className="text-2xl font-bold text-stone-800">Gestion des Horaires</h2>
      </div>

      <div className="space-y-4">
        {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
          const isOpen = getCurrentValue(dayOfWeek, 'is_open');
          const openingTime = getCurrentValue(dayOfWeek, 'opening_time');
          const closingTime = getCurrentValue(dayOfWeek, 'closing_time');
          const hasChanges = editingHours[dayOfWeek];

          return (
            <div key={dayOfWeek} className="bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-stone-800 w-24">
                    {getDayName(dayOfWeek)}
                  </h3>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isOpen || false}
                      onChange={(e) => handleToggleDay(dayOfWeek, e.target.checked)}
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-stone-700">Ouvert</span>
                  </label>

                  {isOpen && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={formatTime(openingTime)}
                        onChange={(e) => handleTimeChange(dayOfWeek, 'opening_time', e.target.value)}
                        className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-stone-500">à</span>
                      <input
                        type="time"
                        value={formatTime(closingTime)}
                        onChange={(e) => handleTimeChange(dayOfWeek, 'closing_time', e.target.value)}
                        className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  )}
                </div>

                {hasChanges && (
                  <button
                    onClick={() => handleSave(dayOfWeek)}
                    className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Enregistrer</span>
                  </button>
                )}
              </div>

              {!isOpen && (
                <p className="text-stone-500 text-sm mt-2 ml-28">Fermé</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <h3 className="font-semibold text-amber-800 mb-2">Aperçu des horaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {hours.map((hour) => (
            <div key={hour.day_of_week} className="flex justify-between">
              <span className="font-medium">{getDayName(hour.day_of_week)}</span>
              <span className={hour.is_open ? 'text-stone-700' : 'text-stone-400'}>
                {hour.is_open && hour.opening_time && hour.closing_time
                  ? `${formatTime(hour.opening_time)} - ${formatTime(hour.closing_time)}`
                  : 'Fermé'
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoursManager;