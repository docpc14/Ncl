import { useState, useEffect } from 'react';
import { supabase, ContactInfo } from '../lib/supabase';

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      setContactInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const updateContactInfo = async (updates: Partial<ContactInfo>) => {
    try {
      if (contactInfo) {
        // Mise à jour
        const { error } = await supabase
          .from('contact_info')
          .update(updates)
          .eq('id', contactInfo.id);

        if (error) throw error;
      } else {
        // Création
        const { error } = await supabase
          .from('contact_info')
          .insert([updates]);

        if (error) throw error;
      }
      await fetchContactInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  return {
    contactInfo,
    loading,
    error,
    updateContactInfo,
    refetch: fetchContactInfo
  };
};