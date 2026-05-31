const viteEnv = import.meta.env ?? {};

export const config = {
  strapiBaseUrl: viteEnv.VITE_STRAPI_URL ?? 'http://localhost:1337',
  fakeStoreBaseUrl: viteEnv.VITE_FAKE_STORE_URL ?? 'https://fakestoreapi.com',
};
