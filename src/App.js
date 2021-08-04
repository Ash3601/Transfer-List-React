import "./App.css";
import CheckBox from "./CheckBox";
import "./style.css";
import React, { useState } from "react";

let rightList = [100, 200, 300, 400, 500];
let idxToBeRemovedLeft = [];
let eventToBeRemoved = [];
let leftList = [1, 2, 3, 4, 5];
function App() {
  const [leftListState, setLeftListState] = useState(leftList);
  const [rightListState, setRightListState] = useState(rightList);
  const getIndexOfCheckedBoxes = (e) => {
    const id = e.target.id.slice(4);
    if (idxToBeRemovedLeft.includes(parseInt(id))) {
      return;
    }
    idxToBeRemovedLeft.push(parseInt(id));
    eventToBeRemoved.push(e);
  };

  function removeAllIndices() {
    let newList = [];
    for (let i = 0; i < leftList.length; i++) {
      if (idxToBeRemovedLeft.includes(i)) {
        continue;
      } else {
        newList.push(leftList[i]);
      }
    }
    eventToBeRemoved.forEach((event) => {
      rightList.push(event.target.value);
    });

    for (let i = 0; i < eventToBeRemoved.length; i++) {
      let event = eventToBeRemoved[i];
      event.target.checked = false;
    }
    setLeftListState([...newList]);
    setRightListState([...rightList]);
    leftList = newList;
    idxToBeRemovedLeft = [];
    eventToBeRemoved = [];
  }

  const renderLeftList = leftListState.map((value, idx) => (
    <CheckBox
      idx={idx}
      id={idx}
      value={value}
      key={idx}
      getIndexOfCheckedBoxes={getIndexOfCheckedBoxes}
    />
  ));

  const renderRightList = rightList.map((value, idx) => (
    <CheckBox id={idx} value={value} key={idx} />
  ));
  return (
    <React.Fragment>
      <div className="container">
        <div className="box1">
          <button className="check-all" id="check-all-left">
            Check All
          </button>
          <div id="checkboxes-left">{renderLeftList}</div>
        </div>
        <div className="box2">
          <button className="check-all" id="check-all-right">
            Check All
          </button>
          <div id="checkboxes-right">{renderRightList}</div>
        </div>
      </div>
      <div className="btn-grp">
        <button id="btn-left" className="btn" onClick={removeAllIndices}>
          &lt;
        </button>
        <button className="btn" id="btn-right">
          &gt;
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
