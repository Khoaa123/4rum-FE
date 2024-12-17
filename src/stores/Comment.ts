import { create } from "zustand";

type CommentStore = {
  idComment: number | null;
  setIdComment: (id: number) => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  idComment: null,
  setIdComment: (id: number) => set({ idComment: id }),
}));
