import React from 'react'
import './style.css'
function CheckBox(props) {
  // console.log(props);
    let {id, value, getIndexOfCheckedBoxes, checked} = props;
    // getIndexOfCheckedBoxes(id);
    id = 'cbox' + id;
    return (
        <div id={id} className="cbox">
          <input type="checkbox" checked={checked} name={id} id={id} value={value} onChange={getIndexOfCheckedBoxes}/>
          <label htmlFor={id}>{value}</label><br />
        </div>
)
}

export default CheckBox
