'use client';
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BearCounter,Cont } from "@/store/store";
import { useStore } from "zustand";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { SetUpdatedPrice } from "@/store/store";

export function RadioGroupComp() {
    const handleCont = Cont();
    const handleUpdateDistance = async (totalDistance: number) => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL; // Fetch environment variable
    
        if (!API_URL) {
          throw new Error("API URL is not defined in environment variables.");
        }
        const res = await axios.get(`${API_URL}/Price/updateTraffic`, {
          params: { traffic: totalDistance }, // Query parameter
          headers: { Accept: "*/*" }, // Optional, replicating cURL headers
        });
    
        await SetUpdatedPrice();
        toast.success("Traffic Condition Updated Succesfully");
  
      } catch (err: any) {
        toast("Error occurred:", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(err, null, 2)}</code>
            </pre>
          ),
        });
      }
    };
  return (
    <div>
      <ul className="w-48 text-sm font-medium  rounded-lg  dark:border-gray-600 text-white">
        {[
          { id: "1", label: "Free Flow" , value : 1},
          { id: "2", label: "Light Traffic" ,value : 2},
          { id: "3", label: "Moderate Traffic" ,value : 3},
          { id: "4", label: "Heavy Traffic" ,value : 4},
          { id: "5", label: "Severe Traffic",value : 5 },
          { id: "6", label: "Gridlock",value : 6 },
        ].map((item) => (
          <li key={item.id} className="w-full text-white">
            <div className="flex items-center ps-3">
              <input
                id={item.id}
                type="radio"
                name="list-radio"
                className="text-white w-4 h-3  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={() => handleUpdateDistance(item.value)}
                />
              <label
                htmlFor={item.id}
                className="w-full py-1.5 ms-2 text-sm font-medium dark:text-gray-300 text-white"
              >
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
