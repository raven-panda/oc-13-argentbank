import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../definitions/user';
import { postUserLogin, postUserProfile } from '../queries/user-api-queries';
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

export const authenticationApi = {
  getProfile: createAsyncThunk('authentication/getProfile', async () => {
    const data = await postUserProfile();
    return data.body;
  }),
  login: createAsyncThunk(
    'authentication/login',
    async (
      credentials: { email: string; password: string },
      { rejectWithValue },
    ) => {
      try {
        const { status, body } = await postUserLogin(credentials);
        if (status !== 200) throw new Error('Invalid login');
        cookies.set(TOKEN_COOKIE_NAME, body.token, {
          path: '/',
          expires: new Date(Date.now() + TOKEN_EXPIRATION_MS),
          sameSite: 'strict',
        });
        return { isAuthenticated: true, accessToken: body.token };
      } catch (err: any) {
        console.error({ err });
        return rejectWithValue({ isAuthenticated: false });
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login case
      .addCase(authenticationApi.login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationApi.login.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(authenticationApi.login.rejected, (state) => {
        state.isLoading = false;
      })
      // Logout case
      .addCase(authenticationApi.logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationApi.logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.accessToken = undefined;
        state.isLoading = false;
      })
      // Fetch user profile
      .addCase(authenticationApi.getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticationApi.getProfile.fulfilled, (state, action) => {
        const profile = action.payload;
        state.profile = profile;
        state.isLoading = false;
      })
      .addCase(authenticationApi.getProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const authenticationReducer = authenticationSlice.reducer;
