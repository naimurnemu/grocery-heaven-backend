export type ICart = {
    userId: string;
    products: IProducts[];
}

type IProducts = {
    name: string;
    price: number;
}