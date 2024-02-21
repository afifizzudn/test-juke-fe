import { ProductsList } from './components/ProductsList'

const App = () => {
  return (
    <main className='flex flex-col items-center bg-primary min-h-screen'>
      <div className='container p-4'>
        <h1 className='text-3xl font-sans font-semibold'>
          List Products
        </h1>
        <ProductsList />
      </div>
    </main>
  )
}

export default App
