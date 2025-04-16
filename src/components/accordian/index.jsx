import { useState } from "react";
import data from "./data.js";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelectedItems, setMultiSelectedItems] = useState([]);

  // Single selection handler
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);  
  }

  // Multi selection handler
  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiSelectedItems];
    const findIndexofCurrentId = copyMultiple.findIndex(id => id === getCurrentId);

    if (findIndexofCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexofCurrentId, 1);
    }

    setMultiSelectedItems(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {/* Conditional rendering based on mode */}
              {enableMultiSelection
                ? multiSelectedItems.includes(dataItem.id) && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data Found!</div>
        )}
      </div>
    </div>
  );
}
