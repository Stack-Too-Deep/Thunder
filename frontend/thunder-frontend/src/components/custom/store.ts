import {create} from 'zustand';

type State = {
  creditScore: string;
};

export const useStore = create<State>((set) => ({
  creditScore: '',
}));
