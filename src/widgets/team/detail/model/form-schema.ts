import * as yup from 'yup';

export const formSchema = yup.object({
    name: yup.string().required('Название команды обязательно'),
    url_group: yup.string().url('Некорректный URL').nullable(),
    description: yup.string().nullable(),
    user_count: yup.number().required('Количество участников обязательно'),
    specializations: yup.array().of(
      yup.object({
        id: yup.number().required(),
        current: yup.number().required().min(0).default(0),
        required: yup.number().required().min(1, 'Минимальное значение: 1'),
      })
    ).nullable(),
    is_visible: yup.boolean().required().default(true),
    is_full: yup.boolean().required().default(false),
  });
