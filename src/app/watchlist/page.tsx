import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default function Watchlist () {
  return (
    <>
        <Header />
        <main className="flex flex-col items-center">
        <Nav />
        <div>
            <h1>Watchlist</h1>
        </div>
      </main>

    </>
  )
}
