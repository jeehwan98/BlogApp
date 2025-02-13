import { create } from "zustand";

interface PostState {
  post: {
    title: string;
    tags: string[];
    content: string;
  };
  addTitle: (title: string) => void;
  addTags: (tags: string[]) => void;
  addContent: (content: string) => void;
};

const useEditStore = create<PostState>((set) => ({
  post: {
    title: "",
    tags: [],
    content: "",
  },

  addTitle: (title: string) =>
    set((state) => ({
      post: {
        ...state.post,
        title
      },
    })),

  addTags: (tags: string[]) =>
    set((state) => ({
      post: {
        ...state.post,
        tags,
      },
    })),

  addContent: (content: string) =>
    set((state) => {
      // console.log("Updating Zustand state:", content);
      return {
        post: { ...state.post, content },
      };
    }),
}));

export default useEditStore;