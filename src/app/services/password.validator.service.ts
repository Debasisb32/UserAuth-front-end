import { FormGroup } from '@angular/forms';

export function PasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ notEqual: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
