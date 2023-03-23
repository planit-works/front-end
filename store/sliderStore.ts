import { create } from 'zustand';

interface SliderState {
  isFormSlider?: boolean;
  isUpdateCheckerSlider?: boolean;
  hiddenOfFormSlider: boolean;
  setFormSlider: (value: boolean) => void;
  setUpdateCheckerSlider: (value: boolean) => void;
  setHidden: (value: boolean) => void;
}

const sliderStore = create<SliderState>()((set) => ({
  isFormSlider: undefined,
  isUpdateCheckerSlider: false,
  hiddenOfFormSlider: true,
  setFormSlider: (value) =>
    set({
      isFormSlider: value,
    }),
  setUpdateCheckerSlider: (value) =>
    set({
      isUpdateCheckerSlider: value,
    }),
  setHidden: (value) =>
    set({
      hiddenOfFormSlider: value,
    }),
}));
export default sliderStore;
