// src/redux/slices/status/status-slice.ts

import { Status } from "@/types/task-type";
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityState,
} from "@reduxjs/toolkit";

// Extend Status to include optional UI state
export interface ExtendedStatus extends Status {
  open: boolean;
  editable: boolean;
}

// Create adapter
const statusAdapter = createEntityAdapter<ExtendedStatus>();

// Initial state
const initialState = statusAdapter.getInitialState();

// Slice
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatuses: (state, action: PayloadAction<Status[]>) => {
      const extendedStatuses: ExtendedStatus[] = action.payload.map(
        (status) => ({
          ...status,
          open: false,
          editable: false,
        })
      );
      statusAdapter.setAll(state, extendedStatuses);
    },

    toggleAccordion: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const status = state.entities[id];
      if (status) status.open = !status.open;
    },

    addStatus: (state) => {
      const newStatus: ExtendedStatus = {
        id: Date.now().toString(),
        name: "To Do",
        tasks: [],
        open: false,
        editable: true,
      };
      statusAdapter.addOne(state, newStatus);
    },

    deleteStatus: (state, action: PayloadAction<string>) => {
      statusAdapter.removeOne(state, action.payload);
    },

    toggleEditable: (state, action: PayloadAction<string>) => {
      const status = state.entities[action.payload];
      if (status) status.editable = !status.editable;
    },

    updateStatusName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const status = state.entities[action.payload.id];
      if (status) status.name = action.payload.name;
    },
  },
});

// Export actions
export const {
  setStatuses,
  toggleAccordion,
  addStatus,
  deleteStatus,
  toggleEditable,
  updateStatusName,
} = statusSlice.actions;

// Export selectors
export const statusSelectors = statusAdapter.getSelectors<{
  status: ReturnType<typeof statusSlice.reducer>;
}>((state) => state.status);
// Export reducer
export default statusSlice.reducer;
