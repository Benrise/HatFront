import * as yup from 'yup';

export const formSchema = yup.object().shape({
    message: yup.string().max(500).nullable(),
    specialization_ids: yup.array().nullable(),
});
