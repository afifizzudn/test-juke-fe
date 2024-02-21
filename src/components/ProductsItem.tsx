import { FC, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../interfaces'
import { deleteProduct } from '../services'
import { Dialog } from './Dialog'
import { Modal } from './Modal'

interface ProductsItemProps {
  product: Product
}

export const ProductsItem: FC<ProductsItemProps> = ({ product }) => {
  const { id, title, price, description, images, category } = product

  const { dispatch } = useProducts()
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogEdit, setShowDialogEdit] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlerDelete = async () => {
    setBtnLoading(true)
    setError(false)

    const { error } = await deleteProduct(id)

    if (!error) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id })
      return
    }

    setError(true)
    setBtnLoading(false)
  }

  return (
    <>
      <tr className='border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50'>
        <td className='py-4 px-6 text-sm'>
          <img
            src={images[0]}
            alt={title}
            className='h-10 w-10 object-cover rounded-full'
          />
        </td>
        <td className='py-4 px-6 text-sm'>{title}</td>
        <td className='py-4 px-6 text-sm whitespace-nowrap'>{category.name}</td>
        <td className='py-4 px-6 text-sm'>{description}</td>
        <td className='flex py-4 px-6 text-sm whitespace-nowrap'>
          <p className='font-bold'>$</p>
          {price}
        </td>
        <td className='py-4 px-6 text-sm whitespace-nowrap space-x-3'>
          <button
            onClick={() => setShowDialogEdit(true)}
            className='bg-green-500 hover:bg-green-600 text-white font-bold p-1.5 rounded-xl'
          >
            ✏️
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-xl'
            onClick={() => setShowDialogDelete(true)}
          >
            🚫
          </button>
        </td>
      </tr>

      {showDialogDelete && (
        <Dialog
          click={handlerDelete}
          onClose={() => {
            setShowDialogDelete(false)
            setError(false)
            setBtnLoading(false)
          }}
          error={error}
          btnLoading={btnLoading}
        />
      )}

      {showDialogEdit && (
        <Modal isEdit item={product} onClose={() => setShowDialogEdit(false)} />
      )}
    </>
  )
}
