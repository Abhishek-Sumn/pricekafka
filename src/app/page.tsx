'use client'
import { MorphingTextDemo } from "@/components/morphing";
import { BackgroundLines } from "@/components/ui/background-lines";
import {DrawerDemo} from "@/components/drawer/page";
import { SelectForm } from "@/components/select/page";
import { FloatingDockDemo } from "@/components/floatingDeck/page";
import { TypewriterEffectDemo } from "@/components/heroWriter/page";
import Counter from "@/components/price/page";
import {SetUpdatedPrice } from "@/store/store"
import { RadioGroupComp } from "@/components/radio/page";
import { useEffect,useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SetSessionId } from "@/store/store";

export default function Home() {
const [showBanner, setShowBanner] = useState(true);
  useEffect(() => {
    let storedSessionId = localStorage.getItem("session_id");

    if (!storedSessionId) {
      storedSessionId = uuidv4(); // Generate new session_id
      localStorage.setItem("session_id", storedSessionId);
    }

    SetSessionId(storedSessionId); 
    
  }, []);

  useEffect(() => {
    SetUpdatedPrice(); // this updates the Zustand store from your API
  }, []);

  return (

    <div className="">

      <div>
       <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 w-full max-w-md text-center md:hidden transition-opacity duration-500 ${
          showBanner ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm sm:text-base">Not yet fully optimized for mobile, but you can use core functionality!</p>
        <button
          className="mt-2 bg-white text-blue-500 px-4 py-2 rounded"
          onClick={() => setShowBanner(false)}
        >
          Close
        </button>
      </div>
        
      </div>

      
      <BackgroundLines className="fixed bg-background ">
        <div></div>
      </BackgroundLines>

      <div className="relative mt-[8%] -mb-[4%]">
      <TypewriterEffectDemo/>

      </div>
      <div className="relative flex justify-between  pl-5 pr-24 flex-col  sm:flex-row sm:mt-0 ">

            <div className="flex items-center justify-center">
            <SelectForm/>
            </div>

            <div className="flex items-center justify-center">
            <FloatingDockDemo/>
            </div>

            <div className="flex items-center justify-center">
            <DrawerDemo/>
            </div>

            <div className="flex items-center justify-center">
            <RadioGroupComp/>
            </div>

      </div>
      <div className="relative">
        <Counter/>
      </div>
    

      <div className="fixed  top-0 left-0 p-4">
        <MorphingTextDemo />
      </div>





    </div>
  );
}
