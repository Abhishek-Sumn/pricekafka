import { useState, useEffect } from "react";
import { BearCounter } from "@/store/store"; // Zustand store

export default function Counter() {
  const counter = BearCounter((state) => state.count); // Access Zustand count
  const [count, setCount] = useState(counter); // Local count for animation

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
  }, [counter]); // Reacts whenever `counter` changes in Zustand

  return (
      
      <div className="text-4xl font-bold flex items-center justify-center">
        ₹ {count}
      </div>
  );
}
