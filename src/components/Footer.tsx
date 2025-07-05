// SheetFooter.tsx
import { useState } from "react";

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

function SheetFooter() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex items-center z-10">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          onClick={() => setActiveIndex(idx)}
          className={`relative px-4 py-1 text-sm font-medium mr-2 transition
            ${activeIndex === idx
              ? "text-[#3E5741] font-semibold bg-[#e4ede6]"
              : "text-gray-600 hover:text-black"
            }
          `}
        >
          {/* Top border indicator */}
          {activeIndex === idx && (
            <span className="absolute top-0 left-0 w-full h-[3px] bg-[#4B6A4F] rounded-sm" />
          )}
          {tab}
        </button>
      ))}

      <button
        onClick={() => {
          const newTab = `Tab ${tabs.length + 1}`;
          tabs.push(newTab); // Optionally replace with state if you want dynamic addition
          setActiveIndex(tabs.length - 1);
        }}
        className="ml-2 text-lg text-gray-600 hover:text-black font-bold"
      >
        +
      </button>
    </div>
  );
}

export default SheetFooter;
