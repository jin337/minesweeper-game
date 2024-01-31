'use client'
import { useState, useEffect } from "react";

interface BoxProps {
  items: number[][] // 单元格数组
  gameType: boolean // 游戏状态
  handleGameOver: (gameOver: boolean) => void // 游戏结束
  handleGameWon: (gameWon: boolean) => void // 游戏胜利
}
interface boxArrProps {
  [x: string]: any;
  type: number  // 炸弹：0-无，1-有
  left?: number // 左键：0-未点击，1-已点击
  right?: number // 右键：0-无，1-标记地雷， 2-不确定
  bgClass?: string // 单元格背景class
  contentClass?: string // 内容class
  content?: string | number // 单元格内容
}

// 判断当前炸弹数量
const countBombsAround = (arr: any[], row: number, col: number): number => {
  const rows = arr.length;
  const cols = arr[0].length;
  let count = 0;

  // 定义周围8个方向的偏移量
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // 上一行的三个
    [0, -1], [0, 1],   // 当前行的左右
    [1, -1], [1, 0], [1, 1]      // 下一行的三个
  ];

  for (let [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    // 检查新位置是否在数组范围内
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      // 检查新位置是否有炸弹
      if (arr[newRow][newCol] === 1) {
        count++;
      }
    }
  }

  return count;
};


const Box = ({ items, gameType, handleGameOver, handleGameWon }: BoxProps) => {
  const [boxArr, setBoxArr] = useState<Array<boxArrProps>>([])
  const [over, setOver] = useState<boolean>(false);

  // 初始化数据
  useEffect(() => {
    if (items.length) {
      let list: any[] = []
      items.forEach((element, index) => {
        let item: boxArrProps[] = []
        element.forEach((e, i) => {
          let num = countBombsAround(items, index, i)
          item.push({
            type: e,
            num: num,
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

  // 判断游戏状态
  useEffect(() => {
    setOver(gameType)
  }, [gameType])

  // 处理空白
  const handleSpace = (arr: Array<boxArrProps[][]>, row: number, col: number): void => {
    let list = JSON.parse(JSON.stringify(arr));
    const rows = list.length;
    const cols = list[0].length;
    const spread = (r: number, c: number) => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || list[r][c].left === 1) {
        return;
      }
      const bomb = list[r][c].num
      list[r][c].content = bomb ? bomb : null;

      list[r][c].left = 1;
      list[r][c].bgClass = 'from-neutral-100 to-neutral-200 hover:from-neutral-300 hover:to-neutral-400';
      list[r][c].contentClass = 'text-2xl text-blue-500 font-bold';

      if (bomb === 0) {
        spread(r - 1, c); // 上
        spread(r + 1, c); // 下
        spread(r, c - 1); // 左
        spread(r, c + 1); // 右
      }
    };
    spread(row, col);
    setBoxArr(list);

    // 判断游戏是否胜利
    setGameWon(list)
  };

  // 左键操作
  const handleLeftClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, pindex: number, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    if (item.right != 0) return; // 右键键已经点击
    let list = [...boxArr]

    if (item.type == 1) { // 点击了炸弹
      list[pindex][index].left = 1
      // 更新数据状态
      setBoxArr(list)
      // 游戏结束
      setGameOver(list)
      return
    } else {
      // 处理邻近单元格
      handleSpace(list, pindex, index)
    }
  }

  // 右键操作
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: boxArrProps, pindex: number, index: number) => {
    event.preventDefault();
    if (over) return  // 游戏已结束
    if (item.left != 0) return; // 左键已经点击
    let list = [...boxArr]
    let count = item.right
    if (count == 0) { // 标记：地雷
      list[pindex][index].right = 1
      list[pindex][index].content = '🚩'
      list[pindex][index].bgClass = 'from-yellow-100 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400'
      // 判断游戏是否胜利
      setGameWon(list)
    } else if (count == 1) { // 标记：不确定
      list[pindex][index].right = 2
      list[pindex][index].content = "❓"
      list[pindex][index].bgClass = 'from-green-100 to-green-200 hover:from-green-300 hover:to-green-400'
    } else {
      list[pindex][index].right = 0
      list[pindex][index].content = null
      list[pindex][index].bgClass = 'from-blue-500 to-blue-500 hover:from-blue-500 hover:to-blue-500'
    }
    setBoxArr(list)
  };

  // 游戏结束
  const setGameOver = (arr: any[]) => {
    // 游戏结束
    setOver(true)

    const updatedList = arr.map((element) => {
      let item = element.map((e: boxArrProps) => {
        if (e.type === 1) {
          return {
            ...e,
            content: '💣',
            contentClass: 'text-3xl animate-explode',
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
              content: '💥',
              contentClass: 'text-3xl',
              bgClass: 'bg-neutral-800'
            };
          }
          return e
        })
        return item;
      });

      setBoxArr(newList);
      handleGameOver(true); // 游戏结束
    }, 1000);
  }

  // 游戏胜利
  const setGameWon = (arr: any[]) => {
    let isOver = (list: any[]) => {
      // 遍历每个单元格
      for (let row of list) {
        for (let cell of row) {
          // 如果有一个不是炸弹且还没有被揭露的单元格，游戏还没有赢
          if (cell.type === 0 && cell.left !== 1) {
            return false;
          }
        }
      }
      // 所有非炸弹单元格都被揭露，既是赢了游戏
      return true;
    }
    if (isOver(arr)) {
      handleGameWon(true)
    }
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
              className={`size-8 xs:size-10 m-1 shadow shadow-blue-600/50 rounded transform transition duration-300 ease-in-out flex justify-center items-center hover:scale-110 bg-gradient-to-br ${item.bgClass}`}>
              <span className={`text-2xl ${item.contentClass}`}>{item.content}</span>
            </div>
          ))
        }
      </div>
    ))
  )
}
export default Box
