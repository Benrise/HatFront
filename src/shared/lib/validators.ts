import { defineRule } from 'vee-validate';

function isTrue(value: string | number | boolean) {
    return value && (typeof value !== 'string' || value.trim().length > 0);
}

const setup = (): void => {
    defineRule('email', (value: string) => {
        if (!value || !value.length) {
            return true;
        }
    
        if (!/^([\w.-]+)@([\w-]+)((((\.){1}((\w)+))+)+)$/.test(value)) {
            return 'Некорректный формат почты';
        }
    
        return true;
    });
    
    defineRule('required', (value: string | number | boolean) => {
        if (!isTrue(value)) {
            return 'Обязательное поле';
        }
    
        return true;
    });
    
    defineRule('min', (value: string, [limit]: number[]) => {
        if (!value || !value.length) {
          return true;
        }
    
        if (value.length < limit) {
          return 'Минимальное количество символов: ' + limit;
        }
    
        return true;
      });
    
    defineRule('max', (value: string, [limit]: number[]) => {
        if (!value || !value.length) {
            return true;
        }
    
        if (value.length > limit) {
            return 'Превышено максимальное количество символов: ' + limit;
        }
    
        return true;
    });
    
    defineRule('match', (value: string, [target]: string[]) => {
        if (value !== target) {
          return 'Поля не совпадают';
        }
    
        return true;
    });

    defineRule('min_value', (value: number, [limit]: number[]) => {
        if (value < limit) {
            return 'Минимальное значение: ' + limit;
        }
    
        return true;
    })

    defineRule('max_value', (value: number, [limit]: number[]) => {
        if (value > limit) {
            return 'Максимальное значение: ' + limit;
        }
    
        return true;
    })

    defineRule('url', (value: string) => {
        if (!value || !value.length) {
            return true;
        }
    
        if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)) {
            return 'Некорректный URL';
        }

        return true;
    })

    defineRule('telegram', (value: string) => {
        if (!value || !value.length) {
            return true;
        }
    
        if (!/.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/.test(value)) {
            return 'Некорректный логин Telegram';
        }

        return true;
    })
}

export default setup