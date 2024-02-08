import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const NAME = 'Dashboard';

type Post = {
  id: number,
  user_id: number,
  title: string,
  description: string
}

type InitialStateTypes = {
  posts: Post[]
}

const initialState: InitialStateTypes = {
  posts: []
};

const DashboardSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    }
  },
});

const { reducer, actions } = DashboardSlice;

export const DashboardActions = actions;
export default { [NAME]: reducer };