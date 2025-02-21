'use client';

import { TgsField } from '@/components/thegrid-ui/forms/fields/tgs-field';
import { entityFields } from '../schema';

export function EntityFormFields() {
  return (
    <div className="flex flex-col gap-8">
      <TgsField
        label={entityFields.name.label}
        placeholder={entityFields.name.placeholder}
        tgsField={entityFields.name.tgsField}
        isRequired={entityFields.name.required}
      />
      <div className="flex flex-row gap-4 [&>*]:w-1/2">
        <TgsField
          label={entityFields.tradeName.label}
          placeholder={entityFields.tradeName.placeholder}
          tgsField={entityFields.tradeName.tgsField}
          isRequired={entityFields.tradeName.required}
        />
        <TgsField
          label={entityFields.entityType.label}
          placeholder={entityFields.entityType.placeholder}
          tgsField={entityFields.entityType.tgsField}
          isRequired={entityFields.entityType.required}
          fieldName="entities.entityType"
        />
      </div>
      <div className="flex flex-row gap-4 [&>*]:w-1/2">
        <TgsField
          label={entityFields.country.label}
          placeholder={entityFields.country.placeholder}
          tgsField={entityFields.country.tgsField}
          isRequired={entityFields.country.required}
        />
        <TgsField
          label={entityFields.address.label}
          placeholder={entityFields.address.placeholder}
          tgsField={entityFields.address.tgsField}
          isRequired={entityFields.address.required}
        />
      </div>
      <TgsField
        label={entityFields.dateOfIncorporation.label}
        placeholder={entityFields.dateOfIncorporation.placeholder}
        tgsField={entityFields.dateOfIncorporation.tgsField}
        isRequired={entityFields.dateOfIncorporation.required}
      />
      <div className="flex flex-row gap-4 [&>*]:w-1/2">
        <TgsField
          label={entityFields.taxIdentificationNumber.label}
          placeholder={entityFields.taxIdentificationNumber.placeholder}
          tgsField={entityFields.taxIdentificationNumber.tgsField}
          isRequired={entityFields.taxIdentificationNumber.required}
        />
        <TgsField
          label={entityFields.localRegistrationNumber.label}
          placeholder={entityFields.localRegistrationNumber.placeholder}
          tgsField={entityFields.localRegistrationNumber.tgsField}
          isRequired={entityFields.localRegistrationNumber.required}
        />
      </div>
      <TgsField
        label={entityFields.leiNumber.label}
        placeholder={entityFields.leiNumber.placeholder}
        tgsField={entityFields.leiNumber.tgsField}
        isRequired={entityFields.leiNumber.required}
      />
    </div>
  );
}
