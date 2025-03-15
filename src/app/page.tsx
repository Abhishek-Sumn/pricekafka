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
export default function Home() {



  return (

    <div className="">
      {/* <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-150 inset-y-[0%] h-[100%] w-screen skew-y-12",
        )}
      /> */}


      <BackgroundLines className="fixed bg-background ">
        <div></div>
      </BackgroundLines>
      
      <div className="relative flex justify-between  pl-5 pr-24 flex-col mt-19 sm:flex-row sm:mt-0 ">

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
            <DrawerDemo/>
            </div>

      </div>



      <div className="fixed  top-0 left-0 p-4">
        <MorphingTextDemo />
      </div>





    </div>
  );
}
