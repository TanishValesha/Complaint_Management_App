import { create } from "zustand";

interface UserInterface {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserStore {
  user: UserInterface | null;
  setUser: (userData: UserInterface) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
