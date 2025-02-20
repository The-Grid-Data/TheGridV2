'use client';

import { TgsField } from '@/components/thegrid-ui/forms/fields/tgs-field';
import { assetFields } from '../schema';

export function AssetFormFields() {
  return (
    <div className="flex flex-col gap-8">
      <TgsField
        label={assetFields.name.label}
        placeholder={assetFields.name.placeholder}
        tgsField={assetFields.name.tgsField}
        isRequired={assetFields.name.required}
      />
      <TgsField
        label={assetFields.ticker.label}
        placeholder={assetFields.ticker.placeholder}
        tgsField={assetFields.ticker.tgsField}
        isRequired={assetFields.ticker.required}
      />
      <div className="flex flex-row gap-4 [&>*]:w-1/2">
        <TgsField
          label={assetFields.assetType.label}
          placeholder={assetFields.assetType.placeholder}
          tgsField={assetFields.assetType.tgsField}
          isRequired={assetFields.assetType.required}
          fieldName="assets.assetType"
        />
        <TgsField
          label={assetFields.assetStatus.label}
          placeholder={assetFields.assetStatus.placeholder}
          tgsField={assetFields.assetStatus.tgsField}
          isRequired={assetFields.assetStatus.required}
        />
      </div>
      <TgsField
        label={assetFields.description.label}
        placeholder={assetFields.description.placeholder}
        tgsField={assetFields.description.tgsField}
        isRequired={assetFields.description.required}
        fieldName="assets.description"
      />
    </div>
  );
}
