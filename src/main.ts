import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';
import { ProductGateway } from './components/ProductGateway';
import { Header } from './components/View/UI/Header';
import { ensureElement } from './utils/utils';
import { Gallery } from './components/View/UI/Gallery';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/View/UI/Modal';
import { Presenter } from './components/Presenter/Presenter';

// 1. Брокер событий
const events = new EventEmitter();

// 2. API
const api = new ProductGateway(new Api(API_URL));

// 3. Модели
const catalog = new Catalog(events);
const cart = new Cart(events);
const customer = new Customer(events);

// 4. Постоянные View
const header = new Header(ensureElement('.header'), {onBasketClick() {
    events.emit('basket:open');
}});
const gallery = new Gallery(ensureElement('.gallery'));
const modal = new Modal(ensureElement('.modal'), {onClose() {
    events.emit('modal:close')
},})

const presenter = new Presenter(
    events,
    catalog,
    cart,
    customer,
    api,
    header,
    gallery,
    modal
)