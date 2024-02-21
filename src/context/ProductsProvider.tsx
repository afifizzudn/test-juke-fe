import { FC, useReducer, useEffect } from 'react'
import axios from 'axios'
import ProductsContext from './ProductsContext'
import ProductsReducer from '../reducers/ProductsReducer'
import { Products, ContextState } from '../interfaces'
import { API_URL } from '../utils/base-url'

const INIT_STATE: ContextState = {
  products: [],
  loading: true,
  error: null
}

const ProductsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, INIT_STATE)

  const getProducts = async () => {
    try {
      const { data } = await axios.get<Products>(API_URL)
      dispatch({ type: 'SET_PRODUCTS', payload: data })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' })
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider
