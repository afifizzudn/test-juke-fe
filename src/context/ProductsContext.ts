import { createContext, Dispatch } from 'react'
import { ProductsActions, ContextState } from '../interfaces'

interface ProductsContextI {
  state: ContextState
  dispatch: Dispatch<ProductsActions>
}

const ProductsContext = createContext<ProductsContextI>({} as ProductsContextI)

export default ProductsContext
