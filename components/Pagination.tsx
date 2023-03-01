import {ReactNode} from "react";


const getRange = (start: number, end: number) => {
    const result = [];
    for (let i = start; i <= end ; i++) {
        result.push(i);
    }
    return result
}

const calculateLimits = (current: number, siblings: number) => {
    if (current <= siblings * 2 + 1) {
        return {start: 1, end: siblings * 2 + 3 }
    }
    return {start: current-siblings-1, end: current+siblings + 1 }
}

interface PaginationButtonProps {
    children: ReactNode,
    current?: boolean,
    value: PageValue,
    onClick: (page: PageValue) => void
}

const PaginationButton = (props: PaginationButtonProps) => {
    const {children, current = false, onClick, value} = props;

    const buttonWidth = (typeof value === 'number' || value === 'gap') ? 'min-w-[3rem]' : 'min-w-[5rem]'
    const currentClassname = current ? 'bg-blue-500 text-white' : ''
    const classNames = `p-2 border-2 rounded-md hover:border-blue-900 hover:border-2 ${buttonWidth} ${currentClassname}`;

    return (
        <button className={classNames} onClick={() => onClick(value)}>{children}</button>
    )
}

type PageValue = 'prev' | 'next' | 'gap' | number

interface PageButton {
    value: PageValue,
}

interface PaginationProps {
    current: number,
    siblings: number,
    onClick: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
    const {current, siblings, onClick} = props;
    const prevPageButton: PageButton = {
        value: 'prev'
    }
    const nextPageButton: PageButton = {
        value: 'next'
    }

    const {start, end} = calculateLimits(current, siblings);
    const pages = getRange(start, end);

    const handlePageChange = (newPage: PageValue) => {
        switch (newPage) {
            case 'prev': {
                onClick(current - 1)
                break;
            }
            case 'next': {
                onClick(current + 1)
                break;
            }
            case 'gap': {
                break;
            }
            default: {
                onClick(newPage)
            }
        }
    }

  return (
      <nav className='flex gap-1'>
        <PaginationButton onClick={handlePageChange} value={prevPageButton.value}>Previous</PaginationButton>
          {pages.map((page) => (
              <PaginationButton
                  key={`pagination-${page}`}
                  current={current === page}
                  value={page}
                  onClick={handlePageChange}
              >
                  {page}
              </PaginationButton>
          ))}
        <PaginationButton value={nextPageButton.value} onClick={handlePageChange}>Next</PaginationButton>
      </nav>
  )
}