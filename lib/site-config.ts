export const siteConfig = {
  pageTitle: 'The Grid | Management Portal',
  verifiedTagId: '7',
  logoSrc: {
    dark: '/thegrid-logo-white.svg',
    light: '/thegrid-logo.svg'
  },
  pageDescription:
    ' Take control of your profile data. Easily update, customize, and manage and manage your profile information all in one place.',
  displayQueries: true,
  allowHeroFiltersSearch: true,
  overrideFilterValues: {
    //overrideFilterValues: affects both the options list and the searchquery conditions
    productDeployedOn: [],
    supportsProducts: [],
    productTypes: [],
    productAssetRelationships: [],
    tags: [],
    productIds: []
  },
  overrideOptionsFilterValues: {
    //overrideOptionsFilterValues: only affects the options list for the filter
    productTypes: ['15', '16', '17']
  }
};
