import {ReactNode} from "react";


const getRange = (start: number, end: number) => {
    const result = [];
    for (let i = start; i <= end ; i++) {
        result.push(i);
    }
    return result
}

const calculateLimits = (current: number, siblings: number) => {
    if (current <= siblings * 2) {
        return {start: 1, end: siblings * 2 + 2 }
    }
    return {start: current-siblings, end: current+siblings }
}

const getPages = (current: number, siblings: number): PageButton[] => {
    const gap: PageButton = {type: 'gap', value: '...'};
    const {start, end} = calculateLimits(current, siblings);
    const range: PageButton[] = getRange(start, end).map(page => ({ type: page, value: page}))
    if (current <= siblings * 2 ) {
        return [...range, gap]
    }
    return [gap, ...range, gap];
}

interface PaginationButtonProps {
    children: ReactNode,
    current?: boolean,
    value: PageButton,
    onClick: (page: PageButton) => void
}

const PaginationButton = (props: PaginationButtonProps) => {
    const {children, current = false, onClick, value} = props;
    const gapButton = value.type === 'gap';
    const buttonWidth = (typeof value.type === 'number' || gapButton) ? 'min-w-[3rem]' : 'min-w-[5rem]'
    const currentClassname = current ? 'bg-blue-500 text-white' : ''
    const borderClassname = gapButton ? '' : 'border-2 hover:border-2 hover:border-blue-900'
    const classNames = `p-2  rounded-md ${borderClassname} ${buttonWidth} ${currentClassname}`;

    return (
        <button disabled={gapButton} className={classNames} onClick={() => onClick(value)}>{children}</button>
    )
}

type PageType = 'prev' | 'next' | 'gap' | number
type PageValue = 'Previous' | 'Next' | '...' | number

interface PageButton {
    type: PageType,
    value: PageValue
}

interface PaginationProps {
    current: number,
    siblings: number,
    onClick: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
    const {current, siblings, onClick} = props;
    const prevPageButton: PageButton = {
        type: 'prev',
        value: 'Previous'
    }
    const nextPageButton: PageButton = {
        type: 'next',
        value: 'Next'
    }

    const pages = [prevPageButton, ...getPages(current, siblings), nextPageButton];

    const handlePageChange = (button: PageButton) => {
        switch (button.type) {
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
                if (typeof button.value === 'number') {
                onClick(button.value)
                }
            }
        }
    }

  return (
      <nav className='flex gap-1'>
          {pages.map((page, idx) => (
              <PaginationButton
                  key={`pagination-${page.value}-${idx}`}
                  current={current === page.value}
                  value={page}
                  onClick={handlePageChange}
              >
                  {page.value}
              </PaginationButton>
          ))}
      </nav>
  )
}