import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

type PageType = 'prev' | 'next' | 'gap' | number;
type PageValue = 'Previous' | 'Next' | '...' | number;

interface PageButton {
  type: PageType;
  value: PageValue;
}

interface PaginationProps {
  siblings: number;
  last?: number | null;
  moreProducts?: boolean;
}

interface PaginationButtonProps {
  children: ReactNode;
  current?: boolean;
  disabled?: boolean;
  value: PageButton;
  onClick: (page: PageButton) => void;
}

export const getRange = (start: number, end: number) => {
  const result = [];
  // eslint-disable-next-line functional/no-let
  for (let i = start; i <= end; i++) {
    // eslint-disable-next-line functional/immutable-data
    result.push(i);
  }
  return result;
};

const calculateLimits = (
  current: number,
  siblings: number,
  last: number | null
) => {
  const boundary = siblings * 2 + 1;
  const start = current <= boundary ? 1 : current - boundary;
  const end = last && current > last - boundary ? last : current + boundary;
  return { start, end };
};

const pageButtonFrom = (type: PageType, value: PageValue): PageButton => {
  return { type, value };
};

const getPages = (
  current: number,
  siblings: number,
  last: number | null
): PageButton[] => {
  const boundary = siblings * 2 + 1;
  const gap: PageButton = pageButtonFrom('gap', '...');
  const { start, end } = calculateLimits(current, siblings, last);
  const range: PageButton[] = getRange(start, end).map((page) => ({
    type: page,
    value: page,
  }));
  if (current <= boundary) {
    const pages = range.filter((item) => item.value <= boundary + 1);
    return [...pages, gap];
  }
  if (last && current > last - boundary) {
    const pages = range.filter((item) => item.value > last - boundary - 1);
    return [gap, ...pages];
  }
  const pages = range.filter(
    (item) =>
      item.value >= current - siblings && item.value <= current + siblings
  );
  return [gap, ...pages, gap];
};

const PaginationButton = (props: PaginationButtonProps) => {
  const { children, current = false, disabled = false, onClick, value } = props;
  const gapButton = value.type === 'gap';
  const buttonWidth =
    typeof value.type === 'number' || gapButton
      ? 'min-w-[3rem]'
      : 'min-w-[5rem]';
  const currentClassname = current ? 'bg-blue-500 text-white' : 'bg-white';
  const borderClassname = gapButton
    ? 'border-none'
    : 'border-2 border-grey-200';
  const disabledClassname = disabled
    ? 'bg-gray-200 hover:border-grey-200'
    : 'hover:border-2 hover:border-blue-900';
  const classNames = `p-2 rounded-md flex justify-center ${borderClassname} ${disabledClassname} ${buttonWidth} ${currentClassname}`;
  const gapClassNames = `p-2 rounded-md ${borderClassname} ${buttonWidth} bg-transparent flex justify-center`;

  if (value.type === 'gap') {
    return <p className={gapClassNames}>{children}</p>;
  }
  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
};

export const usePagination = (link?: string) => {
  const router = useRouter();
  const pageFromUrl = Number.parseInt(router.query.isrProductListId as string);
  const [currentPage, setCurrentPage] = useState(pageFromUrl || 1);

  const Pagination = (props: PaginationProps) => {
    const { siblings, last = null, moreProducts } = props;

    const handlePageChange = (button: PageButton) => {
      const currentRouterPage = Number.parseInt(
        router.query.isrProductListId as string
      );
      if (link) {
        switch (button.type) {
          case 'prev': {
            if (currentRouterPage > 1) {
              const prevPage = currentRouterPage - 1;
              router.push(`/${link}/${prevPage}`);
              setCurrentPage(prevPage);
            }
            break;
          }
          case 'next': {
            if (moreProducts) {
              const nextPage = currentRouterPage + 1;
              router.push(`/${link}/${nextPage}`);
              setCurrentPage(nextPage);
            }
            break;
          }
          case 'gap': {
            break;
          }
          default: {
            if (typeof button.value === 'number') {
              router.push(`/${link}/${button.value}`);
              setCurrentPage(button.value);
            }
          }
        }
      }
      switch (button.type) {
        case 'prev': {
          if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
          }
          break;
        }
        case 'next': {
          if (last && currentPage < last) {
            const nextPage = currentPage + 1;
            if (link) {
              router.push(`/${link}/${nextPage}`);
            }
            setCurrentPage(nextPage);
          }
          if (!last && moreProducts) {
            const nextPage = currentPage + 1;
            if (link) {
              router.push(`/${link}/${nextPage}`);
            }
            setCurrentPage(nextPage);
          }
          break;
        }
        case 'gap': {
          break;
        }
        default: {
          if (typeof button.value === 'number') {
            if (link) {
              router.push(`/${link}/${button.value}`);
            }
            setCurrentPage(button.value);
          }
        }
      }
    };

    const prevPageButton = pageButtonFrom('prev', 'Previous');
    const nextPageButton = pageButtonFrom('next', 'Next');

    const buttons = getPages(currentPage, siblings, last);

    const disableNext = Boolean(last) ? currentPage === last : !moreProducts;
    if (!last) {
      return (
        <nav className="flex gap-1 pb-4">
          <PaginationButton
            disabled={currentPage === 1}
            value={prevPageButton}
            onClick={handlePageChange}
          >
            {prevPageButton.value}
          </PaginationButton>
          <PaginationButton
            key={`pagination-current`}
            current={true}
            value={pageButtonFrom(currentPage, currentPage)}
            onClick={handlePageChange}
          >
            {currentPage}
          </PaginationButton>
          <PaginationButton
            disabled={disableNext}
            value={nextPageButton}
            onClick={handlePageChange}
          >
            {nextPageButton.value}
          </PaginationButton>
        </nav>
      );
    }
    return (
      <nav className="flex gap-1 pb-4">
        <PaginationButton
          disabled={currentPage === 1}
          value={prevPageButton}
          onClick={handlePageChange}
        >
          {prevPageButton.value}
        </PaginationButton>
        {buttons.map((button, idx) => (
          <PaginationButton
            key={`pagination-${button.value}-${idx}`}
            current={currentPage === button.value}
            value={button}
            onClick={handlePageChange}
          >
            {button.value}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={disableNext}
          value={nextPageButton}
          onClick={handlePageChange}
        >
          {nextPageButton.value}
        </PaginationButton>
      </nav>
    );
  };

  return {
    currentPage,
    Pagination,
  };
};
