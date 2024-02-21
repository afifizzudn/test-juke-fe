import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Button } from "./Button";
import { ProductsItem } from "./ProductsItem";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { Table } from "./Table";

export const ProductsList = () => {
  const { products, loading, error } = useProducts();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className='flex flex-col items-end mt-5'>
            <Button
              label='New product'
              click={() => setShowModal(!showModal)}
            />
          </div>

          <Table>
            {currentProducts.map((item) => (
              <ProductsItem key={item.id} product={item} />
            ))}

            {!products.length && (
              <tr className='bg-white'>
                <td colSpan={6} className='py-4 px-6 text-sm text-center'>
                  <p className='font-semibold'>There are no products. 😢</p>
                </td>
              </tr>
            )}
          </Table>

          <ul className='flex justify-center mt-4'>
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <li key={index} className='mx-1'>
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    currentPage === index + 1 ? "bg-blue-700" : ""
                  }`}
                  onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {error && (
        <div className='flex items-center justify-center h-89v'>
          <p className='font-bold text-red-500 text-xl'>{error} 😢</p>
        </div>
      )}

      {showModal && <Modal onClose={() => setShowModal(!showModal)} />}
    </>
  );
};
