import {ReactNode} from "react";

const getRange = (start: number, end: number) => {
    const result = [];
    for (let i = start; i <= end ; i++) {
        result.push(i);
    }
    return result
}

const calculateLimits = (current: number, siblings: number, last: number | null) => {
    const boundary = siblings * 2 + 1;
    const start = current <= boundary ? 1 : current - boundary;
    const end = last && current > last - boundary ? last : current + boundary;
    return {start, end}
}

const getPages = (current: number, siblings: number, last: number | null): PageButton[] => {
    const boundary = siblings * 2 + 1;
    const gap: PageButton = {type: 'gap', value: '...'};
    const {start, end} = calculateLimits(current, siblings, last);
    const range: PageButton[] = getRange(start, end).map(page => ({ type: page, value: page}))
    if (current <= boundary) {
        const pages = range.filter((item) => item.value <= boundary + 1)
        return [...pages, gap];
    }
    if (last && current > last - boundary) {
        const pages = range.filter((item) => item.value > last - boundary - 1)
        return [gap, ...pages];
    }
    const pages = range.filter((item) => item.value >= current - siblings && item.value <= current + siblings)
    return [gap, ...pages, gap];
}

interface PaginationButtonProps {
    children: ReactNode,
    current?: boolean,
    disabled?: boolean,
    value: PageButton,
    onClick: (page: PageButton) => void
}

const PaginationButton = (props: PaginationButtonProps) => {
    const {children, current = false, disabled=false, onClick, value} = props;
    const gapButton = value.type === 'gap';
    const buttonWidth = (typeof value.type === 'number' || gapButton) ? 'min-w-[3rem]' : 'min-w-[5rem]'
    const currentClassname = current ? 'bg-blue-500 text-white' : ''
    const borderClassname = gapButton ? 'border-none' : 'border-2 border-grey-200'
    const disabledClassname = disabled ? 'bg-gray-200 hover:border-grey-200' : 'hover:border-2 hover:border-blue-900';
    const classNames = `p-2  rounded-md ${borderClassname} ${disabledClassname} ${buttonWidth} ${currentClassname}`;

    return (
        <button disabled={disabled || gapButton} className={classNames} onClick={() => onClick(value)}>{children}</button>
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
    last: number | null,
    onClick: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
    const {current, siblings, last = null, onClick} = props;

    const handlePageChange = (button: PageButton) => {
        switch (button.type) {
            case 'prev': {
                if (current > 1) {
                    onClick(current - 1)
                }
                break;
            }
            case 'next': {
                if (last && current < last) {
                    onClick(current + 1)
                }
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

    const prevPageButton: PageButton = {
        type: 'prev',
        value: 'Previous'
    }
    const nextPageButton: PageButton = {
        type: 'next',
        value: 'Next'
    }

    const buttons = getPages(current, siblings, last);

    return (
      <nav className='flex gap-1'>
          <PaginationButton disabled={current===1} value={prevPageButton} onClick={handlePageChange}>{prevPageButton.value}</PaginationButton>
          {buttons.map((button, idx) => (
              <PaginationButton
                  key={`pagination-${button.value}-${idx}`}
                  current={current === button.value}
                  value={button}
                  onClick={handlePageChange}
              >
                  {button.value}
              </PaginationButton>
          ))}
          <PaginationButton disabled={Boolean(last) && current === last} value={nextPageButton} onClick={handlePageChange}>{nextPageButton.value}</PaginationButton>
      </nav>
  )
}