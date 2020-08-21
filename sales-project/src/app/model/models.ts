export interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    total: number;
    number: number;
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

