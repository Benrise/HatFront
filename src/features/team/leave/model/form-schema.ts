import * as yup from 'yup';

export const formSchema = yup.object().shape({
    user_id: yup.number().required(),
});

