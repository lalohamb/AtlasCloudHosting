export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Atlas Cloud Hosting",
    "description": "Scalable hosting for the modern web - from WordPress to Web3. Powered by DigitalOcean infrastructure.",
    "url": "https://atlascloud.hosting",
    "logo": "https://atlascloud.hosting/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@atlascloud.hosting",
      "contactType": "Customer Support",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com",
      "https://github.com",
      "https://twitter.com"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Prestige Holdings Enterprise Group"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Hosting",
    "provider": {
      "@type": "Organization",
      "name": "Atlas Cloud Hosting"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hosting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "WordPress Hosting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web3 Infrastructure Hosting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Cloud Solutions"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in all plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All plans include free SSL certificates, DDoS protection, automated daily backups, 99.9% uptime guarantee, and access to our customer support team."
        }
      },
      {
        "@type": "Question",
        "name": "Can I upgrade or downgrade my plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges or credits."
        }
      },
      {
        "@type": "Question",
        "name": "What is Web3 hosting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Web3 hosting includes infrastructure for blockchain applications, smart contracts, decentralized apps (dApps), and API services. We provide DigitalOcean-powered servers optimized for blockchain nodes and Web3 technologies."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
