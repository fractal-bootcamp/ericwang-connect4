import './App.css'

function App() {


  return (
    <>
    <main className='max-w-[1440px] w-full mx-auto'>
      <div className='h-[80px] bg-neutral-700 mb-4 p-4'>Nav</div>
      <div className='flex gap-4'>
        <div className='grow bg-neutral-600'>
          <h1 className='text-4xl font-bold mb-8 p-4'>Tailwind CSS Connect Four</h1>
        </div>
        <div className='grow bg-neutral-500 p-4'>
          <div className='px-3'>
          <div className='rounded-full w-[75px] h-[75px] bg-red-800 mb-4'></div>
        </div>
        <div className='grid grid-rows-6 grid-cols-7 w-full rounded-xl overflow-hidden p-4 bg-neutral-700'>
          {Array.from({ length: 42 }, (_, i) => (
            <div className='bg-neutral-00 h-[calc(700px/7)] w-[calc(700px/7)] p-2'>
              <div className='bg-neutral-800 rounded-full h-full w-full'>{i}</div>
            </div>
          ))}
        </div>

        </div>
      </div>
      {/* <h1 className='font-bold mb-8'>Tailwind CSS Connect Four</h1>
      <div className='px-3'>
        <div className='rounded-full w-[75px] h-[75px] bg-red-800 mb-4'></div>
      </div>
      <div className='grid grid-rows-6 grid-cols-7 w-full rounded-xl overflow-hidden'>
        {Array.from({ length: 42 }, (_, i) => (
          <div className='bg-gray-500 h-[calc(700px/7)] w-[calc(700px/7)] p-3'>
            <div className='bg-gray-800 rounded-full h-full w-full'/>
          </div>
        ))}
      </div> */}
    </main>
    </>
  )
}

export default App
