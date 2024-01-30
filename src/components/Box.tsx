'use client'
import { useState, useEffect } from "react";

interface BoxProps {
  items: number[] //0-无炸弹，1有炸弹
  gameType: boolean
  handleGameOver: (gameOver: boolean) => void
  handleGameWon: (gameWon: boolean) => void
}
interface boxArrProps {
  type: number
  left?: number
  right?: number
  bgClass?: string
  content?: JSX.Element | null
}

const Box = ({ items, gameType, handleGameOver, handleGameWon }: BoxProps) => {
  const [boxArr, setBoxArr] = useState<Array<boxArrProps>>([])
  const [over, setOver] = useState<boolean>(false);

  useEffect(() => {
    setOver(gameType)
  }, [gameType])

  useEffect(() => {
    let list: boxArrProps[] = []
    items.forEach(element => {
      list.push({
        type: element,
        right: 0,
        left: 0,
        bgClass: 'from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500'
      })
    });
    setBoxArr(list)
  }, [items])

  // 左键操作
  const handleLeftClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    let list = [...boxArr]
    list[index].left = 1
    if (item.type == 1) {
      setOver(true)
      setGameOver(list)
      return
    } else {
      list[index].content = null
      list[index].bgClass = 'from-neutral-100 to-neutral-200 hover:from-neutral-300 hover:to-neutral-400'
    }
    setBoxArr(list)
  }

  // 右键操作
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    if (item.left != 0) return; // 左键已经点击
    let list = [...boxArr]
    let count = item.right
    if (count == 0) {
      list[index].right = 1
      list[index].content = <span className="text-2xl">🚩</span>
      list[index].bgClass = 'from-yellow-100 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400'
    } else if (count == 1) {
      list[index].right = 2
      list[index].content = <span className="text-2xl">❓</span>
      list[index].bgClass = 'from-green-100 to-green-200 hover:from-green-300 hover:to-green-400'
    } else {
      list[index].right = 0
      list[index].content = null
      list[index].bgClass = 'from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500'
    }
    setBoxArr(list)
  };

  // 游戏结束
  const setGameOver = (list: Array<boxArrProps>) => {
    const updatedList = list.map((element, index) => {
      if (element.type === 1) {
        return {
          ...element,
          content: <span className="text-4xl animate-explode">💥</span>,
          bgClass: 'bg-red-100'
        };
      }
      return element;
    });

    setBoxArr(updatedList);

    setTimeout(() => {
      const newList = updatedList.map((element) => {
        if (element.type === 1) {
          return {
            ...element,
            content: <span className="text-2xl">💣</span>,
            bgClass: 'bg-neutral-800'
          };
        }
        return element;
      });

      setBoxArr(newList);
      handleGameOver(true);
    }, 1000);
  }

  return (
    <div className="flex flex-wrap gap-1.5 w-[336px] h-[336px] xs:w-[408px] xs:h-[408px] mx-auto">
      {
        boxArr.map((item, index) => (
          <div key={index}
            onClick={(e) => handleLeftClick(e, item, index)}
            onContextMenu={(e) => handleRightClick(e, item, index)}
            className={`size-8 xs:size-10 shadow shadow-blue-600/50 rounded transform transition duration-300 ease-in-out flex justify-center items-center hover:scale-110 bg-gradient-to-br ${item.bgClass}`}>{item.content}
          </div>
        ))
      }
    </div>
  )
}
export default Box
