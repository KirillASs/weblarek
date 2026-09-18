import { Card } from "./Cards";
import { ICardCatalog } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";

export class CardCatalog extends Card<ICardCatalog>{
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement){
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    }

    set image(value: string) {
        this.setImage(this.imageElement, value, this.titleElement.textContent ?? '');
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `card__category ${categoryMap[value as keyof typeof categoryMap]}`;
    }
}