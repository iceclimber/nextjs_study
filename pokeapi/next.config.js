module.exports = {
  i18n: {
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt'
  },
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'PokeApi_Next.JS'
  },
}
