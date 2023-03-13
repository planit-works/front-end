import { create } from 'zustand';

interface SliderState {
  isFormSlider?: boolean;
  isUpdateCheckerSlider?: boolean;
  setFormSlider: (value: boolean) => void;
  setUpdateCheckerSlider: (value: boolean) => void;
}

const sliderStore = create<SliderState>()((set) => ({
  isFormSlider: undefined,
  isUpdateCheckerSlider: false,
  setFormSlider: (value) =>
    set({
      isFormSlider: value,
    }),
  setUpdateCheckerSlider: (value) =>
    set({
      isUpdateCheckerSlider: value,
    }),
}));
export default sliderStore;
