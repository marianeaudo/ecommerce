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

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

export interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
