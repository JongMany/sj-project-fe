"use client";

import {MdOutlineTipsAndUpdates} from "react-icons/md";
import React, {useState} from "react";

function TooltipButton() {
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const showToolTip = () => {
    setIsShowToolTip(true);
  }

  const hideToolTip = () => {
    setIsShowToolTip(false);
  }

  return (
      <div>
        <MdOutlineTipsAndUpdates onClick={showToolTip}/>
        {isShowToolTip && <div className="w-[100dvw] h-[100dvh] absolute top-0 left-0 overflow-hidden z-[1]">
          <div onClick={hideToolTip} className="w-[100dvw] h-[100dvh]  bg-[rgba(222,222,222,0.4)]">
          </div>
          <div className={"w-[220px] px-7 py-4 rounded-md absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"}>
            채팅방이 생성되어야 AI의 메모리를 수정할 수 있습니다.
          </div>
        </div>}
      </div>

  );
}

export default TooltipButton;