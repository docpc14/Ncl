import React from 'react';
import { MapPin, Phone, Clock, Mail, Calendar, Navigation } from 'lucide-react';
import { useSiteContent, useContactInfo, useOpeningHours } from '../hooks';

const Contact = () => {
  const { getContent } = useSiteContent();
  const { contactInfo } = useContactInfo();
  const { hours, getDayName, formatTime } = useOpeningHours();

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-800 to-stone-700 bg-clip-text text-transparent">
              {getContent('contact', 'title', 'Contact & Horaires')}
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {getContent('contact', 'description', 'Situés au cœur de Lisieux, nous vous accueillons dans un cadre chaleureux pour des services de coiffure homme, femme et soins de la barbe.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Hours */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-amber-600 mr-3" />
                Nous Trouver
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">Adresse</p>
                    <p className="text-stone-600 whitespace-pre-line">{contactInfo?.address || '8 Rue Henry Chéron\n14100 Lisieux'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-stone-500 to-stone-600 p-2 rounded-lg flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">Téléphone</p>
                    <p className="text-stone-600">{contactInfo?.phone || '02 31 XX XX XX'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-600 to-stone-600 p-2 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">Email</p>
                    <p className="text-stone-600">{contactInfo?.email || 'contact@normandie-coiffure.fr'}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Itinéraire GPS</span>
              </button>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-amber-600 mr-3" />
                Horaires d'Ouverture
              </h3>
              
              <div className="space-y-3">
                {hours.map((hour) => (
                  <div key={hour.day_of_week} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-b-0">
                    <span className="font-medium text-stone-800">{getDayName(hour.day_of_week)}</span>
                    <span className={`font-semibold ${!hour.is_open ? 'text-stone-400' : 'text-amber-600'}`}>
                      {hour.is_open && hour.opening_time && hour.closing_time
                        ? `${formatTime(hour.opening_time)} - ${formatTime(hour.closing_time)}`
                        : 'Fermé'
                      }
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note :</strong> Rendez-vous recommandé. Possibilité d'accueil sans RDV selon disponibilités.
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200">
            <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-amber-600 mr-3" />
              Demande de Rendez-vous
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Nom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  placeholder="Votre numéro de téléphone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Prestation souhaitée</label>
                <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                  <option>Sélectionnez une prestation</option>
                  <option>Coupe Homme</option>
                  <option>Coupe Femme</option>
                  <option>Soins de la Barbe</option>
                  <option>Coloration</option>
                  <option>Balayage</option>
                  <option>Coiffure Événement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message (optionnel)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Précisez vos souhaits, disponibilités..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Envoyer ma demande
              </button>
            </form>

            <div className="mt-6 p-4 bg-stone-50 rounded-xl">
              <p className="text-sm text-stone-600 text-center">
                Nous vous recontacterons dans les plus brefs délais pour confirmer votre rendez-vous.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;