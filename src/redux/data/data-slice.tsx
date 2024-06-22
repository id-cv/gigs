import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { setAlert } from "../components/components-slice";

import { singleListingData } from "../../utils/mockdata";
import { getRequestError } from "../../utils/functions";

type Props = {};
export const initialState: Props = {};

// Slice
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
export default slice.reducer;

export const getListingsAction = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`);

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = getRequestError(error);
    dispatch(setAlert(true, "error", errorMessage));
  }
};

export const getSingleListingAction = (id: string) => async (dispatch: any) => {
  try {
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);

    return { success: true, data: singleListingData };
  } catch (error) {
    const errorMessage = getRequestError(error);
    dispatch(setAlert(true, "error", errorMessage));
  }
};

export const postNewListingAction = (data: any) => async (dispatch: any) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/gig`, data);

    return { success: true };
  } catch (error) {
    const errorMessage = getRequestError(error);
    dispatch(setAlert(true, "error", errorMessage));
  }
};
