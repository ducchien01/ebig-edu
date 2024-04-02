export interface OrderDetailsItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    quantity?: number,
    price?: number,
    status?: number,
    discount?: number,
    totalPrice?: number,
    value?: number,
    orderId?: string,
    productId?: string,
    type?: number
}

export interface OrderItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    note?: string,
    totalPrice?: number,
    status?: number,
    customerName?: string,
    address?: string,
    mobile?: string,
    type?: number,
    longitude?: number,
    latitude?: number,
    statusPayment?: number,
    check?: number,
    customerId?: string,
    customerAddressId?: string,
    shopId?: string,
    orderDetails?: Array<OrderDetailsItem>
}