'use client';

import { useClerkContext } from '@/providers/clerk-provider';

const API_ENDPOINT =
  'https://a2f6zzrqop62jwep7ehq53nn2m0rkwqq.lambda-url.eu-central-1.on.aws/';

export const DB_NAME = 'A';

// Convert all values to strings for API compatibility
export const convertToStrings = (
  obj: Record<string, any>
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      result[key] = '';
    } else {
      result[key] = String(value);
    }
  }
  return result;
};

export interface ApiOperationResult {
  success: boolean;
  error?: string;
  create?: {
    created_records: string[];
  };
  update?: Record<string, never>;
  delete?: Record<string, never>;
  table_name: string;
  db_name: string;
}

export interface ApiResponse {
  results: ApiOperationResult[];
  dry_run: boolean;
  do_not_notify_on_edit: boolean;
}

export interface RestClient {
  create: <T extends Record<string, any>>(
    tableName: string,
    data: T
  ) => Promise<ApiResponse>;
  update: <T extends Record<string, any>>(
    tableName: string,
    id: string,
    data: T
  ) => Promise<ApiResponse>;
  delete: (tableName: string, id: string) => Promise<ApiResponse>;
}

type UserMetadata = {
  user_id: string;
  email: string;
  api_key: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public operation?: ApiOperationResult,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const getUserFriendlyMessage = (error: string): string => {
  // Foreign key constraint errors
  if (error.includes('foreign key constraint fails')) {
    return 'This record cannot be created or updated because it references invalid data';
  }

  // Duplicate entry errors
  if (error.includes('Duplicate entry')) {
    return 'A record with this information already exists';
  }

  // Default messages for common operations
  if (error.includes('failed to insert')) {
    return 'Failed to create the record';
  }
  if (error.includes('failed to update')) {
    return 'Failed to update the record';
  }
  if (error.includes('failed to delete')) {
    return 'Failed to delete the record';
  }

  // Default fallback
  return 'An error occurred while processing your request';
};

export const createRestApiClient = (
  getToken: () => Promise<string>
): RestClient => {
  const executeRequest = async (operations: any[]): Promise<ApiResponse> => {
    const token = await getToken();
    const fullPayload = {
      command: 'retool_backend_go/db.crud.direct',
      batch: {
        dry_run: false,
        operations
      }
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(fullPayload)
    });

    const data = await response.json();

    // Check for operation-level errors
    if (data.results?.[0] && !data.results[0].success) {
      const technicalError = data.results[0].error || 'Operation failed';
      throw new ApiError(
        technicalError,
        response.status,
        data.results[0],
        getUserFriendlyMessage(technicalError)
      );
    }

    // Check for HTTP-level errors
    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        undefined,
        'The server is temporarily unavailable. Please try again later.'
      );
    }

    return data;
  };

  const create = async <T extends Record<string, any>>(
    tableName: string,
    data: T
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      create: {
        list_of_values: [convertToStrings(data)]
      }
    };

    return executeRequest([operation]);
  };

  const update = async <T extends Record<string, any>>(
    tableName: string,
    id: string,
    data: T
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      update: {
        record_id_to_values: {
          [id]: convertToStrings(data)
        }
      }
    };

    return executeRequest([operation]);
  };

  const remove = async (
    tableName: string,
    id: string
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      delete: {
        record_ids_to_delete_list: [id]
      }
    };

    return executeRequest([operation]);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useRestApiClient = () => {
  const { getToken } = useClerkContext();
  return createRestApiClient(getToken);
};
