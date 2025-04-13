import { useState, useEffect } from "react";
import { BearCounter,sessionData } from "@/store/store"; // Zustand store

export default function Counter() {
  const s = sessionData();
  const counter = BearCounter((state) => state.count);
  const [count, setCount] = useState(counter); 
  useEffect(() => {
    if (count !== counter) {
      const step = counter > count ? 1 : -1;
      const interval = setInterval(() => {
        setCount((prev) => {
          if ((step > 0 && prev >= counter) || (step < 0 && prev <= counter)) {
            clearInterval(interval);
            return counter;
          }
          return prev + step;
        });
      }, 10); // Animation speed

      return () => clearInterval(interval);
    }
  }, [counter]); 

  return (
      
      <div className="text-4xl font-bold flex items-center justify-center">
        ₹ {count} 
      </div>
  );
}
