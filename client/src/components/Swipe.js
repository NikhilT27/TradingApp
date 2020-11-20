import React, { useState } from "react";
import {
  SearchIcon,
  XCircleFillIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@primer/octicons-react";

export default function Swipe() {
  const [swipeUp, setSwipeUp] = useState(false);

  return (
    <div className="swipe-box">
      <div className={swipeUp ? "swipe-up" : "swipe-down"}>
        <div>
          {!swipeUp && (
            <button className="swipe-title" onClick={() => setSwipeUp(true)}>
              <ChevronUpIcon size={16} />
            </button>
          )}
          {swipeUp && (
            <button className="swipe-title" onClick={() => setSwipeUp(false)}>
              <ChevronDownIcon size={16} />
            </button>
          )}
        </div>
        <div>
          {swipeUp ? <h4>Portfolio</h4> : <h4>Swipe to view your Portfolio</h4>}
        </div>
      </div>
    </div>
  );
}
