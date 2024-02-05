import Search from './Search'
export default function Header () {
  return (
        <>
            <header className='flex flex-col items-center min-h-[22rem]'>
                <h1 className="text-3xl font-extrabold text-transparent py-24 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-[3rem] lg:text-[3.75rem] leading-[1.2]">Track My Series</h1>
                <section className='flex flex-wrap justify-center lg:w-1/2 w-3/4 flex-grow items-center'>
                    <Search />
                </section>
            </header>
      </>
  )
}
