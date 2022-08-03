import React , { useEffect, useState } from 'react';
import './App.css';


function App() {
    const [floors,setFloors] = useState(createFloors(9,[]));
    const [direction, setDirection] = useState(null);
    const [currentFloor, setCurrentFloor] = useState(1);
    const [queue, setQueue] = useState([]);
    const [arrived, setArrived] = useState(false);
    
    
  
    useEffect(() => {
      if (!arrived){
          if(queue.includes(currentFloor)) {
            const currentQueue = [...queue];
            currentQueue.splice(currentQueue.indexOf(currentFloor,0),1);
            setDirection(null);
            setQueue(currentQueue);
            setArrived(true);
            setTimeout(() => {
              setArrived(false)
            }, 3000);
          }
          else if(queue[0] > currentFloor){
            setDirection(true);
            setTimeout(() => {setCurrentFloor(currentFloor + 1)},1000);
          }
          else if(queue[0] < currentFloor){
            setDirection(false);
            setTimeout(() => {setCurrentFloor(currentFloor - 1)},1000);
          }
      }
    },[arrived,queue,currentFloor])

    function createFloors(num,levels){
      if (num === 0){
        return levels;
      }
      levels = [...levels,{
        number: num,
        current: false,
      }];
      return createFloors(num-1,levels);
    }

    const handleClick = (floorNumber) => {
      if (!queue.includes(floorNumber)){
        setQueue([...queue,floorNumber]);
      }
    }

    const floorsUI = floors.map(item => {
      return(
        <FloorItem
            key = {item.number}
            number = {item.number}
            currentFloor = {currentFloor}
            queue = {queue}
            onClick = {() => handleClick(item.number)}
        />
      )
    });
    return (
      <div className="App">
        <h4>{currentFloor} {direction ? "ᐃ" : (direction === false ? "ᐁ" : "--") }
        </h4>
          {floorsUI}
      </div>
    );
}

function FloorItem(props){
  const thisFloorIsCurrent = props.number === props.currentFloor ? true : false;

  return(
    <div>
      <button 
        className={thisFloorIsCurrent ? 'currentFloor' : (props.queue.includes(props.number) ? 'floor-in-queue' : 'floor')}
        onClick={() => (thisFloorIsCurrent ? {} : props.onClick())}
        >
          {props.number}
      </button>
    </div>
  )
}

export default App;
