'use client'
export default function Filters () {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id)
  }
  return (
        <div className="text-white">
            <form action="" className="flex gap-4">
                <div className="flex gap-2">
                    <input type="radio" name="genre" id="scifi" onChange={handleChange} />
                    <label htmlFor="scifi">Sci-Fi</label>
                </div>
                <div className="flex gap-2">
                    <input type="radio" name="genre" id="mistery" onChange={handleChange}/>
                    <label htmlFor="mistery">Mistery</label>
                </div>
                <div className="flex gap-2">
                    <input type="radio" name="genre" id="comedy" onChange={handleChange}/>
                    <label htmlFor="comedy">Comedy</label>
                </div>
            </form>
        </div>
  )
}
