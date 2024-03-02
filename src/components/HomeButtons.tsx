import Link from 'next/link'
export default function HomeButtons () {
  return (
    <section className="flex justify-center items-center gap-4 min-h-[30vh]">
        <article className="relative flex-col bg-left-top bg-slate-700 text-white rounded px-6 w-[450px] h-[180px] flex justify-start items-start bg-cover" style={{ backgroundImage: 'url(/scifi.webp)', backgroundSize: '145%' }}><p className='text-[77px] font-black italic text-[#333333]'>Sci Fi</p><Link href='/featured/scifi' className='absolute px-8 py-1 rounded-lg w-full lg:w-fit text-center bg-blue-700 hover:bg-blue-800 bottom-[36px] left-[33px] transition-colors duration-500'>Ver más</Link></article>
        <article className="relative flex-col bg-left-top bg-slate-700 text-white rounded px-6 w-[450px] h-[180px] flex justify-start items-start bg-cover" style={{ backgroundImage: 'url(/comedy.webp)', backgroundSize: '145%' }}><p className='text-[77px] font-black italic text-[#333333]'>Comedia</p><Link href='/featured/comedy' className='absolute px-8 py-1 rounded-lg w-full lg:w-fit text-center bg-blue-700 hover:bg-blue-800 bottom-[36px] left-[33px] transition-colors duration-500'>Ver más</Link></article>
        <article className="relative flex-col bg-left-top bg-slate-700 text-white rounded px-6 w-[450px] h-[180px] flex justify-start items-start bg-cover" style={{ backgroundImage: 'url(/mystery.webp)', backgroundSize: '145%' }}><p className='text-[77px] font-black italic text-[#333333]'>Misterio</p><Link href='/featured/mystery' className='absolute px-8 py-1 rounded-lg w-full lg:w-fit text-center bg-blue-700 hover:bg-blue-800 bottom-[36px] left-[33px] transition-colors duration-500'>Ver más</Link></article>
    </section>
  )
}
