'use client'
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../components/magicui/interactive-grid-pattern";
import { MorphingTextDemo } from "@/components/morphing";
import { AnimatedCircularProgressBarDemo } from "@/components/circular-load";
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card-hover-effect";
import { BackgroundLines } from "@/components/ui/background-lines";
import {DrawerDemo} from "@/components/drawer/page";
import { SelectForm } from "@/components/select/page";
import { toast } from 'sonner';
import { FloatingDockDemo } from "@/components/floatingDeck/page";
import { TypewriterEffectDemo } from "@/components/heroWriter/page";
import Counter from "@/components/price/page";
import {BearCounter,Controls,SetUpdatedPrice } from "@/store/store"
import { RadioGroupComp } from "@/components/radio/page";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SetSessionId } from "@/store/store";

export default function Home() {

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

      <div></div>
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
