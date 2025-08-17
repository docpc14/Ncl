import React, { useState } from 'react';
import { Menu, X, Scissors, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-amber-50 to-stone-100 shadow-lg border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-3 rounded-xl shadow-lg">
              <Scissors className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-stone-700 bg-clip-text text-transparent">
                Normandie Coiffure
              </h1>
              <p className="text-sm text-stone-600">Lisieux</p>
            </div>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-stone-700">
              <MapPin className="h-4 w-4 text-amber-600" />
              <span className="text-sm">8 Rue Henry Chéron, 14100 Lisieux</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-700">
              <Phone className="h-4 w-4 text-amber-600" />
              <span className="text-sm">02 31 XX XX XX</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white shadow-md border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-stone-700">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span className="text-sm">8 Rue Henry Chéron, 14100 Lisieux</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-700">
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="text-sm">02 31 XX XX XX</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;