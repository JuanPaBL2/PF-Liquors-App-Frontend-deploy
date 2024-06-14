import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "@/interfaces/interfaz";

export interface ReviewsState {
  data: IReview[];
  userProductReview: IReview[],
}

const initialState: ReviewsState = {
  data: [],
  userProductReview: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    createReviews: (state, action: PayloadAction<IReview>) => {
      state.data.push(action.payload);
    },
    readReviews: (state, action: PayloadAction<IReview[]>) => {
      state.data = state.data.concat(action.payload);
    },
    clearReviews: (state) => {
      state.data = [];
    },
    userReadReviews: (state, action: PayloadAction<IReview[]>) => {
      state.userProductReview = state.userProductReview.concat(action.payload);
    },
    userClearReviews: (state) => {
      state.userProductReview = [];
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((review) => review.id !== action.payload);
    },
    updateReviews: (state, action: PayloadAction<IReview>) => {},
    deleteReviews: (state, action: PayloadAction<string>) => {},
  },
});

export const {
  createReviews,
  readReviews,
  clearReviews,
  removeReview,
  updateReviews,
  deleteReviews,
  userReadReviews,
  userClearReviews
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
