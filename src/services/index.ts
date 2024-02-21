import axios from 'axios'
import { Product, CreateProduct, ProductDTO } from '../interfaces'
import { API_URL } from '../utils/base-url'

export const addProduct = async (newProduct: ProductDTO, image: File) => {
  const result = { dataProduct: {} as Product, error: false }

  const { title, description, categoryId, images, price } = newProduct
  const payload = {
    title,
    description,
    categoryId,
    images,
    price
  }

  try {
    const { data } = await axios.post(`${API_URL}`, payload)
    result.dataProduct = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const editProduct = async (
  id: string,
  productEdited: ProductDTO,
  image: File
) => {
  const result = { dataProduct: {} as Product, error: false }

  const { title, description, categoryId, images, price } = productEdited


  const payload = {
    title,
    description,
    categoryId,
    images,
    price
  }

  try {
    const { data } = await axios.put(`${API_URL}/${id}`, payload)
    result.dataProduct = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const deleteProduct = async (id: string) => {
  const result = { error: false }

  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}
