import { FC, MouseEvent } from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button';
import { IProduct } from '@server/Products/types/IProduct';
import {
  IWithProductsTableState,
  withProductsTableState,
} from '@components/ProductsTable/hocs/withProductsTableState';
import { ModalType } from '@components/Modal/enums/ModalType';

interface IProps {
  products: IProduct[];
}

const ProductsTableComponent: FC<IProps & IWithProductsTableState> = ({
  products,
  setModalId,
  setDefaultModalInputValue,
}) => {
  const router = useRouter();
  const onPurchaseClick = (
    e: MouseEvent<HTMLButtonElement>,
    vendor: string,
  ): void => {
    e.stopPropagation();
    setModalId(ModalType.ORDER_MODAL);
    setDefaultModalInputValue(vendor);
  };

  const onRowClick = async (vendor: string): Promise<void> => {
    await router.push(`/products/${vendor}`);
  };

  return (
    <Table responsive={false}>
      <thead>
        <tr>
          <th>Артикул</th>
          <th>Производитель</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, idx) => (
          <SRow key={idx} onClick={() => onRowClick(product.vendor)}>
            <td>{product.vendor}</td>
            <td>{product.fabricator.name}</td>
            <td>{product.description}</td>
            <td>{product.price}₽</td>
            <td>
              <Button
                size='sm'
                onClick={(e) => onPurchaseClick(e, product.vendor)}
              >
                Купить
              </Button>
            </td>
          </SRow>
        ))}
      </tbody>
    </Table>
  );
};

export const ProductsTable = withProductsTableState(ProductsTableComponent);

const SRow = styled.tr`
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;
