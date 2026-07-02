import { SITE, SITE_LOGO_URL } from './site';
import { ORGANIZATION_SOCIAL_IMAGE } from './social-images';

function organizationLogo() {
  return {
    '@type': 'ImageObject',
    url: SITE_LOGO_URL,
    contentUrl: SITE_LOGO_URL,
    width: 256,
    height: 300,
    caption: 'Zadeyo',
  };
}

function socialImageObject(src: string, alt: string, width?: number, height?: number) {
  return {
    '@type': 'ImageObject',
    url: src,
    contentUrl: src,
    ...(alt ? { caption: alt, name: alt } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}

function publisherOrganization() {
  return {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: organizationLogo(),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: ['Arc Raiders Cheats', 'ArcRaidersCheats.co', 'Arc Raiders Hack', 'Arc Raiders ESP'],
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale.replace('_', '-'),
    image: socialImageObject(
      ORGANIZATION_SOCIAL_IMAGE.src,
      ORGANIZATION_SOCIAL_IMAGE.alt,
      ORGANIZATION_SOCIAL_IMAGE.width,
      ORGANIZATION_SOCIAL_IMAGE.height,
    ),
    publisher: publisherOrganization(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: ['Arc Raiders Cheats', 'ArcRaidersCheats.co'],
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    logo: organizationLogo(),
    image: socialImageObject(
      ORGANIZATION_SOCIAL_IMAGE.src,
      ORGANIZATION_SOCIAL_IMAGE.alt,
      ORGANIZATION_SOCIAL_IMAGE.width,
      ORGANIZATION_SOCIAL_IMAGE.height,
    ),
    sameAs: [SITE.url],
  };
}

export function webPageSchema(props: {
  name: string;
  description: string;
  url: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}) {
  const imageObject = socialImageObject(
    props.image,
    props.imageAlt ?? 'ARC Raiders gameplay screenshot',
    props.imageWidth,
    props.imageHeight,
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.name,
    description: props.description,
    url: props.url,
    image: imageObject,
    primaryImageOfPage: imageObject,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[], image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(image ? { image: socialImageObject(image, 'ARC Raiders gameplay screenshot') } : {}),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(props: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  imageAlt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    url: props.url,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    ...(props.image
      ? { image: [socialImageObject(props.image, props.imageAlt ?? props.title)] }
      : {}),
    author: {
      '@type': 'Person',
      name: props.author ?? SITE.author,
    },
    publisher: publisherOrganization(),
  };
}

export function blogPostingSchema(props: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    ...(props.image
      ? {
          image: [
            socialImageObject(props.image, props.imageAlt ?? props.title),
          ],
        }
      : {}),
    ...(props.keywords?.length ? { keywords: props.keywords.join(', ') } : {}),
    author: {
      '@type': 'Person',
      name: props.author ?? SITE.author,
    },
    publisher: publisherOrganization(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

export function collectionPageSchema(props: {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: props.title,
    description: props.description,
    url: props.url,
    ...(props.image
      ? {
          image: socialImageObject(props.image, props.imageAlt ?? props.title),
          primaryImageOfPage: socialImageObject(
            props.image,
            props.imageAlt ?? props.title,
          ),
        }
      : {}),
  };
}

export function contactPageSchema(image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Arc Raiders Cheats',
    url: `${SITE.url}/contact/`,
    description: 'Get in touch with the Arc Raiders Cheats team for support, product inquiries, and feedback.',
    ...(image ? { image: socialImageObject(image, 'ARC Raiders gameplay screenshot') } : {}),
  };
}

export function itemListSchema(
  items: { name: string; url: string; description: string }[],
  itemType: 'SoftwareApplication' | 'Product' = 'SoftwareApplication',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': itemType,
        name: item.name,
        url: item.url,
        description: item.description,
      },
    })),
  };
}

export function softwareApplicationSchema(props: {
  name: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  operatingSystem?: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: props.name,
    description: props.description,
    url: props.url,
    applicationCategory: props.category ?? 'GameApplication',
    applicationSubCategory: 'Game Enhancement Software',
    operatingSystem: props.operatingSystem ?? 'Windows 10, Windows 11',
    ...(props.image
      ? { image: socialImageObject(props.image, props.imageAlt ?? props.name) }
      : {}),
    ...(props.featureList?.length ? { featureList: props.featureList.join(', ') } : {}),
    offers: {
      '@type': 'Offer',
      url: props.url,
      availability: 'https://schema.org/InStock',
      seller: publisherOrganization(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1284',
      bestRating: '5',
      worstRating: '1',
    },
    provider: publisherOrganization(),
  };
}

/** Homepage aggregate SoftwareApplication representing the full Arc Raiders Cheats stack. */
export function homepageSoftwareApplicationSchema(image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Arc Raiders Cheats',
    alternateName: [
      'Arc Raiders Hack',
      'Arc Raiders ESP',
      'Arc Raiders Aimbot',
      'ArcRaidersCheats',
      'arcraiderscheats.co',
    ],
    url: SITE.url,
    applicationCategory: 'GameApplication',
    applicationSubCategory: 'Game Enhancement Software',
    operatingSystem: 'Windows 10, Windows 11',
    softwareVersion: '2026',
    releaseNotes:
      'Updated for the latest Arc Raiders patch. Fully external — safe against EAC. Includes Player ESP, Loot ESP, Drone ESP, Aimbot with bone targeting, 2D Radar Hack, Extraction Zone ESP, and HWID Spoofer.',
    ...(image ? { image: socialImageObject(image, 'Arc Raiders Cheats — ESP, Aimbot and Radar 2026') } : {}),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/buy/`,
      seller: publisherOrganization(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1284',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'The leading undetected external cheat for Arc Raiders. Player ESP, Loot ESP, and Drone ESP to see enemies and items through walls, bone-targeted Aimbot, 2D Radar Hack, Extraction Zone ESP, and HWID Spoofer. Fully external — no kernel injection — safe against Easy Anti-Cheat. Updated within hours of every game patch.',
    featureList:
      'Player ESP, Loot ESP, Drone ESP, Skeleton ESP, Health & Armor Bars, Distance Readout, Aimbot, Bone Targeting, Aim Smoothing, Custom FOV, 2D Radar Hack, Extraction Zone ESP, ARC Patrol ESP, Stream-Safe Mode, HWID Spoofer',
  };
}

export function productSchema(props: {
  name: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    url: props.url,
    ...(props.image
      ? { image: socialImageObject(props.image, props.imageAlt ?? props.name) }
      : {}),
    brand: publisherOrganization(),
    offers: {
      '@type': 'Offer',
      url: props.url,
      availability: 'https://schema.org/InStock',
      seller: publisherOrganization(),
    },
  };
}
