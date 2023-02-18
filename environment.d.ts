declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      NEXTAUTH_SECRET: string;
    }
  }
}

export {};
