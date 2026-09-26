import { ICardPreview, ICardPreviewActions } from "../../../types";
import { Card } from "./Cards";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";


//Тут я в замешательстве, создать еще один абстрактный калсс или продублировать пару полей и методов
export class CardPreview extends Card<ICardPreview> {

    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected textElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, action: ICardPreviewActions){
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buttonElement.addEventListener('click', action.onAddToCart)
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}/${value}`, this.titleElement.textContent ?? '');
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `card__category ${categoryMap[value as keyof typeof categoryMap]}`;
    }

    set text(value: string) {
        this.textElement.textContent = value;
    }

    /** Управляет доступностью кнопки */
    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }

    /** Управляет текстом кнопки */
    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }
}