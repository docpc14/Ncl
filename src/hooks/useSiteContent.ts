import { useState, useEffect } from 'react';
import { supabase, SiteContent } from '../lib/supabase';

export const useSiteContent = () => {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      // Organiser le contenu par section et clé
      const organizedContent: Record<string, Record<string, string>> = {};
      data?.forEach((item: SiteContent) => {
        if (!organizedContent[item.section]) {
          organizedContent[item.section] = {};
        }
        organizedContent[item.section][item.key] = item.value;
      });

      setContent(organizedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (section: string, key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section,
          key,
          value,
          type: 'text'
        }, {
          onConflict: 'section,key'
        });

      if (error) throw error;
      await fetchContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const getContent = (section: string, key: string, defaultValue: string = ''): string => {
    return content[section]?.[key] || defaultValue;
  };

  return {
    content,
    loading,
    error,
    updateContent,
    getContent,
    refetch: fetchContent
  };
};