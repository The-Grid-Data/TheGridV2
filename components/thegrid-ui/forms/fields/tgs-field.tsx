'use client';

import { DatePicker } from '@/components/ui/date-picker';
import { FileUpload } from '@/components/ui/file-upload';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { uploadToS3 } from '@/lib/s3-upload';
import { getTgsData, TgsFieldNames } from '@/lib/tgs';
import { useState } from 'react';
import { SelectField } from './select-field';

type TgsSFieldProps = {
  label: string;
  placeholder?: string;
  tgsField: TgsFieldNames;
  fieldName?: string;
  isRequired?: boolean;
};

export function TgsField({
  label,
  placeholder,
  tgsField,
  fieldName,
  isRequired = false
}: TgsSFieldProps) {
  const tgsData = getTgsData(tgsField);
  const [isUploading, setIsUploading] = useState(false);

  if (tgsData.isDataValid === false) {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormMessage>
          There was an error loading the form field for {tgsField}
        </FormMessage>
        <pre>
          <FormMessage>{tgsData.errorMessage}</FormMessage>
        </pre>
      </FormItem>
    );
  }

  const isToggle = tgsData.parameter_id.includes('.is');
  const isEnum = !isToggle && tgsData.is_enum === 'true';
  const isTextArea = tgsData.parameter_id.toLowerCase().includes('description');
  const isDate = tgsData.parameter_id.toLowerCase().includes('date');
  const isImage = tgsData.parameter_id.toLowerCase().includes('logo') ||
                 tgsData.parameter_id.toLowerCase().includes('icon') ||
                 tgsData.parameter_id.toLowerCase().includes('image') ||
                 tgsData.parameter_id.toLowerCase().includes('avatar');
  const isText = !isEnum && !isDate && !isTextArea && !isToggle && !isImage;

  if (tgsData.isDataValid === true) {
    return (
      <>
        {isEnum && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <SelectField
                  {...field}
                  defaultValue={field.value}
                  placeholder={placeholder}
                  onChange={field.onChange}
                  value={field.value}
                  error={fieldState.error?.message}
                  options={tgsData.possible_values.map(value => ({
                    id: value.id,
                    label: value.name,
                    value: value.id
                  }))}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isText && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <Input
                  placeholder={placeholder}
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isTextArea && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <Textarea
                  placeholder={placeholder}
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isToggle && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <div className="flex flex-row gap-2 pt-2 h-9">
                  <Switch
                    checked={field.value === 'true'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'true' : 'false')}
                  />
                  <span className="text-sm text-muted-foreground">
                    {field.value === 'true' ? 'Yes' : 'No'}
                  </span>
                </div>
              </FieldWrapper>
            )}
          />
        )}

        {isImage && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field }) => {
              const handleFileChange = async (file: File) => {
                try {
                  setIsUploading(true);
                  const url = await uploadToS3(file, 'images');
                  field.onChange(url);
                } catch (error) {
                  console.error('Error uploading file:', error);
                } finally {
                  setIsUploading(false);
                }
              };

              return (
                <FieldWrapper
                  label={label}
                  description={tgsData.description}
                  isRequired={isRequired}
                >
                  <FileUpload
                    value={field.value}
                    onChange={handleFileChange as any}
                    isUploading={isUploading}
                  />
                </FieldWrapper>
              );
            }}
          />
        )}

        {isDate && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <DatePicker
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}

      </>
    );
  }

  return null;
}

const FieldWrapper = ({
  children,
  label,
  description,
  isRequired
}: {
  children: React.ReactNode;
  label: string;
  description: string;
  isRequired?: boolean;
}) => {
  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired && <span className="ml-1 text-destructive">*</span>}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
      <FormDescription>{description}</FormDescription>
    </FormItem>
  );
};
