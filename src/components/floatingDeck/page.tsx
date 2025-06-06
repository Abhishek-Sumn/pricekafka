import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Sunny",
      icon: (
        <img src="./sun.svg" width="100" height="100" alt="" />
      ),
      href: "#",
      value: 2
    },

    {
      title: "Cloudy",
      icon: (
        <img src="./cloud.svg" width="100" height="100" alt="" />

      ),
      href: "#",
      value: 4
    },
    {
      title: "Rainy",
      icon: (
        <img src="./rain.svg" width="100" height="100" alt="" />

      ),
      href: "#",
      value: 6
    },

    {
      title: "Night",
      icon: (
        <img src="./yellow-moon.svg" width="100" height="100" alt="" />
      ),
      href: "#",
      value: 8
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
