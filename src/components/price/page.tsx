import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  const fetchCount = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://localhost:7204/Price/getPrice"); 
      const data = await response.json();
      console.log(data)
      if (data !== undefined) {
        setTarget(data); // Set new target value
      }
    } catch (error) {
      console.error("Error fetching counter value:", error);
    }
  };

  useEffect(() => {
    if (count !== target) {
      const step = target > count ? 1 : -1;
      const interval = setInterval(() => {
        setCount((prev) => {
          if ((step > 0 && prev >= target) || (step < 0 && prev <= target)) {
            clearInterval(interval);
            return target;
          }
          return prev + step;
        });
      }, 50); // Speed of counter animation

      return () => clearInterval(interval);
    }
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-4xl font-bold">{count}</div>
      <button
        onClick={fetchCount}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Fetch & Update Counter
      </button>
    </div>
  );
}
