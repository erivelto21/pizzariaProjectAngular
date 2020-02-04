import { ValidatorFn, FormGroup } from '@angular/forms';

export function locationValidator(cityName: string, stateName: string): ValidatorFn {
    return (formGroup: FormGroup): {[key: string]: any} => {
        const city = formGroup.controls[cityName];
        const state = formGroup.controls[stateName];

        const result = city.value === 'Fortaleza' && state.value === 'CE';

        if (!result && city.valid && state.valid) {
            city.setErrors({location: cityName});
            state.setErrors({location: stateName});

            const message = 'Localização inválida';

            return {location: message};
        }
        if (result && city.hasError('location') && state.hasError('location')) {
            city.setErrors(null);
            state.setErrors(null);
        }

        return null;
    };
}
