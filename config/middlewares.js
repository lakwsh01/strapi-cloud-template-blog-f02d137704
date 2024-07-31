module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            env('CDN_URL')?.replace('https://', 'http://'),
            `${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            env('CDN_URL')?.replace('https://', 'http://'),
            `${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::route',
  'global::action'
];
