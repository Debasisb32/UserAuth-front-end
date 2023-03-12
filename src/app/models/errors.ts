export const Erros = {
  fname: [
    { type: 'required', message: 'First name is required' }
  ],
  lname: [
    { type: 'required', message: 'Last name is required' }
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Enter a valid email' },
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'pattern', message: 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )' }
  ],
  oldPassword: [
    { type: 'required', message: 'Old password is required' },
    { type: 'pattern', message: 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )' }
  ],
  newPassword: [
    { type: 'required', message: 'New password is required' },
    { type: 'pattern', message: 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )' }
  ],
  cnfPassword: [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'pattern', message: 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )' },
    { type: 'notEqual', message: 'Confirm password mismatch' }
  ],
  dob: [
    { type: 'required', message: 'Date of birth is required' },

  ],

};
