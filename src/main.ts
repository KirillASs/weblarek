import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';
import { ProductGateway } from './components/ProductGateway';
import { Header } from './components/View/UI/Header';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/UI/Gallery';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/View/UI/Modal';
import { Presenter } from './components/Presenter/Presenter';
import { Basket } from './components/View/UI/Basket';
import { OrderForm } from './components/View/Forms/OrderForm';
import { ContactsForm } from './components/View/Forms/ContactsForm';
import { Success } from './components/View/UI/Success';
import { CardPreview } from './components/View/Cards/CardPreview';

// 1. Брокер событий
const events = new EventEmitter();

// 2. API
const api = new ProductGateway(new Api(API_URL));

// 3. Модели
const catalog = new Catalog(events);
const cart = new Cart(events);
const customer = new Customer(events);

// 4. Постоянные View
const header = new Header(ensureElement('.header'), {onBasketClick: () => events.emit('basket:open')});
const gallery = new Gallery(ensureElement('.gallery'));
const modal = new Modal(ensureElement('.modal'), {onClose: ()=> events.emit('modal:close')})

const basket = new Basket(cloneTemplate('#basket'), {
    onCheckout: () => events.emit('order:open'),
});

const orderForm = new OrderForm(cloneTemplate('#order'), {
    onPaymentChange: (payment) => customer.setData({ payment }),
    onAddressChange: (address) => customer.setData({ address }),
    onSubmit: () => events.emit('order:submit'),
});

const contactsForm = new ContactsForm(cloneTemplate('#contacts'), {
    onEmailChange: (email) => customer.setData({ email }),
    onPhoneChange: (phone) => customer.setData({ phone }),
    onSubmit: () => events.emit('contacts:submit'),
});

const success = new Success(cloneTemplate('#success'), {
    onClose: () => events.emit('success:close'),
});

const cardPreview = new CardPreview(cloneTemplate('#card-preview'), {
    onAddToCart: () => events.emit('card:add'),
});

const presenter = new Presenter(
    events, catalog, cart, customer, api,
    header, gallery, modal,
    basket, orderForm, contactsForm, success, cardPreview,
)

presenter.loadCatalog()