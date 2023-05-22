/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColumnDefinitionType } from '../..';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { appActions } from '~/store';
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export type SortButtonProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  config?: { key: keyof T; direction: string };
};
export const SortButton = <T, K extends keyof T>({
  columns,
  data,
  config,
}: SortButtonProps<T, K>): JSX.Element => {
  const [sortConfig, setSortConfig] = useState(config);
  const handleSort = (key: keyof T) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    data.sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig?.direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig?.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    console.warn(data);
    appActions.lobby.tableData(data);
  };
  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sort By
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {columns.map((column, index) => (
              <Menu.Item key={index}>
                {(active) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 bg-white-100',
                      'block px-4 py-2 text-sm w-full',
                    )}
                    onClick={() => handleSort(column.key as keyof T)}
                  >
                    {column.header}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
