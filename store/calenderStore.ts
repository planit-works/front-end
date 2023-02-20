import { create } from 'zustand';

interface CalenderState {
  year: number;
  month: number;
  day: number;
  setDay: () => void;
}
