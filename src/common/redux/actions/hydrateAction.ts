import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// eslint-disable-next-line import/no-cycle
import { IRootState } from '@common/redux/store';

export const hydrateAction = createAction<Partial<IRootState>>(HYDRATE);
