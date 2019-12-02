import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(),
});

export default schema;
