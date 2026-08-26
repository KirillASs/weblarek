import { IOrderRequest, IProductsResponse, IOrderResult, } from "../types";
import { IApi } from "../types";

export class ProductGateway {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product');
    }

    createOrder(orderData: IOrderRequest): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order', orderData);
    }
}