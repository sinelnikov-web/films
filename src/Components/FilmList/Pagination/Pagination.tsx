import React from 'react';
import {Link} from "react-router-dom";
import {range} from "../../../utils/range";

interface PaginationProps {
    totalCount: number | null,
    currentPage: number,
    setCurrentPage: Function,
    pageNeighbours: number
}

const Pagination: React.FC<PaginationProps> = ({totalCount, currentPage, setCurrentPage, pageNeighbours}) => {

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';

    let pagesCount = totalCount ? Math.ceil(totalCount / 20) : 0

    let neighbours = Math.max(0, Math.min(pageNeighbours, 2))
    const totalNumbers = (neighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;
    let pagesNumbers = range(1, pagesCount)
    let pages: any = []
    if (pagesCount > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours)
        const endPage = Math.min(pagesCount - 1, currentPage + pageNeighbours)
        pages = range(startPage, endPage)
        const hasLeftSpill = startPage > 2
        const hasRightSpill = (pagesCount - endPage) > 1
        const spillOffset = totalNumbers - (pages.length + 1)
        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1)
                pages = [LEFT_PAGE, ...extraPages, ...pages]
                break
            }

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset)
                pages = [...pages, ...extraPages, RIGHT_PAGE]
                break
            }

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
                break
            }
        }
        pagesNumbers = [1, ...pages, pagesCount]
    }

    return (
        <div className="pagination">
            <ul className="pagination__list">
                {pagesNumbers.map((page: string | number, index: number) => {
                    if (page === LEFT_PAGE) return '...';
                    if (page === RIGHT_PAGE) return '...'
                    return (
                        <li key={index} onClick={() => setCurrentPage(page)}
                            className={"pagination__item" + (currentPage === page ? ' selected' : '')}>
                            <Link to={'/films'} className="pagination__link">
                                {page}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Pagination