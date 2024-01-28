'use client'
import { useState } from "react"

const Home = () => {
  const [box, setBox] = useState(9)

  const gridItems = Array.from({ length: box * box }, (_, index) => (
    <div key={index} className="w-10 h-10 shadow-lg rounded transform transition duration-300 ease-in-out hover:scale-110 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700" />
  ));

  return (
    <main className="wrap-container mx-auto m-10 select-none">
      <h1 className="text-lg text-red-500"> be under construction~</h1>
      <div className="p-10 bg-gradient-to-r from-indigo-950 via-sky-950 to-emerald-950 text-neutral-100">
        {/* <div className="text-base">
          <div className="flex gap-2">
            <div className=" bg-blue-500 px-2 py-1 rounded cursor-pointer" onClick={() => setBox(9)}>9*9</div>
            <div className=" bg-blue-500 px-2 py-1 rounded cursor-pointer" onClick={() => setBox(16)}>16*16</div>
          </div>
        </div> */}
        <div className="mt-10">
          <div className="grid grid-cols-9 gap-1 w-[400px] m-auto">
            {gridItems}
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home
