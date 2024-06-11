import {Typography} from "@material-tailwind/react";
import React from "react";
import {ProductCardsContainer} from "grvd/molecules/Product";
import {Board, BoardAdvertisement, BoardTopMerchant} from "grvd/molecules/Board";
import {twJoin} from "tailwind-merge";

export type TDashboardBoard = {
    title?: string;
    description?: string;
    board: any;
    col: any;
    row: any;
    colSpan?: any;
    rowSpan?: any;
    className?: string;
};

export function DashboardHomePage() {
    const boards: TDashboardBoard[] = [
        {
            board: <Board/>,
            col: 1,
            row: 1,
            colSpan: 2,
        },
        {
            title: 'Advertisement',
            board: <BoardAdvertisement/>,
            col: 1,
            row: 2,
            colSpan: 2,
        },
        {
            title: 'Top Merchant',
            board: <BoardTopMerchant/>,
            col: 3,
            row: 1,
            className: 'sticky top-0',
        },
    ];
    const renderBoard = (board: TDashboardBoard, key: any) => {
        return (
            <div
                key={key}
                className={twJoin(
                'flex flex-col gap-4',
                `col-start-${board.col}`,
                `row-start-${board.row}`,
                board.colSpan && `col-span-${board.colSpan}`,
                board.rowSpan && `row-span-${board.rowSpan}`,
                board.className,
            )}>
                <Typography variant={'h4'} className={'text-grvd-theme-sys-dark-primary'}>
                    {board.title}
                </Typography>
                {board.board}
            </div>
        );
    }
    return (
        <div className={twJoin(
            'grid',
            'grid-cols-3',
            'grid-rows-[repeat(auto-fill,auto-fill)]',
            'gap-16'
        )}>
            {
                boards.map((board, index) => renderBoard(board,index)
                )}
        </div>
    )
}