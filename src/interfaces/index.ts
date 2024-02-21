export interface Product {
  id: string
  title: string
  price: number | string
  description: string
  category: {
    id: string
    name: string
    image : string
  }
  images: string[]
  createdAt?: string
  categoryId?: number | string | undefined
}

export interface CreateProduct {
  title: string
  price: number | string
  description: string
  categoryId: number | string | undefined
  images: string[]
}

export type Products = Array<Product>
export type ProductDTO = CreateProduct

export interface ContextState {
  products: Products
  loading: boolean
  error: string | null
}

export type ProductsActions =
  | { type: 'SET_PRODUCTS', payload: Products }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'ADD_PRODUCT', payload: Product }
  | { type: 'EDIT_PRODUCT', payload: Product }
  | { type: 'DELETE_PRODUCT', payload: string }
