'use client'
import { useState } from "react"
import useTimer from '@/hooks/useTime';

const Home = () => {
  const [box, setBox] = useState(9)
  const { formattedTime, startTimer, refreshTimer } = useTimer();

  const Box = ({ index }: { index: number }) => {
    const [content, setContent] = useState<JSX.Element | null>(null);
    const [bgClass, setBgClass] = useState('from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500');
    const [clickCount, setClickCount] = useState(0);
    const [leftClicked, setLeftClicked] = useState(false);

    const handleLeftClick = () => {
      setContent(<span className="text-2xl text-blue-500">&#x31;</span>);
      setBgClass('from-neutral-100 to-neutral-200 hover:from-neutral-300 hover:to-neutral-400');
      setLeftClicked(true);
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      if (leftClicked) return;
      setClickCount(prevCount => {
        const newCount = (prevCount + 1) % 3;
        switch (newCount) {
          case 1:
            setContent(<span className="text-2xl text-red-500">&#x2691;</span>);
            setBgClass('from-yellow-100 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400');
            break;
          case 2:
            setContent(<span className="text-2xl text-yellow-500">&#x3f;</span>);
            setBgClass('from-green-100 to-green-200 hover:from-green-300 hover:to-green-400');
            break;
          default:
            setContent(null);
            setBgClass('from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500');
            break;
        }
        return newCount;
      });
    };

    return (
      <div
        onContextMenu={handleRightClick}
        onClick={handleLeftClick}
        className={`size-6 xs:size-10 shadow-lg rounded transform transition duration-300 ease-in-out flex justify-center items-center hover:scale-110 bg-gradient-to-br ${bgClass}`}
      >
        {content}
      </div>
    );
  };

  return (
    <main className="wrap-container mx-auto h-screen select-none bg-gradient-to-r from-indigo-950 via-sky-950 to-emerald-950 text-neutral-100">
      <div className="p-10">
        <h1 className="text-lg text-red-500 text-center">be under construction~</h1>
        <div className="p-10">
          <div className="flex justify-between mb-10">
            <div className="text-lg">炸弹：0</div>
            <div className="text-lg">用时：{formattedTime}</div>
          </div>
          <div className="grid grid-cols-9 gap-1 w-[255px] xs:w-[400px] m-auto">
            {Array.from({ length: box * box }, (_, index) => (
              <Box key={index} index={index} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="text-lg cursor-pointer rounded px-2 py-1 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" onClick={refreshTimer}>重新开始</div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home
