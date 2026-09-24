import { IFormData } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

/**
 * Абстрактный базовый класс для всех форм приложения.
 * Содержит общие поля (кнопка отправки, блок ошибок) и сеттеры для них.
 *
 * Наследники: `OrderForm`, `ContactsForm`.
 *
 * @template T — тип данных формы, расширяющий `IFormData`
 */
export abstract class Form<T extends IFormData> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        // Находим общие для всех форм элементы
        this.submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            container
        );
        this.errorsElement = ensureElement<HTMLElement>(
            '.form__errors',
            container
        );
    }

    /** Управляет доступностью кнопки отправки формы */
    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    /** Отображает текст ошибок формы */
    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}