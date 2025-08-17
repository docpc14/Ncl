import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Star } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

const Gallery = () => {
  const { getContent } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images réelles du salon
  const galleryItems = [
    {
      type: 'salon',
      title: 'Intérieur du salon',
      description: 'Ambiance chaleureuse et moderne',
      image: '/téléchargement (1).jpeg'
    },
    {
      type: 'salon',
      title: 'Espace de travail',
      description: 'Équipements professionnels L\'Oréal',
      image: '/téléchargement (2).jpeg'
    },
    {
      type: 'salon',
      title: 'Zone de coiffage',
      description: 'Design moderne et fonctionnel',
      image: '/téléchargement (3).jpeg'
    },
    {
      type: 'salon',
      title: 'Accueil du salon',
      description: 'Atmosphère accueillante et professionnelle',
      image: '/téléchargement (4).jpeg'
    },
    {
      type: 'salon',
      title: 'Vue d\'ensemble',
      description: 'L\'élégance au service de votre beauté',
      image: '/téléchargement (1) copy.jpeg'
    },
    {
      type: 'salon',
      title: 'Détail du salon',
      description: 'Finitions soignées et matériaux nobles',
      image: '/téléchargement (2) copy.jpeg'
    },
    {
      type: 'salon',
      title: 'Espace détente',
      description: 'Confort et sérénité pour nos clients',
      image: '/téléchargement (3) copy.jpeg'
    },
    {
      type: 'salon',
      title: 'Normandie Coiffure',
      description: 'Votre salon de référence à Lisieux',
      image: '/téléchargement (4) copy.jpeg'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-800 to-stone-700 bg-clip-text text-transparent">
              {getContent('gallery', 'title', 'Galerie & Réalisations')}
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getContent('gallery', 'description', 'Découvrez nos créations et l\'ambiance chaleureuse de notre salon. Chaque réalisation raconte une histoire de transformation et d\'élégance.')}
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-12">
          <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Image réelle */}
            <img
              src={galleryItems[currentSlide].image}
              alt={galleryItems[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay avec informations */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {galleryItems[currentSlide].title}
                </h3>
                <p className="text-lg text-white/90">
                  {galleryItems[currentSlide].description}
                </p>
                <div className="mt-4 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <ChevronLeft className="h-6 w-6 text-stone-700 group-hover:text-amber-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <ChevronRight className="h-6 w-6 text-stone-700 group-hover:text-amber-600" />
            </button>

            {/* Chrome frame effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-stone-300 via-stone-400 to-stone-300 rounded-3xl -z-10 opacity-30"></div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-amber-600 w-8'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`aspect-square rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative ${
                index === currentSlide ? 'ring-4 ring-amber-500 ring-opacity-50' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
              </div>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200">
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              Envie de voir votre transformation ?
            </h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Rejoignez nos nombreux clients satisfaits et découvrez le potentiel de vos cheveux 
              avec nos techniques L'Oréal Professionnel.
            </p>
            <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold">
              Réserver ma consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;