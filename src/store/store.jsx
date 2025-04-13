import { create } from 'zustand'
import axios from "axios";

const useStore = create((set) => ({
  bears: 0,
  demand: 0,
  distance:0,
  traffic:0,
  weather:0,
  session_id:"",
  increasePopulation: () => set((state) => ({ bears: state.bears + 10 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  updateSession:(ses) => set({session_id :ses}),
  updateState: (newState) => set({demand : newState.demand ,distance : newState.distance ,traffic : newState.traffic,weather : newState.weather }),
  updateDistance : (newState) => set({distance : newState}),
  updateTraffic : (newState) => set({traffic : newState}),
  updateWeather : (newState) => set({weather : newState}),
  updateDemand : (newState) => set({demand : newState}),

  //updateState: (newState) => set({ ...newState })
}))

export function BearCounter() {
    const bears = useStore((state) => state.bears)
    return bears;
}

export function GetSessionId(){
  const session = useStore((state) => state.session_id)
  return session;
}

export function sessionData(){
  const sessionData = useStore((state) => state)
  return sessionData;
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
    getStateFromDB()
    const updateBears = useStore.getState().updateBears; 
    updateBears(res.data); 
  } catch (err) {
    console.error("Error fetching price:", err.message);
  }
}

export function SetSessionId(session_id) {
  try {
    const updateSession = useStore.getState().updateSession;
    updateSession(session_id); 
  } catch (err) {
    console.error("Error setting Session:", err.message);
  }
}

export function updateDistance(state){
  const updateDistance = useStore.getState().updateDistance;
  updateDistance(state);
}

export function updateTraffic(state){
  const updateTraffic = useStore.getState().updateTraffic;
  updateTraffic(state);
}

export function updateWeather(state){
  const updateWeather = useStore.getState().updateWeather;
  updateWeather(state);
  updateState()
}

export function updateDemand(state){
  const updateDemand = useStore.getState().updateDemand;
  updateDemand(state);
  updateState()
}

export async function updateState(){
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${API_URL}/Price/getPrice`); 

  const updateBears = useStore.getState().updateBears; 
  updateBears(res.data); 
}

async function getStateFromDB(){
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const dem = await axios.get(`${API_URL}/Price/getState?value=demand`); 
  const tra = await axios.get(`${API_URL}/Price/getState?value=traffic`); 
  const wae = await axios.get(`${API_URL}/Price/getState?value=weather`);  

  updateDemand(dem.data);     
  updateTraffic(tra.data);   
  updateWeather(wae.data);    
}