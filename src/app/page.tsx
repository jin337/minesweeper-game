'use client'
import { useState, useEffect } from "react"
import useTimer from '@/hooks/useTime';
import Box from '@/components/Box';

// 生成网格
const generateGrid = (box: number, bomb: number) => {
  // 初始化网格
  let newGrid = Array(box * box).fill(0);
  // 放置炸弹
  for (let i = 0; i < bomb; i++) {
    let bombPosition;
    do {
      bombPosition = Math.floor(Math.random() * box * box);
    } while (newGrid[bombPosition] === 1);
    newGrid[bombPosition] = 1;
  }
  return newGrid;
};

const Home = () => {
  const { formattedTime, startTimer, refreshTimer, pauseTimer } = useTimer(); //倒计时
  const [box, setBox] = useState<number>(9); // 网格大小
  const [bomb, setBomb] = useState<number>(9); // 炸弹数量
  const [grid, setGrid] = useState<Array<number>>([]); // 网格数组
  const [gameOver, setGameOver] = useState<boolean>(false);// 游戏结束状态
  const [gameWon, setGameWon] = useState<boolean>(false); // 游戏胜利状态
  const [gameType, setGameType] = useState<boolean>(false); // 游戏状态

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

  // 初始化或重置游戏
  useEffect(() => {
    handleRestart()
  }, [box, bomb]);

  // 处理重新开始
  const handleRestart = () => {
    const newGrid = generateGrid(box, bomb);
    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setGameType(false);
    refreshTimer()
  };

  // 游戏结束
  const handleGameOver = () => {
    setGameOver(true);
    setGameType(true);
    pauseTimer()
  }

  // 游戏开始
  const startGameType = () => {
    !gameType && startTimer()
  }

  return (
    <main className="wrap-container mx-auto h-screen select-none bg-gradient-to-r from-indigo-950 via-sky-950 to-emerald-950 text-neutral-100">
      <h1 className="text-lg text-red-500 text-center">be under construction~</h1>
      <div className="flex justify-between py-10 px-8">
        <div className="text-sm cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600"><span className="text-base">💣 </span>炸弹：{bomb}</div>
        <div className="text-sm cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600"><span className="text-base">🕛 </span>用时：{formattedTime}</div>
      </div>
      <div onClick={startGameType}>
        <Box items={grid} gameType={gameType} handleGameOver={handleGameOver} handleGameWon={setGameWon} />
      </div>
      <div className="mt-10 flex justify-center">
        <div className="text-lg cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" onClick={handleRestart}>重新开始</div>
      </div>
    </main>
  )
}
export default Home
