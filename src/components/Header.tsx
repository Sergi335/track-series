import Nav from './Nav'

export default function Header () {
  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 flex items-between px-12">
      <div className="text-3xl font-extrabold text-transparent py-4 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        TMS
      </div>
      <Nav />
    </header>
  )
}
