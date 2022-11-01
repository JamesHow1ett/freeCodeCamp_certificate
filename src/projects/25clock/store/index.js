import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD:src/projects/drum/store/index.js
import drumReducer from "./drumReducer";
=======
import timerReducer from "./timerReducer";
>>>>>>> main:src/projects/25clock/store/index.js

export const store = configureStore({
  reducer: {
    drum: drumReducer,
  },
});
