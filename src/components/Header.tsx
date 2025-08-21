import Nav from './Nav'
import Search from './Search'
export default function Header () {
  return (
        <>
            <header className='flex flex-col items-center min-h-[28rem] px-4'>
                <Nav />
                <div className="text-center max-w-4xl">
                    <h1 className="text-3xl font-extrabold text-transparent py-12 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-[3rem] lg:text-[3.75rem] leading-[1.2]">Track My Series</h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Descubre series increíbles, mantén un registro de tus favoritas y encuentra tu próxima obsesión televisiva. Explora por géneros y nunca pierdas el hilo de lo que estás viendo.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Comienza tu búsqueda</p>
                        <section className='flex flex-wrap justify-center lg:w-1/2 w-3/4 flex-grow items-center'>
                            <Search />
                        </section>
                    </div>
                </div>
            </header>
      </>
  )
}
