import { IContactsForm, IContactsFormActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

/**
 * Форма контактов: email и телефон покупателя.
 * Наследует `Form<IContactsForm>`.
 */
export class ContactsForm extends Form<IContactsForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, protected actions: IContactsFormActions) {
        super(container);

        // Находим элементы разметки
        this.emailInput = ensureElement<HTMLInputElement>(
            'input[name="email"]',
            this.container
        );

        this.phoneInput = ensureElement<HTMLInputElement>(
            'input[name="phone"]',
            this.container
        );

        // Слушатели — один раз в конструкторе

        // Ввод email
        this.emailInput.addEventListener('input', () => {
            this.actions.onEmailChange(this.emailInput.value);
        });

        // Ввод телефона
        this.phoneInput.addEventListener('input', () => {
            this.actions.onPhoneChange(this.phoneInput.value);
        });

        // Отправка формы
        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.actions.onSubmit();
        });
    }

    /** Устанавливает email покупателя */
    set email(value: string) {
        this.emailInput.value = value;
    }

    /** Устанавливает телефон покупателя */
    set phone(value: string) {
        this.phoneInput.value = value;
    }
}