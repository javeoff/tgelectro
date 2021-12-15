// eslint-disable-next-line import/no-cycle
import { createFeatureSlice } from '@common/redux/utils/createFeatureSlice';
import { Feature } from '@common/enums/Feature';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

export interface ICatalog {
  fabricators: IFabricator[];
}

type ICatalogProps = IBaseFeatureState<ICatalog>;

export const catalogSlice = createFeatureSlice({
  name: Feature.CATALOG,
  initialState: {
    state: {
      fabricators: [],
    },
  } as ICatalogProps,
  reducers: {},
});
