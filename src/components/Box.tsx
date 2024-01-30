'use client'
import { useState, useCallback } from 'react';


const Box = ({ index, startTimer, boxState = 0 }: { index: number; startTimer: () => void, boxState: number }) => {
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [bgClass, setBgClass] = useState('bg-blue-500');
  const [clickCount, setClickCount] = useState(0);
  const [leftClicked, setLeftClicked] = useState(false);

  const updateState = useCallback((newCount: number) => {
    switch (newCount) {
      case 1:
        setContent(<span className="text-2xl">🚩</span>);
        setBgClass('bg-yellow-500');
        break;
      case 2:
        setContent(<span className="text-2xl">❓</span>);
        setBgClass('bg-green-500');
        break;
      default:
        setContent(null);
        setBgClass('bg-blue-500');
        break;
    }
  }, []);

  const handleLeftClick = () => {
    startTimer();
    setLeftClicked(true);

    if (boxState === -1) {
      setContent(<span className="text-4xl animate-explode">💥</span>);
      setBgClass('bg-red-100');
      const timer = setTimeout(() => {
        setContent(<span className="text-2xl">💣</span>);
        setBgClass('bg-neutral-800');
      }, 1000);
    } else {
      // 显示周围炸弹的数量
      setContent(<span className="text-2xl text-blue-500">{boxState !== 0 && boxState}</span>);
      setBgClass('bg-neutral-100');
    }
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (leftClicked) return;
    setClickCount(prevCount => {
      const newCount = (prevCount + 1) % 3;
      updateState(newCount);
      return newCount;
    });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleLeftClick}
      className={`size-6 xs:size-10 rounded transform transition duration-300 ease-in-out flex justify-center items-center hover:scale-110 ${bgClass}`}
    >
      {content}
    </div>
  );
};

export default Box;
