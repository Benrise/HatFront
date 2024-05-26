import * as yup from 'yup';

export const formSchema = yup.object().shape({
    team_id: yup.number().required(),
    message: yup.string().max(500).nullable(),
    specialization_ids: yup.array().nullable(),
});
