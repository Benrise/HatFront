import * as yup from 'yup';

export const formSchema = yup.object().shape({
    specializations: yup.array().nullable(),
});

