'use client'
import { useState } from 'react';

const Box = ({ index, startTimer }: { index: number; startTimer: () => void }) => {
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [bgClass, setBgClass] = useState('from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500');
  const [clickCount, setClickCount] = useState(0);
  const [leftClicked, setLeftClicked] = useState(false);

  const handleLeftClick = () => {
    startTimer();
    setLeftClicked(true);

    setContent(<span className="text-2xl text-blue-500">&#x31;</span>);
    setBgClass('from-neutral-100 to-neutral-200 hover:from-neutral-300 hover:to-neutral-400');
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

export default Box
