import { IBuyer } from '../../types/index';

type ValidationErrors = Partial<Record<keyof IBuyer, string>>

export class Customer {

    private data: IBuyer;

    constructor() {
        this.data = {
            payment: '',
            address: '',
            phone: '',
            email: '',
        };
    }


    setData(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data }
    }

    getData(): IBuyer {
        return {...this.data}
    }

    clear(): void {
        this.data = {
                payment: '',
                address: '',
                phone: '',
                email: '',
            };
    }

    validate(): ValidationErrors {
        const errors: ValidationErrors = {};
        
        if (!this.data.payment) {
                errors.payment = 'Не выбран способ оплаты';
            }
            if (!this.data.address) {
                errors.address = 'Адрес не может быть пустым';
            }
            if (!this.data.phone) {
                errors.phone = 'Телефон не может быть пустым';
            }
            if (!this.data.email) {
                errors.email = 'Email не может быть пустым';
            }

            return errors;
    }


}