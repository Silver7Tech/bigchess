// import { useMemo } from "react";
import { Button } from '../..';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { usePagination } from './usePagination';
import { trpc } from '~/helpers/trpc';
import { useEffect } from 'react';
import { appActions, appStore } from '~/store';

export const Pagination: React.FC = () => {
  const pageSize = 8;
  const siblingCount = 1;
  const currentPage = appStore.lobby.use.currentPage();
  const getData = async (currentPage: number) => {
    const data: any = await trpc.query('lobby.pools', { currentPage, pageSize });
    appActions.lobby.tableData(data.pools);
    appActions.lobby.totalCount(data.totalCount);
  };
  useEffect(() => {
    getData(currentPage);
  }, []);

  const paginationRange = usePagination({
    currentPage,
    totalCount: appStore.lobby.use.totalCount(),
    siblingCount,
    pageSize,
  });
  const pageActivite = (index: number) => {
    appActions.lobby.currentPage(index);
    getData(index);
  };
  const onNext = () => {
    pageActivite(currentPage + 1);
  };

  const onPrevious = () => {
    pageActivite(currentPage - 1);
  };
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <div className="flex justify-between mx-6">
      <Button
        icon={<AiOutlineArrowLeft />}
        text="Previous"
        className={`flex justify-between items-center border-2 w-[114px] h-[36px] ${
          currentPage === 1 ? 'disabled:opacity-75' : ''
        }`}
        disabled={currentPage === 1 ? true : false}
        onClick={onPrevious}
      />
      <div className="flex gap-1">
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === 'DOTS') {
            return <div key={index}>&#8230;</div>;
          }
          return (
            <button
              key={index}
              onClick={() => pageActivite(pageNumber as number)}
              className={`${
                currentPage === pageNumber ? 'border-2 bg-[#D2EEFF]' : ''
              } flex justify-center items-center  rounded-md w-[36px] h-[36px]`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <Button
        icon={<AiOutlineArrowRight />}
        icon_direction="right"
        text="Next"
        className="flex justify-between items-center border-2 w-[88px] h-[36px]"
        disabled={currentPage === lastPage ? true : false}
        onClick={onNext}
      />
    </div>
  );
};
