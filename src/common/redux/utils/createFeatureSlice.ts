import {
  createSlice,
  CreateSliceOptions,
  Draft,
  isAnyOf,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { WritableDraft } from 'immer/dist/types/types-external';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
// eslint-disable-next-line import/no-cycle
import { hydrateAction } from '@common/redux/actions/hydrateAction';
import { Feature } from '@common/enums/Feature';

export type TSetState<State extends IBaseFeatureState['state']> = (
  draft: WritableDraft<IBaseFeatureState>,
  action: PayloadAction<State>,
) => void;

const createHydrateReducer =
  (name: Feature) =>
  (
    draft: Draft<IBaseFeatureState>,
    { payload }: ReturnType<typeof hydrateAction>,
  ) => {
    const state = payload[name]?.state;

    if (state) {
      draft.state = state;
    }
  };

export const createFeatureSlice = <
  State extends IBaseFeatureState,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends Feature = Feature,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
): Slice<State, CaseReducers & { setState: TSetState<State['state']> }, Name> =>
  createSlice<
    State,
    CaseReducers & { setState: TSetState<State['state']> },
    Name
  >({
    ...options,
    reducers: {
      ...options.reducers,
      setState: (draft, action: PayloadAction<IBaseFeatureState['state']>) => {
        draft.state = action.payload;
      },
    },
    extraReducers:
      typeof options?.extraReducers === 'object'
        ? {
            ...options.extraReducers,
            [hydrateAction.type]: (draft, action) => {
              if (options.extraReducers?.[hydrateAction.type]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = options.extraReducers[hydrateAction.type](
                  draft,
                  action,
                );

                if (result) {
                  // eslint-disable-next-line no-console
                  console.warn(
                    'Редьюсер для гитратации не должен возвращать значение',
                  );
                }
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              createHydrateReducer(options.name)(draft, action);
            },
          }
        : (builder) => {
            if (typeof options?.extraReducers === 'function') {
              options?.extraReducers(builder);
            }

            builder.addMatcher(
              isAnyOf(hydrateAction),
              createHydrateReducer(options.name),
            );
          },
  });
