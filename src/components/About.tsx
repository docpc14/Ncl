import React from 'react';
import { Heart, Users, Sparkles, Trophy } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

const About = () => {
  const { getContent } = useSiteContent();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-800 to-stone-700 bg-clip-text text-transparent">
              {getContent('about', 'title', 'Votre salon à Lisieux')}
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getContent('about', 'description', 'Depuis notre installation au cœur de Lisieux, Normandie Coiffure propose des services de coiffure homme, femme et soins de la barbe dans un cadre chaleureux et professionnel.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image réelle du salon */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Intérieur du salon Normandie Coiffure"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative chrome frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-stone-300 to-stone-400 rounded-3xl -z-10 opacity-20"></div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Coiffure Homme & Femme</h3>
                <p className="text-stone-600">
                  Coupes tendance, colorations modernes et coiffages pour hommes et femmes. 
                  Techniques adaptées à tous les types de cheveux et tous les styles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-stone-500 to-stone-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Soins de la Barbe</h3>
                <p className="text-stone-600">
                  Taille précise, entretien et soins spécialisés pour votre barbe. 
                  Conseils personnalisés pour un look parfaitement maîtrisé.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-600 to-stone-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Approche Personnalisée</h3>
                <p className="text-stone-600">
                  Chaque client est unique. Nous adaptons nos services selon vos envies et votre style, 
                  dans un cadre alliant chaleur du bois et élégance contemporaine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">10+</div>
            <div className="text-stone-600">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-600 mb-2">500+</div>
            <div className="text-stone-600">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">20+</div>
            <div className="text-stone-600">Prestations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-600 mb-2">100%</div>
            <div className="text-stone-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;