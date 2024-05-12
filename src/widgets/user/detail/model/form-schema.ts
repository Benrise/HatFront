
const contactsSchema = {
  "contacts.vk_url": 'url|max:100',
  "contacts.github_url": 'url|max:100',
  "contacts.telegram": 'telegram|max:100',
  "contacts.email": 'email|max:100',
}

const educationSchema = {
  "education[0].study_place": 'min:2|max:100',
  "education[0].education_program": 'min:2|max:100',
  "education[0].course": 'max_value:7|min_value:1',
}

export const formSchema = {
  first_name: 'required|min:2|max:100',
  second_name: 'required|min:2|max:100',
  patronymic: 'max:100',
  age: 'required|min:1|max:3|max_value:100|min_value:14',
  about: 'max:1000',
  city: 'min:2|max:50',
  ...contactsSchema,
  ...educationSchema
};