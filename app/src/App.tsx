import './App.css'

function App() {


  return (
    <>
    <main className='max-w-[700px] w-full mx-auto'>
      <h1 className='font-bold mb-8'>Tailwind CSS Connect Four</h1>
      {/* box for new chip */}
      <div className='px-3'>
        <div className='rounded-full w-[75px] h-[75px] bg-red-800 mb-4'></div>
      </div>
      <div className='grid grid-rows-6 grid-cols-7 w-full rounded-xl overflow-hidden'>
        {Array.from({ length: 42 }, (_, i) => (
          <div className='bg-gray-500 h-[calc(700px/7)] w-[calc(700px/7)] p-3'>
            <div className='bg-gray-800 rounded-full h-full w-full'/>
          </div>
        ))}
      </div>
    </main>
    </>
  )
}

export default App
