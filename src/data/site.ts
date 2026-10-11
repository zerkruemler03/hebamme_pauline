/**
 * Zentrale Konfiguration für Kontaktdaten und externe Links.
 */

export const site = {
  url: 'https://hebamme-pauline.de',

  instagramHandle: 'hebamme_pauline_salva',
  get instagramUrl() {
    return `https://www.instagram.com/${this.instagramHandle}/`;
  },

  whatsappNumber: '491738023998',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}`;
  },

  mapsUrl: 'https://maps.app.goo.gl/ceBU67CEquMznWVX7',

  contact: {
    name: 'Pauline Salva',
    role: 'Hebamme',
    street: 'Freiligrathstraße 13',
    zip: '04610',
    city: 'Meuselwitz',
    country: 'Deutschland',
    email: 'paulinesalva2@gmail.com',
    phone: '0173 8023998',
    get phoneLink() {
      return '+491738023998';
    },
  },

  /**
   * Zustaendige Aufsichtsbehoerde (Pflichtangabe fuer Heilberufe im Impressum).
   * Quelle: gezielte Recherche "Gesundheitsamt Meuselwitz" (Stand 2026-10).
   */
  supervisoryAuthority: {
    name: 'Gesundheitsamt Altenburger Land (Fachdienst Gesundheit des Landratsamtes)',
    street: 'Lindenaustraße 31',
    zip: '04600',
    city: 'Altenburg',
    phone: '+49 3447 586-822',
    email: 'gesundheit@altenburgerland.de',
  },
} as const;
