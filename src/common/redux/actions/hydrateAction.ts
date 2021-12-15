import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { IRootState } from '@common/redux/store';

export const hydrateAction = createAction<Partial<IRootState>>(HYDRATE);
