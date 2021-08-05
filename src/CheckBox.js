import React from "react";
import "./style.css";
function CheckBox(props) {
  // console.log(props);
  let { id, value, getIndexOfCheckedBoxes, checked, left } = props;
  // getIndexOfCheckedBoxes(id);
  id = "cbox" + id;
  return (
    <div id={id} className="cbox">
      <input
        left={left}
        type="checkbox"
        checked={checked}
        name={id}
        id={id}
        value={value}
        onChange={(e) => getIndexOfCheckedBoxes(e, left)}
      />
      <label htmlFor={id}>{value}</label>
      <br />
    </div>
  );
}

export default CheckBox;
