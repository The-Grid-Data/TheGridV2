import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';
import { DocumentNode, Kind, visit } from 'graphql';
import type { Types } from '@graphql-codegen/plugin-helpers';

config();

const codegenConfig: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  ignoreNoDocuments: true,
  documents: [
    'lib/**/*.graphql.ts',
    '{app,components}/**/*.{tsx,ts}',
    '!lib/graphql/generated/**/*'
  ],
  config: {
    skipDocumentsValidation: {
      ignoreRules: ['MaxIntrospectionDepthRule']
    }
  },
  generates: {
    'lib/graphql/generated/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    },
    'lib/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        dedupeFragments: true,
        extractAllFieldsToTypes: true,
        experimentalFragmentVariables: true,
        allowUndefinedQueryVariables: true,
        strictScalars: true,
        scalars: {
          Date: {
            input: 'string',
            output: 'string'
          },
          Float64: {
            input: 'number',
            output: 'number'
          },
          Int8: {
            input: 'number',
            output: 'number'
          },
          Int64: {
            input: 'number',
            output: 'number'
          },
          String1: {
            input: 'string',
            output: 'string'
          },
          Float1: {
            input: 'number',
            output: 'number'
          },
          Int1: {
            input: 'number',
            output: 'number'
          }
        }
      }
    }
  },
  hooks: {
    afterOneFileWrite: ['prettier --write', 'echo']
  }
};

export default codegenConfig;
