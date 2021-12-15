import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';

export interface IAuthState extends IBaseFeatureState {
  token: string;
}

// export const authSlice = createSlice({
//   name: Feature.AUTH,
//   initialState: {
//     state: {},
//     token: '',
//   } as IAuthState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // builder.addCase(authAsyncActions.login.fulfilled, onLogin);
//   },
// });
