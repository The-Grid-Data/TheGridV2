export const siteConfig = {
  pageTitle: 'The Grid | Data Explorer',
  verifiedTagId: '7',
  logoSrc: {
    dark: '/thegrid-logo-white.svg',
    light: '/thegrid-logo.svg'
  },
  pageDescription:
    'Powering Discoverability of Assets, Products, and Services in Web3.',
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
