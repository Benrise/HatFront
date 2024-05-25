import * as yup from 'yup';

export const formSchema = yup.object().shape({
    team: yup.number().required(),
    message: yup.string().max(500).nullable(),
    specialization_i_ds: yup.array().nullable(),
});

