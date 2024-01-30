'use client'
import { useState, useEffect } from "react";

interface BoxProps {
  items: number[][] //0-无炸弹，1有炸弹
  gameType: boolean
  handleGameOver: (gameOver: boolean) => void
  handleGameWon: (gameWon: boolean) => void
}
interface boxArrProps {
  [x: string]: any;
  type: number
  left?: number
  right?: number
  bgClass?: string
  content?: JSX.Element | null
}

// 判断当前炸弹数量
const countBombsAround = (matrix: any[], row: number, col: number): number => {
  const rows = matrix.length
  const cols = matrix[0].length
  let count = 0
  // 检查上方
  if (row > 0 && matrix[row - 1][col].type === 1) count++
  // 检查下方
  if (row < rows - 1 && matrix[row + 1][col].type === 1) count++
  // 检查左方
  if (col > 0 && matrix[row][col - 1].type === 1) count++
  // 检查右方
  if (col < cols - 1 && matrix[row][col + 1].type === 1) count++
  return count
};

const Box = ({ items, gameType, handleGameOver, handleGameWon }: BoxProps) => {
  const [boxArr, setBoxArr] = useState<Array<boxArrProps>>([])
  const [over, setOver] = useState<boolean>(false);

  useEffect(() => {
    setOver(gameType)
  }, [gameType])

  useEffect(() => {
    if (items.length) {
      let list: any[] = []
      items.forEach(element => {
        let item: boxArrProps[] = []
        element.forEach(e => {
          item.push({
            type: e,
            right: 0,
            left: 0,
            bgClass: 'from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500'
          })
        });

        list.push(item)
      });
      setBoxArr(list)
    }
  }, [items])

  // 左键操作
  const handleLeftClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, pindex: number, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    if (item.right != 0) return; // 右键键已经点击
    let list = [...boxArr]
    list[pindex][index].left = 1
    if (item.type == 1) {
      setOver(true)
      setGameOver(list)
      return
    } else {
      let num = countBombsAround(list, pindex, index)
      if (num) {
        list[pindex][index].content = <span className="text-2xl text-blue-400">{num}</span>
      } else {
        list[pindex][index].content = null
      }
      list[pindex][index].bgClass = 'from-neutral-100 to-neutral-200 hover:from-neutral-300 hover:to-neutral-400'
    }
    setBoxArr(list)
  }

  // 右键操作
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, pindex: number, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    if (item.left != 0) return; // 左键已经点击
    let list = [...boxArr]
    let count = item.right
    if (count == 0) {
      list[pindex][index].right = 1
      list[pindex][index].content = <span className="text-2xl">🚩</span>
      list[pindex][index].bgClass = 'from-yellow-100 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400'
    } else if (count == 1) {
      list[pindex][index].right = 2
      list[pindex][index].content = <span className="text-2xl">❓</span>
      list[pindex][index].bgClass = 'from-green-100 to-green-200 hover:from-green-300 hover:to-green-400'
    } else {
      list[pindex][index].right = 0
      list[pindex][index].content = null
      list[pindex][index].bgClass = 'from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500'
    }
    setBoxArr(list)
  };

  // 游戏结束
  const setGameOver = (list: Array<boxArrProps>) => {
    const updatedList = list.map((element) => {
      let item = element.map((e: boxArrProps) => {
        if (e.type === 1) {
          return {
            ...e,
            content: <span className="text-4xl animate-explode">💥</span>,
            bgClass: 'bg-red-100'
          };
        }
        return e
      })
      return item;
    });
    setBoxArr(updatedList);

    setTimeout(() => {
      const newList = updatedList.map((element) => {
        let item = element.map((e: boxArrProps) => {
          if (e.type === 1) {
            return {
              ...e,
              content: <span className="text-2xl">💣</span>,
              bgClass: 'bg-neutral-800'
            };
          }
          return e
        })
        return item;
      });

      setBoxArr(newList);
      handleGameOver(true);
    }, 1000);
  }

  return (
    boxArr.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center">
        {
          row.map((item: boxArrProps, index: number) => (
            <div
              key={index}
              onClick={(e) => handleLeftClick(e, item, rowIndex, index)}
              onContextMenu={(e) => handleRightClick(e, item, rowIndex, index)}
              className={`size-8 xs:size-10 m-1 shadow shadow-blue-600/50 rounded transform transition duration-300 ease-in-out flex justify-center items-center hover:scale-110 bg-gradient-to-br ${item.bgClass}`}>{item.content}</div>
          ))
        }
      </div>
    ))
  )
}
export default Box
