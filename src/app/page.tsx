'use client'
import { useState, useEffect } from "react"
import useTimer from '@/hooks/useTime';
import Box from '@/components/Box';

const Home = () => {
  const [box, setBox] = useState(9)
  const [bomb, setBomb] = useState(9)
  const { formattedTime, startTimer, refreshTimer } = useTimer();
  const [resetKey, setResetKey] = useState(0);


  // 取消浏览器右键
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // 重新开始
  const handleRestart = () => {
    refreshTimer();
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <main className="wrap-container mx-auto h-screen select-none bg-gradient-to-r from-indigo-950 via-sky-950 to-emerald-950 text-neutral-100">
      <div className="p-10">
        <h1 className="text-lg text-red-500 text-center">be under construction~</h1>
        <div className="p-10">
          <div className="flex justify-between mb-10">
            <div className="text-base cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600">💣 炸弹：0</div>
            <div className="text-base cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600">🕛 用时：{formattedTime}</div>
          </div>
          <div className="grid grid-cols-9 gap-1 w-[255px] xs:w-[400px] m-auto">
            {Array.from({ length: box * box }, (_, index) => (
              <Box key={index} index={index} startTimer={startTimer} resetKey={resetKey} boxState={-1} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="text-lg cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" onClick={handleRestart}>重新开始</div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home
