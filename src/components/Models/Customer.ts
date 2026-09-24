import { IBuyer } from '../../types/index';
import { IEvents } from '../base/Events';

/** Ошибки валидации: ключ — поле покупателя, значение — текст ошибки */
type ValidationErrors = Partial<Record<keyof IBuyer, string>>

/**
 * Модель покупателя.
 * Хранит данные покупателя, валидирует и уведомляет об изменениях.
 */
export class Customer {

    private data: IBuyer;

    constructor(protected events: IEvents) {
        this.data = {
            payment: '',
            address: '',
            phone: '',
            email: '',
        };
    }

    /** Обновляет данные покупателя и эмитит `customer:changed` */
    setData(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data }
        this.events.emit('customer:changed');
    }

    /** Возвращает копию данных покупателя */
    getData(): IBuyer {
        return {...this.data}
    }

    /** Сбрасывает данные покупателя и эмитит `customer:changed` */
    clear(): void {
        this.data = {
            payment: '',
            address: '',
            phone: '',
            email: '',
        };
        this.events.emit('customer:changed');
    }

    /** Проверяет все поля и возвращает объект с ошибками */
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