/**
 * The Rachna Labs family of apps. Edit names, copy and statuses here and the hero,
 * the apps section, the footer, the contact form and the
 * structured data all update.
 *
 * `tint` is the app icon's gradient on this website, not its in-app brand, which lives in
 * `rachna-kit/tokens/brands/<key>.json`.
 */

export type ProductStatus = 'Live' | 'Beta' | 'In development' | 'Coming soon';

export interface Product {
  key: string;
  name: string;
  /** What the product is about, in Hindi (Devanagari). */
  hindi: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  status: ProductStatus;
  /** Where people can get it. Shown as the call to action once the status is Live. */
  url: string;
  urlLabel: string;
  platforms: string;
  /** The app icon's gradient on this website (top-left to bottom-right). */
  tint: [string, string];
  /** schema.org applicationCategory used in structured data. */
  schemaCategory: string;
}

export const products: Product[] = [
  {
    key: 'plate',
    name: 'Plate',
    hindi: 'भोजन',
    category: 'Food',
    tagline: 'Log meals the Indian way',
    description:
      'Search 23,000+ foods in Hindi or English and log them by katori, roti or grams. Every number comes from a named source. Free, with no ads.',
    features: ['Katori & roti portions', 'Hindi or English search', 'Food data API for other apps'],
    status: 'In development',
    url: '',
    urlLabel: '',
    platforms: 'Web first, then iPhone & Android',
    tint: ['#2BB47C', '#0E7350'],
    schemaCategory: 'HealthApplication',
  },
  {
    key: 'grokul',
    name: 'Grokul',
    hindi: 'शिक्षा',
    category: 'Education',
    tagline: 'Learning, the gurukul way',
    description: 'A calm place to learn, built for how Indian students actually study. More soon.',
    features: ['Native on iPhone & Android', 'Made for Indian learners'],
    status: 'Coming soon',
    url: '',
    urlLabel: '',
    platforms: 'iPhone & Android',
    tint: ['#6676E0', '#2E3C93'],
    schemaCategory: 'EducationalApplication',
  },
  {
    key: 'beside',
    name: 'Beside',
    hindi: 'सुरक्षा',
    category: 'Safety',
    tagline: 'Someone always beside you',
    description: 'Let the people you trust know where you are, and reach them in one tap when it matters, from your phone or your watch.',
    features: ['Location with people you trust', 'One-tap SOS', 'Works from your watch'],
    status: 'Coming soon',
    url: '',
    urlLabel: '',
    platforms: 'iPhone, Android & watch',
    tint: ['#2CC0B2', '#0B6E6D'],
    schemaCategory: 'LifestyleApplication',
  },
  {
    key: 'paid',
    name: 'Paid',
    hindi: 'पैसा',
    category: 'Finance',
    tagline: 'Your rupees, clearly',
    description: 'See where your money goes, plan your month and save a little more, like a gullak that does the maths for you.',
    features: ['Spending at a glance', 'Monthly budgets', 'Made for ₹'],
    status: 'In development',
    url: '',
    urlLabel: '',
    platforms: 'iPhone & Android',
    tint: ['#F6C445', '#D98E0B'],
    schemaCategory: 'FinanceApplication',
  },
  {
    key: 'paparazi',
    name: 'Paparazi',
    hindi: 'प्रचार',
    category: 'Marketing',
    tagline: 'Get your business seen',
    description: 'Marketing made simple for small businesses and the people who run them. More soon.',
    features: ['For small businesses', 'Native on iPhone & Android'],
    status: 'Coming soon',
    url: '',
    urlLabel: '',
    platforms: 'iPhone & Android',
    tint: ['#EE5A8F', '#B0154F'],
    schemaCategory: 'BusinessApplication',
  },
  {
    key: 'sakhi',
    name: 'Sakhi',
    hindi: 'सखी',
    category: "Women's health",
    tagline: 'A gentle menstrual companion',
    description: 'Track your cycle, see what is coming and note how you feel, in a companion made with Indian women in mind.',
    features: ['Period predictions', 'Symptoms, mood & sleep', 'Works offline'],
    status: 'Live',
    url: 'https://apps.apple.com/app/id6747256551',
    urlLabel: 'Get it on the App Store',
    platforms: 'iPhone',
    tint: ['#F0609A', '#D1336F'],
    schemaCategory: 'HealthApplication',
  },
];

export const statusLabel: Record<ProductStatus, string> = {
  Live: 'Live',
  Beta: 'Beta',
  'In development': 'Being built',
  'Coming soon': 'Coming soon',
};

export function productCta(product: Product) {
  if (product.status === 'Live' && product.url) {
    return { label: product.urlLabel || `Open ${product.name}`, href: product.url, external: true };
  }
  return { label: 'Tell me when it’s ready', href: '/#contact', external: false };
}
