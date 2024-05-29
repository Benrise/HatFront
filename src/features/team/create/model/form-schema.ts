import * as yup from 'yup';

export const formSchema = yup.object().shape({
    case_id: yup.string().required('Необходимо выбрать кейс'),
    description: yup.string().max(500).nullable(),
    is_visible: yup.boolean().required(),
    name: yup.string().required().max(100),
    url_group: yup.string().max(100).nullable().url(),
});

