import {Typography} from "@material-tailwind/react";
import React from "react";
import {ProductCardsContainer} from "grvd/molecules/Product";
import {Board, BoardAdvertisement, BoardTopMerchant} from "grvd/molecules/Board";
import {twJoin} from "tailwind-merge";
import {useNavigate} from "react-router-dom";
import {TRedirectURL} from "grvd";
import {useMedia} from "grvd/reponsive";


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
    const navigate = useNavigate();
    const {isMobile} = useMedia();
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
        if(isMobile && board.col === 3) return null;
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
    };
    if (localStorage.getItem('redirect_url_after_login' as TRedirectURL)) {
        const redirectUrl = localStorage.getItem('redirect_url_after_login' as TRedirectURL);
        localStorage.removeItem('redirect_url_after_login' as TRedirectURL);
        window.location.href = redirectUrl as string;
    }
    return (
        <div className={twJoin(
            'grid',
            'grid-rows-[repeat(auto-fill,auto-fill)]',
            'gap-16',

            'grid-cols-2',
            'md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3',
        )}>
            {
                boards.map((board, index) => renderBoard(board, index)
                )}
        </div>
    );
}