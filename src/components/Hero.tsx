import React from 'react';
import { Calendar, Star, Award, Scissors } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero = () => {
  const { getContent } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with wood texture effect */}
      <div className="absolute inset-0">
        {/* Image de fond du salon */}
        <img
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Salon Normandie Coiffure"
          className="w-full h-full object-cover"
        />
        {/* Overlay pour lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-stone-900/50 to-amber-900/70"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23d4a574%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white drop-shadow-2xl">
              {getContent('hero', 'title_line1', 'Votre style,')}
            </span>
            <br />
            <span className="text-amber-200 drop-shadow-2xl">
              {getContent('hero', 'title_line2', 'notre signature')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {getContent('hero', 'subtitle', 'Coiffure homme, femme et soins de la barbe au cœur de Lisieux. Expertise, personnalisation et raffinement dans un cadre chaleureux.')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Prendre rendez-vous</span>
            </div>
          </button>
          <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-stone-700 rounded-xl shadow-lg hover:shadow-xl border border-stone-200 hover:bg-white transition-all duration-300 font-semibold">
            Découvrir nos prestations
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Coiffure Homme & Femme</h3>
            <p className="text-stone-600">Coupes modernes, colorations tendance et soins personnalisés pour tous les styles.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-stone-500 to-stone-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Soins de la Barbe</h3>
            <p className="text-stone-600">Taille, entretien et soins spécialisés pour une barbe parfaitement entretenue.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-amber-600 to-stone-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Expertise Personnalisée</h3>
            <p className="text-stone-600">Conseils sur-mesure et techniques adaptées à votre type de cheveux et votre style.</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-stone-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-stone-400/20 to-amber-400/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;