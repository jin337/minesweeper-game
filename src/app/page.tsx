'use client'
import { useState, useEffect } from "react"
import useTimer from '@/hooks/useTime';
import Box from '@/components/Box';

// 生成网格
const createMatrix = (size: number, bombs: number): number[][] => {
  // 创建初始的多维数组，全部填充为0
  let matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

  // 随机放置炸弹
  let placedBombs = 0;
  while (placedBombs < bombs) {
    let randomRow = Math.floor(Math.random() * size);
    let randomCol = Math.floor(Math.random() * size);

    if (matrix[randomRow][randomCol] === 0) {
      matrix[randomRow][randomCol] = 1; // 放置炸弹
      placedBombs++;
    }
  }

  return matrix;
};

const Home = () => {
  const { formattedTime, startTimer, refreshTimer, pauseTimer } = useTimer(); //倒计时
  const [box, setBox] = useState<number>(9); // 网格大小
  const [bomb, setBomb] = useState<number>(10); // 炸弹数量
  const [grid, setGrid] = useState<number[][]>([]); // 网格数组
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
    const newGrid = createMatrix(box, bomb);
    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setGameType(false);
    refreshTimer()
  };

  // 游戏结束
  const handleGameOver = () => {
    pauseTimer()
    setGameType(true);
    setGameOver(true);
  }
  // 游戏胜利
  const handleGameWon = () => {
    pauseTimer()
    setGameType(true);
    setGameWon(true);
  }

  // 游戏开始
  const startGameType = () => {
    !gameType && startTimer()
  }

  return (
    <main className="container py-10 mx-auto h-screen select-none bg-gradient-to-r from-indigo-950 via-sky-950 to-emerald-950 text-neutral-100">
      <div className="flex justify-around">
        <div className="text-sm rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600"><span className="text-base">💣 </span>Bomb：{bomb}</div>
        <div className="text-sm rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600"><span className="text-base">🕛 </span>Time：{formattedTime}</div>
      </div>
      <div className="relative my-10 animate-fadeIn h-[360px] xs:h-[432px]" onClick={startGameType}>
        <Box items={grid} gameType={gameType} handleGameOver={handleGameOver} handleGameWon={handleGameWon} />
        {(gameOver || gameWon) && <div className="absolute top-0 w-full h-full overflow-hidden">
          <div className="flex w-full h-full justify-center items-center bg-neutral-300/10 animate-fadeOver">
            {gameWon && <span className="text-9xl">🥳</span>}
            {gameOver && <span className="text-9xl">😭</span>}
          </div>
        </div>}
      </div>
      <div className="flex justify-center">
        <div className="text-lg cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" onClick={handleRestart}>Restart</div>
      </div>
    </main>
  )
}
export default Home
