import * as yup from 'yup';

export const formSchema = yup.object().shape({
    specialization_ids: yup.array().nullable(),
    user_id: yup.number().required(),
});

