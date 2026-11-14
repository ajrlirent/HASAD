/**
 * Configuration centrale HASAD | حصاد
 * Développé par Soft Click Technologies.
 */
export interface SiteConfig {
  brandName: string;
  brandNameAr: string;
  developerName: string;
  tagline: string;
  country: string;
  downloads: {
    googlePlayUrl: string;
    appStoreUrl: string;
    comingSoonLabel: string;
  };
  contact: {
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    websiteDisplay: string;
    location: string;
  };
  socials: {
    linkedinUrl: string;
    facebookUrl: string;
    instagramUrl: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  brandName: "HASAD",
  brandNameAr: "حصاد",
  developerName: "Soft Click Technologies",
  tagline: "Votre terre. Vos machines. Votre récolte.",
  country: "Algérie",
  downloads: {
    // Serve the release APK from the site's public folder (public/hasad.apk).
    googlePlayUrl: "/hasad.apk",
    appStoreUrl: "",
    comingSoonLabel: "Bientôt disponible",
  },
  contact: {
    email: "contact@hasad.dz",
    phoneDisplay: "+213 (0) 793 67 04 00",
    phoneHref: "tel:+213793670400",
    websiteDisplay: "www.hasad.dz",
    location: "Alger, Algérie",
  },
  socials: {
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  },
};
