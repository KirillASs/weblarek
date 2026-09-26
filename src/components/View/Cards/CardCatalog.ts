import { Card } from "./Cards";
import { ICardCatalog, ICardCatalogActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export class CardCatalog extends Card<ICardCatalog>{
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, action: ICardCatalogActions){
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener('click', action.onSelect)
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}/${value}`, this.titleElement.textContent ?? '');
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `card__category ${categoryMap[value as keyof typeof categoryMap]}`;
    }
}