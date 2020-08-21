export interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}

export interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

export interface Product {

  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;

}

export interface ProductCategory {

  id: number;
  categoryName: string;

}

