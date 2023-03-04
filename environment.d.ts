declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      NEXTAUTH_SECRET: string;
      STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    }
  }
}

export {};
