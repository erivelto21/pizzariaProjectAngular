import { ValidatorFn, FormGroup } from '@angular/forms';

export function equalFieldValueValidator(field1Name: string, field2Name: string): ValidatorFn {
    return (formGroup: FormGroup): {[key: string]: any} => {
        const firstField = formGroup.controls[field1Name];
        const secondField = formGroup.controls[field2Name];

        if (firstField.touched && secondField.touched) {
            const isMatch = firstField.value === secondField.value;

            if (!isMatch && firstField.valid && secondField.valid) {
                firstField.setErrors({equalValue: field1Name});
                secondField.setErrors({equalValue: field2Name});

                const message = firstField + ' != ' + secondField;

                return {equalValue: message};
            }
            if (isMatch && secondField.hasError('equalValue')) {
                firstField.setErrors(null);
                secondField.setErrors(null);
            }
        }

        return null;
    };
}
