import { ProductsActions, ContextState } from '../interfaces'

const ProductsReducer = (state: ContextState, action: ProductsActions): ContextState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      }

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      }

    case 'EDIT_PRODUCT':
      const found =  state.products.find(item => item.id === action.payload.id)

      return {
        ...state,
        products: state.products.map(product => {
          if(found) {
            Object.assign(found, action.payload)

            return {
              ...product
            }
          }

          return product
        })
      }

    default:
      return state
  }
}

export default ProductsReducer
