import { create } from 'zustand'
import axios from "axios";
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 10 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  
}))

export function BearCounter() {
    const bears = useStore((state) => state.bears)
    return bears;
  }
  
export function Controls() {
    const increasePopulation = useStore((state) => state.increasePopulation)
    return <button onClick={increasePopulation}>one up</button>
}

export function Cont() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return () => increasePopulation();
}

export async function SetUpdatedPrice() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error("API URL is not defined.");

    const res = await axios.get(`${API_URL}/Price/getPrice`); 

    const updateBears = useStore.getState().updateBears; 
    updateBears(res.data); 
  } catch (err) {
    console.error("Error fetching price:", err.message);
  }
}
  