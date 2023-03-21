
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfb0zgvs2e8l01ue9ivv1on7/master",
  documents: "graphql/*.graphql",
  generates: {
    "generated/graphql.tsx": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
