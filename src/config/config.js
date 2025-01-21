export const config = {
  url: {
    ASSET_URL: import.meta.env.VITE_ASSET_URL,
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
    STRIPE_TOKEN_URL: import.meta.env.VITE_STRIPE_TOKEN_URL,
  },
  key: {
    PUBLISHABLE_KEY: import.meta.env.VITE_PUBLISHABLE_KEY,
  },
  card: {
    percentage: parseFloat(import.meta.env.VITE_STRIPE_CARD_FEE_PERCENTAGE),
    fixed: parseFloat(import.meta.env.VITE_STRIPE_CARD_FEE_FIXED),
  },
  bank: {
    percentage: parseFloat(import.meta.env.VITE_STRIPE_BANK_FEE_PERCENTAGE),
    fixed: parseFloat(import.meta.env.VITE_STRIPE_BANK_FEE_FIXED),
  },
};
