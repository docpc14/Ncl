import { useState, useEffect } from 'react';
import { supabase, OpeningHour } from '../lib/supabase';

export const useOpeningHours = () => {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHours = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('opening_hours')
        .select('*')
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      setHours(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const updateHours = async (dayOfWeek: number, updates: Partial<OpeningHour>) => {
    try {
      const { error } = await supabase
        .from('opening_hours')
        .update(updates)
        .eq('day_of_week', dayOfWeek);

      if (error) throw error;
      await fetchHours();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const getDayName = (dayOfWeek: number): string => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[dayOfWeek];
  };

  const formatTime = (time: string | null): string => {
    if (!time) return '';
    return time.substring(0, 5); // Format HH:MM
  };

  return {
    hours,
    loading,
    error,
    updateHours,
    getDayName,
    formatTime,
    refetch: fetchHours
  };
};