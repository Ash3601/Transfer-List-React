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
  const [leftDisable, setLeftDisable] = useState(true);
  const [rightDisable, setRightDisable] = useState(true);

  function removeUnCheckedNodeIdx(idx, idxToBeRemovedLeft) {
    let newList = [];
    for (let i = 0; i < idxToBeRemovedLeft.length; i++) {
      let idxToBeRemoved = idxToBeRemovedLeft[i];
      if (parseInt(idxToBeRemoved) === parseInt(idx)) {
        continue;
      } else {
        newList.push(idxToBeRemoved);
      }
    }
    return newList;
  }

  function removeUncheckedNodeEvent(id, eventToBeRemoved) {
    let newList = [];
    for (let i = 0; i < eventToBeRemoved.length; i++) {
      let currentEvent = eventToBeRemoved[i];
      if (parseInt(currentEvent.target.id.substring(4)) === parseInt(id)) {
        continue;
      } else {
        newList.push(currentEvent);
      }
    }
    console.log("Old list", eventToBeRemoved, "new list", newList);
    return newList;
  }
  const getIndexOfCheckedBoxes = (e) => {
    const id = e.target.id.slice(4);
    if (idxToBeRemovedLeft.includes(parseInt(id))) {
      if (e.target.checked) return;
      if (e.target.checked === false) {
        idxToBeRemovedLeft = removeUnCheckedNodeIdx(id, idxToBeRemovedLeft);
        eventToBeRemoved = removeUncheckedNodeEvent(id, eventToBeRemoved);
        return;
      }
    }
    idxToBeRemovedLeft.push(parseInt(id));
    eventToBeRemoved.push(e);
  };

  function removeAllIndicesRight() {
    console.log("In remove all indices right");
    let newList = [];
    for (let i = 0; i < rightList.length; i++) {
      if (idxToBeRemovedLeft.includes(i)) {
        continue;
      } else {
        newList.push(rightList[i]);
      }
    }
    eventToBeRemoved.forEach((event) => {
      leftList.push(event.target.value);
    });

    for (let i = 0; i < eventToBeRemoved.length; i++) {
      let event = eventToBeRemoved[i];
      event.target.checked = false;
    }
    console.log("Newlist: ", newList);
    setRightListState([...newList]);
    setLeftListState([...leftList]);
    rightList = newList;
    idxToBeRemovedLeft = [];
    eventToBeRemoved = [];
  }

  // TODO: Add similiar isLeft condition here so that we would be able to solve it here Only just reverse everything done here
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
      left={"true"}
      idx={idx}
      id={idx}
      value={value}
      key={idx}
      getIndexOfCheckedBoxes={getIndexOfCheckedBoxes}
    />
  ));

  const renderRightList = rightListState.map((value, idx) => (
    <CheckBox
      id={idx}
      value={value}
      key={idx}
      getIndexOfCheckedBoxes={getIndexOfCheckedBoxes}
    />
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
        <button
          className="btn"
          id="btn-right"
          onClick={removeAllIndicesRight}
          // disabled={leftDisable}
        >
          &lt;
        </button>
        <button
          id="btn-left"
          className="btn"
          onClick={removeAllIndices}
          // disabled={rightDisable}
        >
          &gt;
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
