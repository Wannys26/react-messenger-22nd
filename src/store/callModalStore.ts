import { create } from 'zustand';

interface CallModalState {
  isCallModalOpen: boolean;
  openCallModal: () => void;
  closeCallModal: () => void;
}

export const useCallModalStore = create<CallModalState>((set) => ({
  isCallModalOpen: false,
  openCallModal: () => set({ isCallModalOpen: true }),
  closeCallModal: () => set({ isCallModalOpen: false }),
}));

