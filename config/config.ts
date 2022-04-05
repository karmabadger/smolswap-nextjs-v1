interface IConfig {
  env: {
    BASE_ROUTE: string;

    TREASURE_MARKETPLACE_ADDRESS: string | null;

    // # those keys are public test keys, use real ones for real deployment
    INFURA_PROJECT_ID: string | null;
    INFURA_FORTMATIC_PROJECT_ID: string | null;

    SUPPORTED_CHAIN_NAME: string;
    SUPPORTED_CHAIN_ID: string;
    SUPPORTED_CHAIN_IDS: string;
    // # multiple urls can be used for backups, simply separate them with a comma
    RPC_URLS: string;
    BLOCK_EXPLORER_URLS: string;
    CHAIN_ICON_URLS: string;
    SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME: string;
    SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL: string;
    SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS: number;
  };

  parsedEnv: {
    BASE_ROUTE: string | null;

    TREASURE_MARKETPLACE_ADDRESS: string | null;

    // # those keys are public test keys, use real ones for real deployment
    INFURA_PROJECT_ID: string | null;
    INFURA_FORTMATIC_PROJECT_ID: string | null;

    SUPPORTED_CHAIN_NAME: string;
    SUPPORTED_CHAIN_ID: string;
    SUPPORTED_CHAIN_IDS: string;
    // # multiple urls can be used for backups, simply separate them with a comma
    RPC_URLS: string[];
    BLOCK_EXPLORER_URLS: string[];
    CHAIN_ICON_URLS: string[];
    SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME: string;
    SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL: string;
    SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS: number;
  };
}

const config: IConfig = {
  env: {
    BASE_ROUTE: process.env.NEXT_PUBLIC_BASE_ROUTE || "/",

    TREASURE_MARKETPLACE_ADDRESS:
      process.env.NEXT_PUBLIC_TREASURE_MARKETPLACE_ADDRESS || null,

    // # those keys are public test keys, use real ones for real deployment
    INFURA_PROJECT_ID: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || null,
    INFURA_FORTMATIC_PROJECT_ID:
      process.env.NEXT_PUBLIC_INFURA_FORTMATIC_PROJECT_ID || null,

    SUPPORTED_CHAIN_NAME: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NAME),
    SUPPORTED_CHAIN_IDS: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_IDS),
    SUPPORTED_CHAIN_ID: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID),
    // # multiple urls can be used for backups, simply separate them with a comma
    RPC_URLS: String(process.env.NEXT_PUBLIC_RPC_URLS),
    BLOCK_EXPLORER_URLS: String(process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URLS),
    CHAIN_ICON_URLS: String(process.env.NEXT_PUBLIC_CHAIN_ICON_URLS),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME: String(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME
    ),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL: String(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL
    ),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS: Number(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS
    ),
  },

  parsedEnv: {
    BASE_ROUTE: process.env.NEXT_PUBLIC_BASE_ROUTE || "/",

    TREASURE_MARKETPLACE_ADDRESS:
      process.env.NEXT_PUBLIC_TREASURE_MARKETPLACE_ADDRESS || null,

    // # those keys are public test keys, use real ones for real deployment
    INFURA_PROJECT_ID: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || null,
    INFURA_FORTMATIC_PROJECT_ID:
      process.env.NEXT_PUBLIC_INFURA_FORTMATIC_PROJECT_ID || null,

    SUPPORTED_CHAIN_NAME: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NAME),
    SUPPORTED_CHAIN_IDS: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_IDS),
    SUPPORTED_CHAIN_ID: String(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID),
    // # multiple urls can be used for backups, simply separate them with a comma
    RPC_URLS: String(process.env.NEXT_PUBLIC_RPC_URLS).split(","),
    BLOCK_EXPLORER_URLS: String(
      process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URLS
    ).split(","),
    CHAIN_ICON_URLS: String(process.env.NEXT_PUBLIC_CHAIN_ICON_URLS).split(","),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME: String(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_NAME
    ),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL: String(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_SYMBOL
    ),
    SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS: Number(
      process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_NATIVE_CURRENCY_DECIMALS
    ),
  },
};

export default config;
