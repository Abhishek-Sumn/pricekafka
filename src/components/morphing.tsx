import { MorphingText } from "./magicui/morphing-text";

const texts = [
  "Kafka",
  "Event",
  "Services",
  ".NET",
  "Mysql"
 
];

export function MorphingTextDemo() {
  return <MorphingText texts={texts} />;
}
