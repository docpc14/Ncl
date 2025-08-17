/*
  # Schema complet pour Normandie Coiffure

  1. Nouvelles Tables
    - `services` - Gestion des prestations et tarifs
      - `id` (uuid, primary key)
      - `name` (text) - Nom de la prestation
      - `description` (text) - Description détaillée
      - `price_from` (decimal) - Prix à partir de
      - `icon` (text) - Nom de l'icône Lucide
      - `category` (text) - Catégorie (coupe, coloration, soins, etc.)
      - `is_active` (boolean) - Prestation active/inactive
      - `order_index` (integer) - Ordre d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `gallery_images` - Gestion des photos
      - `id` (uuid, primary key)
      - `title` (text) - Titre de l'image
      - `description` (text) - Description
      - `image_url` (text) - URL de l'image
      - `category` (text) - Type (salon, before_after, styling, etc.)
      - `is_featured` (boolean) - Image mise en avant
      - `order_index` (integer) - Ordre d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `opening_hours` - Horaires d'ouverture
      - `id` (uuid, primary key)
      - `day_of_week` (integer) - Jour (0=dimanche, 1=lundi, etc.)
      - `is_open` (boolean) - Ouvert ce jour
      - `opening_time` (time) - Heure d'ouverture
      - `closing_time` (time) - Heure de fermeture
      - `updated_at` (timestamp)

    - `site_content` - Contenu textuel du site
      - `id` (uuid, primary key)
      - `section` (text) - Section du site (hero, about, etc.)
      - `key` (text) - Clé du contenu
      - `value` (text) - Valeur du contenu
      - `type` (text) - Type (text, html, json)
      - `updated_at` (timestamp)

    - `contact_info` - Informations de contact
      - `id` (uuid, primary key)
      - `phone` (text) - Numéro de téléphone
      - `email` (text) - Email
      - `address` (text) - Adresse complète
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour lecture publique
    - Policies pour modification par utilisateurs authentifiés uniquement
*/

-- Table des prestations et tarifs
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_from decimal(10,2) NOT NULL,
  icon text NOT NULL DEFAULT 'Scissors',
  category text NOT NULL DEFAULT 'general',
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des images de galerie
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'salon',
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des horaires d'ouverture
CREATE TABLE IF NOT EXISTS opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_open boolean DEFAULT true,
  opening_time time,
  closing_time time,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(day_of_week)
);

-- Table du contenu textuel
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  type text DEFAULT 'text',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

-- Table des informations de contact
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Opening hours are viewable by everyone"
  ON opening_hours FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Site content is viewable by everyone"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Contact info is viewable by everyone"
  ON contact_info FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies pour modification par utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage hours"
  ON opening_hours FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage content"
  ON site_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contact"
  ON contact_info FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Données initiales pour les prestations
INSERT INTO services (name, description, price_from, icon, category, order_index) VALUES
('Coupe & Styling', 'Coupes tendance adaptées à votre morphologie et style de vie', 35.00, 'Scissors', 'coupe', 1),
('Coloration', 'Colorations INOA sans ammoniaque pour un résultat éclatant et durable', 55.00, 'Palette', 'coloration', 2),
('French Balayage', 'Technique signature L''Oréal pour des reflets naturels et lumineux', 75.00, 'Sparkles', 'coloration', 3),
('Soins Capillaires', 'Traitements personnalisés pour nourrir et réparer vos cheveux', 25.00, 'Heart', 'soins', 4),
('Coiffures Mariage', 'Créations sur-mesure pour votre jour J, essai inclus', 80.00, 'Crown', 'evenement', 5),
('Lissage Steampod', 'Lissage vapeur L''Oréal pour un résultat professionnel longue durée', 45.00, 'Zap', 'soins', 6);

-- Données initiales pour les horaires
INSERT INTO opening_hours (day_of_week, is_open, opening_time, closing_time) VALUES
(0, false, null, null), -- Dimanche
(1, false, null, null), -- Lundi
(2, true, '09:00', '18:30'), -- Mardi
(3, true, '09:00', '18:30'), -- Mercredi
(4, true, '09:00', '18:30'), -- Jeudi
(5, true, '09:00', '18:30'), -- Vendredi
(6, true, '09:00', '17:00'); -- Samedi

-- Données initiales pour le contenu
INSERT INTO site_content (section, key, value, type) VALUES
('hero', 'title_line1', 'Votre style,', 'text'),
('hero', 'title_line2', 'notre signature', 'text'),
('hero', 'subtitle', 'Découvrez l''excellence capillaire au cœur de Lisieux. Expertise L''Oréal Pro, personnalisation et raffinement dans un cadre chaleureux.', 'text'),
('about', 'title', 'L''art capillaire à Lisieux', 'text'),
('about', 'description', 'Depuis notre installation au cœur de Lisieux, Normandie Coiffure cultive l''excellence et l''innovation pour révéler la beauté unique de chaque client.', 'text'),
('services', 'title', 'Nos Prestations', 'text'),
('services', 'description', 'Des services d''exception avec les produits L''Oréal Professionnel, adaptés à tous types de cheveux et toutes vos envies.', 'text'),
('gallery', 'title', 'Galerie & Réalisations', 'text'),
('gallery', 'description', 'Découvrez nos créations et l''ambiance chaleureuse de notre salon. Chaque réalisation raconte une histoire de transformation et d''élégance.', 'text'),
('contact', 'title', 'Contact & Horaires', 'text'),
('contact', 'description', 'Situés au cœur de Lisieux, nous vous accueillons dans un cadre chaleureux pour prendre soin de vos cheveux avec expertise et passion.', 'text');

-- Données initiales pour les informations de contact
INSERT INTO contact_info (phone, email, address) VALUES
('02 31 XX XX XX', 'contact@normandie-coiffure.fr', '8 Rue Henry Chéron, 14100 Lisieux');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_opening_hours_updated_at BEFORE UPDATE ON opening_hours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();