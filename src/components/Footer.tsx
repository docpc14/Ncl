import React from 'react';
import { Scissors, MapPin, Phone, Mail, Facebook, Instagram, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-stone-800 to-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg">
                <Scissors className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Normandie Coiffure</h3>
                <p className="text-amber-200">Lisieux</p>
              </div>
            </div>
            <p className="text-stone-300 leading-relaxed mb-6 max-w-md">
              Votre salon de coiffure à Lisieux spécialisé dans la coiffure homme, femme et les soins de la barbe, 
              dans un cadre chaleureux au design bois et chrome.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-stone-700 hover:bg-amber-600 p-3 rounded-lg transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-stone-700 hover:bg-amber-600 p-3 rounded-lg transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-200">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-300">8 Rue Henry Chéron</p>
                  <p className="text-stone-300">14100 Lisieux</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <p className="text-stone-300">02 31 XX XX XX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <p className="text-stone-300">contact@normandie-coiffure.fr</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-200 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Horaires
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Lundi</span>
                <span className="text-stone-400">Fermé</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-300">Mar-Ven</span>
                <span className="text-stone-300">09h-18h30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-300">Samedi</span>
                <span className="text-stone-300">09h-17h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Dimanche</span>
                <span className="text-stone-400">Fermé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-stone-400 text-sm">
              © 2024 Normandie Coiffure. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Plan du site
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-stone-400 to-amber-500"></div>
    </footer>
  );
};

export default Footer;