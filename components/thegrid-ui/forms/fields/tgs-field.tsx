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
import { SingleCombobox } from '@/components/ui/single-combobox';
import { InfoIconTooltip } from '@/components/ui/info-icon';

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
  const isImage =
    tgsData.parameter_id.toLowerCase().includes('logo') ||
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
                isRequired={isRequired}
                infoTooltipText={tgsData.description}
              >
                <>
                  {field.value}
                  <SingleCombobox
                    {...field}
                    placeholder={placeholder}
                    onValueChange={field.onChange}
                    value={field.value}
                    error={fieldState.error?.message}
                    options={tgsData.possible_values
                      .map(value => ({
                        id: value.id,
                        label: value.name,
                        value: value.id,
                        description: value.definition
                      }))
                      .sort((a, b) => a.label.localeCompare(b.label))}
                  />
                </>
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
                isRequired={isRequired}
                infoTooltipText={tgsData.description}
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
                isRequired={isRequired}
                infoTooltipText={tgsData.description}
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
                isRequired={isRequired}
                infoTooltipText={tgsData.description}
              >
                <div className="flex h-9 flex-row gap-2 pt-2">
                  <Switch
                    checked={field.value === 'true'}
                    onCheckedChange={checked =>
                      field.onChange(checked ? 'true' : 'false')
                    }
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
                  isRequired={isRequired}
                  infoTooltipText={tgsData.description}
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
                isRequired={isRequired}
                infoTooltipText={tgsData.description}
              >
                <DatePicker error={fieldState.error?.message} {...field} />
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
  isRequired,
  infoTooltipText
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  isRequired?: boolean;
  infoTooltipText?: string;
}) => {
  return (
    <FormItem>
      <FormLabel className="flex flex-row gap-2">
        <div>
          {label}
          {isRequired && <span className="ml-1 text-destructive">*</span>}
        </div>
        {infoTooltipText && (
          <InfoIconTooltip delayDuration={100} text={infoTooltipText} />
        )}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
};
