"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import axios from "axios";
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { SetUpdatedPrice,sessionData } from "@/store/store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export  function DrawerDemo() {
  const session = sessionData();

  const [goal, setGoal] = React.useState(session.distance);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    async function f(){
      const res = await axios.get(`${API_URL}/Price/getState?value=distance`);
      setGoal(res.data);
    };
    f();
  }, []);

  const handleUpdateDistance = async (totalDistance: number) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL; // Fetch environment variable
  
      if (!API_URL) {
        throw new Error("API URL is not defined in environment variables.");
      }
  
       await axios.get(`${API_URL}/Price/updateDistance`, {
        params: { Distance: totalDistance }, // Query parameter
        headers: { Accept: "*/*" }, // Optional, replicating cURL headers
      });
  
      await SetUpdatedPrice();
      toast.success("Distance Updated Succesfully");

    } catch (err : unknown) {
      toast.error("Error ", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              {err instanceof Error ? JSON.stringify(err.message, null, 2) : 'Unknown error'}
          </pre>
        ),
      });
    }
  };

  
  function onClick(adjustment: number) {
    setGoal(Math.max(0, Math.min(20, goal + adjustment)))
    
  }

  return (
    <Drawer >
      <DrawerTrigger asChild>

        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Set Distance
          </div>
        </button>

        
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Distance</DrawerTitle>
            <DrawerDescription>Set approx distance from starting point to destination</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={goal <= 1}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Kilo Meter
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={goal >= 20}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
           
            <DrawerClose asChild>
              <Button onClick={ () => handleUpdateDistance(goal)}>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
