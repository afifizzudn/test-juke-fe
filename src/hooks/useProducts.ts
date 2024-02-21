import { useContext } from 'react'
import ProductsContext from '../context/ProductsContext'

export const useProducts = () => {
  const { state, dispatch } = useContext(ProductsContext)

  return {
    ...state,
    dispatch
  }
}
