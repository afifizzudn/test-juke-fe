import { FC, FormEvent, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useForm } from '../hooks/useForm'
import { Product, ProductDTO } from '../interfaces'
import { addProduct, editProduct } from '../services'
import { Button } from './Button'
import { FileInput } from './FileInput'
import { RawModal } from './RawModal'
import { TextInput } from './TextInput'

interface ModalProps {
  onClose: () => void
  isEdit?: boolean
  item?: Product
}

export const Modal: FC<ModalProps> = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError] = useState(false)
  const [imgPath, setImgPath] = useState({} as File)
  const [imgPreview, setImgPreview] = useState<ArrayBuffer | string>('')

  const { dispatch } = useProducts()

  const { values, handlerChange } = useForm<ProductDTO>({
    title: isEdit ? item!.title : '',
    categoryId: isEdit ? item!.categoryId : '',
    description: isEdit ? item!.description : '',
    images: isEdit ? item!.images : ['http://images.example.com'],
    price: isEdit ? item!.price : ''
  })

  const { title, price, description, images, categoryId } = values

  const handlerAdd = async (e: FormEvent) => {
    e.preventDefault()

    if (
      title !== '' &&
      description !== '' &&
      categoryId !== '' &&
      price !== '' 
      // imgPath instanceof File
    ) {
      setBtnLoading(true)
      setIsValid(false)
      setError(false)

      const { error, dataProduct } = await addProduct(values, imgPath)

      if (!error) {
        dispatch({ type: 'ADD_PRODUCT', payload: dataProduct })
        onClose()
        return
      }

      setError(true)
      setBtnLoading(false)
      return
    }

    setIsValid(true)
    setError(false)
  }

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault()

    if (
      title !== '' &&
      description !== '' &&
      categoryId !== '' &&
      price !== '' 
    ) {
      setBtnLoading(true)
      setIsValid(false)
      setError(false)

      const { error, dataProduct } = await editProduct(
        item?.id!,
        values,
        imgPath
      )

      if (!error) {
        dispatch({
          type: 'EDIT_PRODUCT',
          payload: { ...item!, ...dataProduct }
        })

        onClose()
        return
      }

      setError(true)
      setBtnLoading(false)
      return
    }

    setIsValid(true)
    setError(false)
  }

  return (
    <RawModal onClose={onClose}>
      <form
        onSubmit={isEdit ? handlerEdit : handlerAdd}
        className='flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8'
      >
        <h3 className='text-xl text-center font-medium text-gray-600'>
          {isEdit ? 'Edit product' : 'Add a new Product'}
        </h3>

        <TextInput
          name='title'
          placeholder='title'
          value={title}
          onChange={handlerChange}
        />

        <TextInput
          name='description'
          placeholder='description'
          value={description}
          onChange={handlerChange}
        />

        <TextInput
          name='categoryId'
          placeholder='category Id'
          value={categoryId}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name='price'
          placeholder='Price'
          value={price}
          onChange={handlerChange}
        />

        <FileInput
          name={imgPath.name ? imgPath.name : 'Choose a image'}
          imgSelected={imgPreview}
        >
          <input
            className='h-full w-full opacity-0'
            type='file'
            name='image'
            onChange={({ target }) => {
              if (target.files && target.files[0]) {
                setImgPath(target.files[0])

                // Select the image
                const reader = new FileReader()
                reader.onload = () => {
                  setImgPreview(reader.result!)
                }

                reader.readAsDataURL(target.files[0])
              }
            }}
          />
        </FileInput>

        {/* Validation and Errors */}
        {isValid && (
          <div className='flex items-center justify-end'>
            <p className='text-red-500 text-sm font-bold'>
              All fields are required.
            </p>
          </div>
        )}

        {error && (
          <div className='flex items-center justify-end'>
            <p className='text-red-500 text-sm font-bold'>
              Something went wrong.
            </p>
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className='flex items-center justify-end space-x-2'>
          <Button label='Close' isClose click={onClose} />
          <Button
            label={btnLoading ? 'Loading...' : isEdit ? 'Edit' : 'Add'}
            isSubmit
            isLoading={btnLoading}
          />
        </div>
      </form>
    </RawModal>
  )
}
