import { FC } from 'react';
import { Table as TableComponent } from 'reactstrap';
import Link from 'next/link';
import produce from 'immer';
import styled from 'styled-components';

import { IRow } from '@pages/admin/components/Table/types/IRow';
import { ListName } from '@pages/admin/enums/ListName';
import { adminPageApi } from '@pages/admin/api/AdminPageApi';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';

interface IProps {
  rows: IRow[];
  activeList: ListName;
  setRows(rows: IRow[]): void;
}

export const Table: FC<IProps> = ({ rows, setRows, activeList }) => {
  const deleteTableItem = async (id: string): Promise<void> => {
    const request = new DeleteItemRequest();

    request.itemType = activeList;
    request.id = id;

    const newRowsState = produce(rows, (draft: IRow[]) => {
      const rowId = draft.findIndex((row) =>
        row.values.find((value) => {
          const isLink = Array.isArray(value);

          if (isLink) {
            return value.find((link) => link.id === id);
          }

          return false;
        }),
      );

      delete draft[rowId];
    });

    setRows(newRowsState);

    await adminPageApi.deleteItem(request);
  };

  return (
    <STable>
      <TableComponent responsive={false}>
        <thead>
          <tr key={0}>
            <th>#</th>
            {rows[0].values.map((value, idx) => (
              <th key={idx}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(
            (row, rowIdx) =>
              rowIdx !== 0 && (
                <tr key={rowIdx + 1}>
                  <th scope='row'>{rowIdx}</th>
                  {row.values.map((value, valueIdx) =>
                    Array.isArray(value) ? (
                      <td key={valueIdx + rowIdx + 1}>
                        <SRow>
                          {value.map((link, idx) =>
                            link?.action === 'delete' ? (
                              <SLink key={idx} color='red'>
                                <div
                                  role='none'
                                  onClick={() => deleteTableItem(link.id)}
                                >
                                  {link.text}
                                </div>
                              </SLink>
                            ) : (
                              link?.url && (
                                <SLink key={idx}>
                                  <Link href={link.url}>{link.text}</Link>
                                </SLink>
                              )
                            ),
                          )}
                        </SRow>
                      </td>
                    ) : (
                      <td key={valueIdx}>{value}</td>
                    ),
                  )}
                </tr>
              ),
          )}
        </tbody>
      </TableComponent>
    </STable>
  );
};

const STable = styled.div`
  overflow: scroll;
  white-space: nowrap;

  & a {
    width: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SRow = styled.div`
  display: flex;
`;
const SLink = styled.span<{ color?: string }>`
  margin-left: 10px;
  display: flex;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  ${({ color }) => color && `color: ${color};`}
`;
