'use client';
import { useEffect, useRef } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { sessionData, SetUpdatedPrice ,updateTraffic } from "@/store/store";


export function RadioGroupComp() {

  const session = sessionData();
  const traffic = session.traffic; // Get traffic value from Zustand store
  const radioRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    if (traffic && radioRefs.current[traffic]) {
      radioRefs.current[traffic]?.focus();
    }
  }, [traffic]);

  const handleUpdateDistance = async (totalDistance: number) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL; 
      if (!API_URL) throw new Error("API URL is not defined in environment variables.");

      await axios.get(`${API_URL}/Price/updateTraffic`, {
        params: { traffic: totalDistance },
        headers: { Accept: "*/*" },
      });

      await SetUpdatedPrice();
      updateTraffic(totalDistance);
      toast.success("Traffic Condition Updated Successfully");
    } catch (err: unknown) {
      toast.error("Error :", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
       <code className="text-white">
          {JSON.stringify(
            err instanceof Error ? err.message : 'Unknown error',
            null,
            2
          )}
        </code>
          </pre>
        ),
      });
    }
  };

  return (
    <div>
      <ul className="w-48 text-sm font-medium rounded-lg text-white">
        {[
          { id: 1, label: "Free Flow" },
          { id: 2, label: "Light Traffic" },
          { id: 3, label: "Moderate Traffic" },
          { id: 4, label: "Heavy Traffic" },
          { id: 5, label: "Severe Traffic" },
          { id: 6, label: "Gridlock" },
        ].map((item) => (
          <li key={item.id} className="w-full text-white">
            <div className="flex items-center ps-3">
              <input
                id={`radio-${item.id}`}
                ref={(el) => {
                  radioRefs.current[item.id] = el;
                }}
                type="radio"
                name="list-radio"
                className="text-white w-4 h-3 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={() => handleUpdateDistance(item.id)}
                checked={traffic === item.id}
              />
              <label
                htmlFor={`radio-${item.id}`}
                className="w-full py-1.5 ms-2 text-sm font-medium dark:text-gray-300 text-white"
              >
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

