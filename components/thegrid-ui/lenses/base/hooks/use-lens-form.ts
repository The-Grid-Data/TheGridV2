import { toast } from '@/components/ui/use-toast';
import { ApiError, ApiResponse } from '@/lib/rest-api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SchemaDefinition } from '../types';
import {
  generateDefaultValues,
  mapEntityToFormData,
  mapFormDataToEntity
} from '../utils';

interface BaseLensConfig<TEntity> {
  tableName: string;
  queryKey: string[];
  schema: SchemaDefinition;
  zodSchema: z.ZodType<any>;
  createMessage: string;
  updateMessage: string;
}

interface BaseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface CreateFormProps extends BaseFormProps {
  mode: 'create';
  rootId?: string;
}

interface EditFormProps<TEntity> extends BaseFormProps {
  mode: 'edit';
  entity?: TEntity;
}

type UseLensFormProps<TEntity> = (CreateFormProps | EditFormProps<TEntity>) & {
  config: BaseLensConfig<TEntity>;
  api: LensApi;
  entity?: TEntity;
  rootId?: string;
};

interface LensApi {
  create: (data: any) => Promise<ApiResponse>;
  update: (data: any) => Promise<ApiResponse>;
}

export function useLensForm<
  TFormData extends { [K: string]: Record<string, any> },
  TEntity extends { id?: string }
>({ mode, rootId, entity, onSuccess, config, api }: UseLensFormProps<TEntity>) {
  const queryClient = useQueryClient();

  const defaultValues = {
    [config.tableName]:
      mode === 'edit' && entity
        ? mapEntityToFormData(entity, config.schema)
        : generateDefaultValues(config.schema)
  };

  const form = useForm<TFormData>({
    resolver: zodResolver(config.zodSchema),
    defaultValues: defaultValues as unknown as DefaultValues<TFormData>,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const mutation = useMutation<ApiResponse, ApiError, TFormData>({
    mutationFn: async (data: TFormData) => {
      const entityData = mapFormDataToEntity<Partial<TEntity>>(
        data[config.tableName],
        config.schema
      );

      if (mode === 'create') {
        if (!rootId) {
          throw new Error('rootId is required when creating a new entity');
        }
        return api.create({ ...entityData, rootId });
      } else {
        if (!entity?.id) {
          throw new Error('entityId is required when editing an entity');
        }
        return api.update({
          id: entity.id,
          ...entityData
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: config.queryKey,
        exact: true,
        refetchType: 'all'
      });
      if (rootId) {
        queryClient.invalidateQueries({
          queryKey: ['validation-logs', rootId],
          exact: true,
          refetchType: 'all'
        });
      }

      toast({
        title: mode === 'create' ? 'Created!' : 'Updated!',
        description:
          mode === 'create' ? config.createMessage : config.updateMessage
      });
      onSuccess?.();
    }
  });

  return {
    form,
    isPending: mutation.isPending,
    error: mutation.error || undefined,
    onSubmit: mutation.mutate
  };
}
