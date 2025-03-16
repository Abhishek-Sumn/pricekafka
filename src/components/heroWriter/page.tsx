"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "In",
    },
    {
      text: "Reality",
    },
    {
      text: "these",
    },
    {
      text: "events",
    },
    {
      text: "gets",
    },
    {
      text: "produced",
    },
    {
      text: "by",
    },
    {
      text: "services",
    },
    {
      text: "producing",
    },
    {
      text: "kafka",
    },
    {
      text: "events",
    },
    {
      text: "eventually",
    },
    {
      text: "updating",
    },
    {
      text: "price",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
      <TypewriterEffect words={words} />
  );
}
