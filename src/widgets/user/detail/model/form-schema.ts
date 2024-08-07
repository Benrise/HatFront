import * as yup from 'yup';

const contactsSchema = yup.object().shape({
  vk_url: yup.string().url().max(100).nullable(),
  github_url: yup.string().url().max(100).nullable(),
  telegram: yup.string().max(100).matches(/.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/, 'Некорректный логин Telegram').nullable(),
  email: yup.string().email().max(100).nullable(),
});

const educationSchema = yup.object().shape({
  study_place: yup.string().min(2).max(100).required(),
  education_program: yup.string().min(2).max(100).required(),
  course: yup.number().min(1).max(7).integer().default(1).nullable(),
  class: yup.number().min(1).max(11).integer().default(1).nullable()
});

export const formSchema = yup.object().shape({
  first_name: yup.string().required().min(2).max(100),
  second_name: yup.string().required().min(2).max(100),
  patronymic: yup.string().max(100).nullable(),
  age: yup.number().required().min(14).max(100),
  about: yup.string().max(1000).nullable(),
  city: yup.string().min(2).max(50),
  contacts: contactsSchema,
  education: yup.array().of(educationSchema),
});