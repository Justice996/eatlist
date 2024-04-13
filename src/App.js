import './App.css';
import {useState,useRef} from "react";
import { LuckyWheel } from '@lucky-canvas/react'





 function getRandomValuesFromArray(arr , count=2){
     const shuffledArray = arr.slice(); // 复制数组，避免修改原数组
     const randomValues = [];

     // 使用 Fisher-Yates 洗牌算法对数组进行随机排列
     for (let i = shuffledArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
     }

     // 从洗牌后的数组中取出前count个值作为随机值
     for (let i = 0; i < count && i < shuffledArray.length; i++) {
         randomValues.push(shuffledArray[i]);
     }

     return randomValues;
 }
function App() {
  const [a, setA] = useState(2); // 使用useState初始化'a'变量的值为1

  const incrementA = () => {
    setA(a + 1); // 使用setA来更新'a'的值，这会触发重新渲染
  };
    const minA = () => {
         if(a>1){
             setA(a - 1);
         }
    };
    const [blocks] = useState([
        { padding: '10px', background: '#869cfa' }
    ])
    // 清炒生菜球
    // 清炒生菜球
    // 辣椒炒肉
    // 白灼菜心
    // 黄瓜炒鸡蛋
    // 西红柿炒蛋
    // 红烧鲤鱼
    // 辣椒炒鸡蛋
    // 红烧排骨
    // 黄焖鸡
    // 菜花炒肉
    // 清炒菜花
    // 红烧茄子
    // 白灼秋葵
    // 清蒸鲈鱼
    // 清炒西葫芦
    // 蒜黄炒鸡蛋
    const list = [{
        id:1,
        text:'清炒生菜球'
    },{
        id:2,
        text:'黄焖鸡'
    },{
        id:3,
        text:'红烧茄子'
    },{
        id:4,
        text:'清炒西葫芦'
    },{
        id:5,
        text:'辣椒炒鸡蛋'
    }];

    const [prizes] = useState([
        { background: '#e9e8fe', fonts: [{ text: '清炒生菜球' }] },
        { background: '#b8c5f2', fonts: [{ text: '清炒生菜球' }] },
        { background: '#e9e8fe', fonts: [{ text: '红烧茄子' }] },
        { background: '#b8c5f2', fonts: [{ text: '蒜黄炒鸡蛋' }] },
        { background: '#e9e8fe', fonts: [{ text: '黄焖鸡' }] },
        { background: '#b8c5f2', fonts: [{ text: '白灼秋葵' }] },
    ])
    const [buttons] = useState([
        { radius: '40%', background: '#617df2' },
        { radius: '35%', background: '#afc8ff' },
        {
            radius: '30%', background: '#869cfa',
            pointer: true,
            fonts: [{ text: '开始', top: '-10px' }]
        }
    ])
    const myLucky = useRef()

    const [randomValues, setRandomValues] = useState([]);

    const handleClick = () => {
        const values = getRandomValuesFromArray(list, a);
        setRandomValues(values);
    };
  return (
      <div className="App">
          <h1>今天吃什么</h1>
          <p>选择做几道菜</p>
          <div className="changeNumberBox">
              <div className='left' onClick={incrementA}>+</div>
              <div className="center">{a}</div>
              <div className='right' onClick={minA}>-</div>
          </div>
          <div className="box">
              <div className="btn" onClick={handleClick}>随机一下
              </div>
          </div>
          <ul>
              {randomValues.map((value) => (
                  <li>{value.text}</li>
              ))}
          </ul>
          <div className="toCenter">
              <LuckyWheel
                  ref={myLucky}
                  width="300px"
                  height="300px"
                  blocks={blocks}
                  prizes={prizes}
                  buttons={buttons}
                  onStart={() => { // 点击抽奖按钮会触发star回调
                      myLucky.current.play()
                      setTimeout(() => {
                          const index = Math.random() * 6 >> 0
                          myLucky.current.stop(index)
                      }, 2500)
                  }}
                  onEnd={prize => { // 抽奖结束会触发end回调
                      alert('今天吃' + prize.fonts[0].text)
                  }}
              />
          </div>

      </div>
  );
}

export default App;
