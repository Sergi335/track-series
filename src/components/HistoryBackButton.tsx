'use client'
export default function HistoryBackButton () {
  return (
        <button onClick={() => { window.history.back() }} className='w-[43px] h-[43px] flex items-center justify-center p-[13px] bg-slate-400 rounded-full'>
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3.55 12 7.35 7.35c.25.25.371.542.363.875a1.242 1.242 0 0 1-.388.875 1.2 1.2 0 0 1-.875.375 1.2 1.2 0 0 1-.875-.375l-7.7-7.675c-.2-.2-.35-.425-.45-.675-.1-.25-.15-.5-.15-.75s.05-.5.15-.75c.1-.25.25-.475.45-.675l7.7-7.7c.25-.25.546-.371.888-.363.342.008.638.137.887.388.25.25.375.542.375.875a1.2 1.2 0 0 1-.375.875L3.55 12Z" fill="#000"/></svg>
        </button>
  )
}
