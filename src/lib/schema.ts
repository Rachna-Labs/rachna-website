import { site, hasAddress, socialLinks } from '../config/site';

type Schema = Record<string, unknown>;

/** Organization + WebSite graph shared by every page. */
export function baseSchemas(siteUrl: URL): Schema[] {
  const url = siteUrl.href;

  const organization: Schema = {
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/icon-512.png', siteUrl).href,
      width: 512,
      height: 512,
    },
    image: new URL('/og-image.png', siteUrl).href,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    alternateName: 'रचना',
    knowsAbout: [
      'Mobile applications',
      'Design systems',
      'Food and nutrition software',
      'Education software',
      'Personal safety software',
      'Personal finance software',
      'Product design',
    ],
    member: site.partners.map((p) => ({
      '@type': 'Person',
      name: p.name,
      jobTitle: p.role,
      ...(p.linkedin && { sameAs: [p.linkedin] }),
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        ...(site.phone && { telephone: site.phone }),
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  };

  if (site.phone) organization.telephone = site.phone;
  if (site.foundingYear) organization.foundingDate = site.foundingYear;
  if (site.gstin) organization.taxID = site.gstin;
  if (site.llpin) {
    organization.identifier = { '@type': 'PropertyValue', propertyID: 'LLPIN', value: site.llpin };
  }
  if (hasAddress) {
    organization.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'IN',
    };
  }
  if (socialLinks.length) organization.sameAs = socialLinks.map((s) => s.href);

  const website: Schema = {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    inLanguage: site.lang,
    publisher: { '@id': `${url}#organization` },
  };

  return [organization, website];
}

export function webPageSchema(siteUrl: URL, pageUrl: string, name: string, description: string): Schema {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: site.lang,
    isPartOf: { '@id': `${siteUrl.href}#website` },
    about: { '@id': `${siteUrl.href}#organization` },
  };
}

/** The product portfolio as an ItemList of SoftwareApplication entries. */
export function productsSchema(
  siteUrl: URL,
  products: { key: string; name: string; tagline: string; description: string; schemaCategory: string; platforms: string; url: string }[],
): Schema {
  return {
    '@type': 'ItemList',
    name: `${site.name} products`,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.name,
        alternateName: p.tagline,
        description: p.description,
        applicationCategory: p.schemaCategory,
        operatingSystem: p.platforms,
        url: p.url || `${siteUrl.href}#app-${p.key}`,
        publisher: { '@id': `${siteUrl.href}#organization` },
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Schema {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Schema {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
