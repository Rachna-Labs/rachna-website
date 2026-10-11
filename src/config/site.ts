/**
 * Company details used across the website, SEO tags, structured data and legal pages.
 *
 * Empty strings are hidden automatically. Fill them in (LLPIN, registered office,
 * phone, GSTIN, social links) and they appear everywhere they are relevant.
 *
 * The public domain lives in `astro.config.mjs` (`site`), so canonical URLs,
 * the sitemap and robots.txt always agree. Products live in `src/data/products.ts`.
 */

export interface Partner {
  name: string;
  role: string;
  linkedin: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  entityType: string;
  tagline: string;
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  lang: string;
  themeColor: string;
  email: string;
  phone: string;
  llpin: string;
  gstin: string;
  foundingYear: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  partners: Partner[];
  grievanceOfficer: { name: string; designation: string; email: string };
  socials: { linkedin: string; x: string; github: string; instagram: string };
  /** Google Search Console HTML-tag verification token (optional). */
  googleSiteVerification: string;

  /** Optional form backend URL (e.g. Formspree, Web3Forms). When empty, the contact form opens the visitor's email app. */
  contactFormEndpoint: string;
  legalLastUpdated: string;
}

export const site: SiteConfig = {
  name: 'Rachna Labs',
  legalName: 'Rachna Softech LLP',
  entityType: 'Limited Liability Partnership',
  tagline: 'Technology, crafted around people.',
  title: 'Rachna Labs (रचना) | Everyday apps, made in India',
  description:
    'Rachna Labs (रचना) makes calm, useful apps for Indian homes: Plate for food, Grokul for learning, Beside for safety, Paid for money, Paparazi for small businesses and Sakhi for women’s health. One design language, built natively for iPhone, Android and the web.',
  keywords: [
    'Rachna Labs',
    'रचना',
    'Rachna Softech LLP',
    'Indian app company',
    'made in India apps',
    'Plate food logging app India',
    'Sakhi menstrual companion',
    'Paid finance app',
    'Beside safety app',
    'Grokul education app',
    'Paparazi marketing app',
  ],
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#FBF3E6',

  email: 'hello@rachnalabs.com',
  phone: '',
  llpin: '',
  gstin: '',
  foundingYear: '',
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'India',
  },

  partners: [
    { name: 'Karan Kumar', role: 'Designated Partner', linkedin: '' },
    { name: 'Dhirendra Kumar Singh', role: 'Designated Partner', linkedin: '' },
  ],

  grievanceOfficer: {
    name: 'Karan Kumar',
    designation: 'Designated Partner',
    email: 'hello@rachnalabs.com',
  },

  socials: {
    linkedin: '',
    x: '',
    github: '',
    instagram: '',
  },

  googleSiteVerification: '',

  contactFormEndpoint: '',

  legalLastUpdated: '13 September 2026',
};

const a = site.address;

export const hasAddress = Boolean(a.street || a.city);

export const fullAddress = [a.street, a.city, [a.region, a.postalCode].filter(Boolean).join(' '), a.country]
  .filter(Boolean)
  .join(', ');

export const socialLinks = (
  [
    ['LinkedIn', site.socials.linkedin],
    ['X', site.socials.x],
    ['GitHub', site.socials.github],
    ['Instagram', site.socials.instagram],
  ] as const
)
  .filter(([, href]) => href)
  .map(([label, href]) => ({ label, href }));

export const nav = [
  { label: 'Mission', href: '/#mission' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Ecosystem', href: '/#ecosystem' },
  { label: 'Apps', href: '/#apps' },
  { label: 'FAQ', href: '/#faq' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Use', href: '/terms/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' },
  { label: 'Refund & Cancellation', href: '/refund-policy/' },
];
