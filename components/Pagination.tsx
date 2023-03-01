import {ReactNode} from "react";

interface PaginationButtonProps {
    children: ReactNode,
    current?: boolean,
    value: PageType,
    onClick: (page: PageType) => void
}

const PaginationButton = (props: PaginationButtonProps) => {
    const {children, current = false, onClick, value} = props;
    const classNames = `px-4 py-2 border-2 rounded-md hover:border-blue-900 hover:border-2 ${current ? 'bg-blue-500 text-white' : ''}`;
    return (
        <button className={classNames} onClick={() => onClick(value)}>{children}</button>
    )
}

type PageType = 'prev' | 'next' | number

interface PageButton {
    value: PageType
}

interface PaginationProps {
    current: number,
    onClick: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
    const {current, onClick} = props;
    const prevPageButton: PageButton = {
        value: 'prev'
    }
    const nextPageButton: PageButton = {
        value: 'next'
    }

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handlePageChange = (newPage: PageType) => {
        console.log(newPage)
        switch (newPage) {
            case 'prev': {
                onClick(current - 1)
                break;
            }
            case 'next': {
                onClick(current + 1)
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