


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  role: 'subcontractor';
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
}

// Rehydrate user from localStorage if exists
const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      if (action.payload) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    setRole(state, action: PayloadAction<User['role']>) {
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // remove token as well
    },
  },
});

export const { setUser, setRole, logout } = authSlice.actions;
export default authSlice.reducer;





















// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   name: string;
//   role: 'subcontractor';
//   avatarUrl?: string;
//    token?: string;
// }

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<User | null>) {
//       state.user = action.payload;
//     },
//     setRole(state, action: PayloadAction<User['role']>) {
//       if (state.user) state.user.role = action.payload;
//     },
//   },
// });

// export const { setUser, setRole } = authSlice.actions;
// export default authSlice.reducer; 

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   name: string;
//   role: 'subcontractor'; // single role
//   avatarUrl?: string;
// }

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<User | null>) {
//       state.user = action.payload;
//     },
//     setRole(state, action: PayloadAction<User['role']>) {
//       if (state.user) state.user.role = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       localStorage.removeItem('token'); // optional: remove token on logout
//     },
//   },
// });

// export const { setUser, setRole, logout } = authSlice.actions;
// export default authSlice.reducer;
