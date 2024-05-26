import * as yup from 'yup';

export const setFormLocale = () => {
    yup.setLocale({
        mixed: {
          default: 'Неправильное значение',
          required: 'Обязательное поле',
          oneOf: 'Значение должно быть одним из перечисленных',
          notNull: 'Некорректное значение',
          notType: 'Некорректное значение',
        },
        string: {
          email: 'Некорректный формат почты',
          url: 'Некорректный URL',
          max: ({ max }) => 'Превышено максимальное количество символов: ' + max,
          min: ({ min }) => 'Минимальное количество символов: ' + min,
        },
        number: {
          min: ({ min }) => 'Минимальное значение: ' + min,
          max: ({ max }) => 'Максимальное значение: ' + max,
          integer: 'Значение должно быть целым числом',
          positive: 'Значение должно быть положительным числом',
          negative: 'Значение должно быть отрицательным числом',
        },
        tuple: {
          notType: 'Некорректное значение',
        }
      });
}