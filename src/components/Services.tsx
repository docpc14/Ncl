import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useServices, useSiteContent } from '../hooks';

const Services = () => {
  const { services, loading } = useServices();
  const { getContent } = useSiteContent();

  const getGradientClass = (category: string) => {
    const gradients: Record<string, string> = {
      coupe: "from-amber-500 to-amber-600",
      coloration: "from-stone-500 to-stone-600",
      soins: "from-stone-400 to-amber-500",
      evenement: "from-amber-500 to-stone-500",
      general: "from-amber-600 to-stone-600"
    };
    return gradients[category] || "from-amber-500 to-amber-600";
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">Chargement des prestations...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-800 to-stone-700 bg-clip-text text-transparent">
              {getContent('services', 'title', 'Nos Prestations')}
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getContent('services', 'description', 'Coiffure homme, femme et soins de la barbe. Des services d\'exception adaptés à tous types de cheveux et tous les styles.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Scissors;
            const gradient = getGradientClass(service.category);
            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-stone-800 mb-3 text-center">
                  {service.name}
                </h3>
                
                <p className="text-stone-600 mb-4 text-center leading-relaxed">
                  {service.description}
                </p>
                
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-amber-100 to-stone-100 px-4 py-2 rounded-full text-stone-700 font-semibold border border-stone-200">
                    À partir de {service.price_from}€
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-600 to-stone-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt(e) pour une transformation ?
            </h3>
            <p className="text-amber-100 mb-8 text-lg max-w-2xl mx-auto">
              Réservez votre créneau et laissez nos experts révéler votre style unique 
              avec des techniques modernes et personnalisées.
            </p>
            <button className="bg-white text-stone-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Prendre rendez-vous maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;