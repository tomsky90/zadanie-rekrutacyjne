import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import Table from "../components/table/Table";

export const MockedState = {
  items: [
    { name: "js", count: 1212 },
    { name: "php", count: 654654 },
    // Additional mocked state items...
  ],
};

interface MockstoreProps {
  initialState: typeof MockedState;
  children: ReactNode;
}

const Mockstore: React.FC<MockstoreProps> = ({ initialState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        tags: createSlice({
          name: "tags",
          initialState,
          reducers: {
            setData: (state, action) => {
              state = action.payload;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: "Table",
  component: Table,
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
};

// Define the type for the 'story' parameter explicitly
type StoryFunction = () => ReactNode;

export const Default = {
  decorators: [
    (story: StoryFunction) => (
      <Mockstore initialState={MockedState}>{story()}</Mockstore>
    ),
  ],
};

export const Loading = {
  args: {
    loading: true,
  },
  decorators: [
    (story: StoryFunction) => (
      <Mockstore initialState={MockedState}>{story()}</Mockstore>
    ),
  ],
};

export const Error = {
  args: {
    error: true,
  },
  decorators: [
    (story: StoryFunction) => (
      <Mockstore initialState={MockedState}>{story()}</Mockstore>
    ),
  ],
};
