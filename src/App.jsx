import './App.css';
import React, { useEffect, useState } from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

function Square({value,onSquareClick}) {
  return (
   <>
    <button onClick={onSquareClick} className="box">
    {value === 'X'? <span style={{color:'#ff0a54',fontWeight:'650'}}>{value}</span>: <span style={{color:'blue',fontWeight:'650'}}>{value}</span>}
    </button>
   </>
  );
};


function Grid({isPlayerX,squares,updateHistoryArr,updateScore}){
  
  const calculateWinner = ()=>{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (i)=>{
    if(squares[i] != null)
      return;

    const prevSquares = [...squares];
    if(isPlayerX){
      prevSquares[i] = 'X';
    }
    else{
      prevSquares[i] = 'O';
    }
    updateHistoryArr(prevSquares);
  }

  const winner = calculateWinner();
  let status = null;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isPlayerX ? "X" : "O");
  }

  useEffect(()=>{
    updateScore(winner);
  },[winner]);

  return (<>
  <div className="grid-container-wrapper">
  {/* <div className="grid-container"> */}
  <div className="status">{status}</div>
  <div className="grid-items">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  </div>
  </div>
  {/* </div> */}
  </>);
};

// const MoveList = ({moves,jumpToMove})=>{

//   return(<>
//     <ul>
//     {moves.map((move,index)=>{
//         const description = `Goto move ${index}`;
//         return <li key={index}><button onClick={()=>jumpToMove(index)}>{description}</button></li> 
//       })}
//     </ul>
//   </>);
// };

function ScoreBar({scores}) {
  return (
    <>
    <div className="score-bar-outer-container outline flex-justify-evenly">
        <div className="heading-container position-center"> YOUR SCORES</div>
        <div className="scores-container flex-justify-evenly outline">
            <div className="score"> <span style={{color:'red',fontWeight:'650',fontSize:"1.4rem"}}>X</span>: <span className='points-text'>{scores['X']}</span></div>
            <div className="score">  <span style={{color:'blue',fontWeight:'650',fontSize:"1.4rem"}}>O</span>:<span className='points-text'>{scores['O']}</span></div>
        </div>
    </div>
    </>
  )
};

function IconGroup({onIconClick}) {
  // console.log("current move : ",currentMove);
  return (
    <>
        <div className="icon-group-container">
        <button className='icon-button' onClick={()=>onIconClick("undo")}><UndoIcon/></button>
        <button className='icon-button' onClick={()=>onIconClick("redo")}><RedoIcon/></button>
        </div>
    </>
  )
};

export default function Game(){

  const [historyArr,setHistoryArr] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const latestArr = historyArr[currentMove];
  const isPlayerX = currentMove%2 === 0;
  const [scores,setScores] = useState({
    'X':0,
    'O':0
  });

  // const [isDisabled,setIsDisabled] = useState({
  //   'undo':true,
  //   'redo':true
  // });

  const startNewMatch = ()=>{
    setHistoryArr([Array(9).fill(null)]);
    setCurrentMove(0);
  };
  
  const updateHistoryArr = (newSquares)=>{
    const nextHistory = [...historyArr.slice(0,currentMove+1),newSquares];
    setHistoryArr(nextHistory);
    setCurrentMove(nextHistory.length-1);
    // if(historyArr.length >= 1) 
    //   setIsDisabled({...isDisabled,'undo':false});
      
  };

  const updateScore = (winner)=>{

    if(winner === null) return;

    switch (winner) {
      case 'X':
        setScores({...scores,'X':scores['X']+1});
        break;
      case 'O':
        setScores({...scores,'O':scores['O']+1});
        break;
      default: console.log("default case runned.");
        break;
    }

    setTimeout(()=>{
      alert("start new match")
      startNewMatch();
    },500);
  };

  // const jumpToMove = (index)=>{
  //   setCurrentMove(prev => index);
  // };

  const handleUndoRedo = (action)=>{
    switch (action) {
      case "undo":
        // if(clicksCount['undo'] === 0) break; 
        // if(currentMove === 1) setIsDisabled({...isDisabled,'undo':true});
        // if(currentMove >1) setIsDisabled({...isDisabled,'redo':false});
        // clicksCount = {...clicksCount,'undo':clicksCount.undo - 1};
        // jumpToMove(clicksCount["undo"]);

        // if(currentMove  === 1) {
        //   setIsDisabled({...isDisabled,'undo':true});
        //  }
        // else if(currentMove >1){
        //   setIsDisabled({...isDisabled,'redo':false});
        // }

        if(currentMove === 0) return;
        setCurrentMove(currentMove - 1);
        break;

      case "redo":
      
      // if(clicksCount['redo']+1 === historyArr.length-1){ 
      //   setIsDisabled({...isDisabled,'redo':true}); 
      // }
      //   if(clicksCount['redo'] >= historyArr.length-1){ 
      //     break; 
      //   }
      //   else {
      //   setIsDisabled({...isDisabled,'undo':false});
      //   setIsDisabled({...isDisabled,'redo':false});
      // }

      // if(currentMove+1 >= historyArr.length-1){
      //   setIsDisabled({...isDisabled,'redo':true}); 
      // }
      // else{
      //   setIsDisabled({...isDisabled,'undo':false});
      //   setIsDisabled({...isDisabled,'redo':false});
      // }

        // clicksCount = {...clicksCount,'redo':clicksCount.redo + 1};
        // jumpToMove(clicksCount["redo"]);
        if(currentMove >= historyArr.length-1) return;
        setCurrentMove(currentMove+1);
        break;
    }
  }

  return(<>
    <div className="cover-container">
    <ScoreBar scores={scores}/>
    <Grid isPlayerX={isPlayerX} squares = {latestArr} updateHistoryArr = {updateHistoryArr} updateScore = {updateScore}/>
    {/* <MoveList moves = {historyArr} jumpToMove={jumpToMove}/> */}
    <IconGroup  onIconClick={handleUndoRedo}/>
    </div>
    <div className='footer'><div className='content'>
    TIC-TAC-TOE  by - Kunal Saini</div></div>
  </>);
}