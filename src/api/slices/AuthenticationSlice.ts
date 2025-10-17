import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../definitions/user';
import {
  postUserLogin,
  postUserProfile,
  putUserProfile,
} from '../queries/user-api-queries';
import { TOKEN_COOKIE_NAME, TOKEN_EXPIRATION_MS } from '@/constants';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface AuthenticationState {
  profile: User | undefined;
  accessToken: string | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthenticationState = {
  profile: undefined,
  accessToken: undefined,
  isLoading: false,
  isAuthenticated: false,
};

export const authenticationActions = {
  getProfile: createAsyncThunk('authentication/getProfile', async () => {
    const data = await postUserProfile();
    return data.body;
  }),
  editUserProfile: createAsyncThunk(
    'authentication/editUserProfile',
    async ({
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    }) => {
      const data = await putUserProfile({ firstName, lastName });
      return data.body;
    },
  ),
  login: createAsyncThunk(
    'authentication/login',
    async (
      credentials: { email: string; password: string },
      { rejectWithValue },
    ) => {
      try {
        const { status, body } = await postUserLogin(credentials);
        if (status !== 200) throw new Error('Invalid login');
        cookies.set(TOKEN_COOKIE_NAME, body?.token, {
          path: '/',
          expires: new Date(Date.now() + TOKEN_EXPIRATION_MS),
          sameSite: 'strict',
        });
        return body?.token;
      } catch (err: any) {
        return rejectWithValue(err.response?.data);
      }
    },
  ),
  logout: createAsyncThunk('authentication/logout', async () => {
    cookies.remove(TOKEN_COOKIE_NAME, { path: '/' });
    return null;
  }),
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    ...initialState,
    accessToken: cookies.get(TOKEN_COOKIE_NAME),
    isAuthenticated: !!cookies.get(TOKEN_COOKIE_NAME),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login case
      .addCase(authenticationActions.login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationActions.login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload;
        state.isLoading = false;
      })
      .addCase(authenticationActions.login.rejected, (state) => {
        state.isLoading = false;
      })
      // Logout case
      .addCase(authenticationActions.logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationActions.logout.fulfilled, () => initialState)
      // Fetch user profile
      .addCase(authenticationActions.getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationActions.getProfile.fulfilled, (state, action) => {
        const profile = action.payload;
        state.profile = profile;
        state.isLoading = false;
      })
      .addCase(authenticationActions.getProfile.rejected, (state) => {
        state.isLoading = false;
      })
      // Edit user profile
      .addCase(authenticationActions.editUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        authenticationActions.editUserProfile.fulfilled,
        (state, action) => {
          const profile = action.payload;
          state.profile = profile;
          state.isLoading = false;
        },
      )
      .addCase(authenticationActions.editUserProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const authenticationReducer = authenticationSlice.reducer;
