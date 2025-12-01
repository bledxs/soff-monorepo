import React from 'react';

type JsonLdProps = {
  name?: string;
  description?: string;
  package?: string;
  data?: Record<string, unknown>;
};

export function JsonLd({ name, description, package: pkg, data }: JsonLdProps) {
  const schema = data || {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(pkg
      ? {
          installUrl: `https://www.npmjs.com/package/${pkg}`,
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
