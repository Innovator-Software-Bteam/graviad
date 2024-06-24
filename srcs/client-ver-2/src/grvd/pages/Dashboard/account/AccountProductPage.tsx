import React, {useEffect, useState} from "react";
import {TProduct} from "grvd";
import axios from "axios";
import config from "../../../../config";
import {twJoin} from "tailwind-merge";
import LazyLoad from "react-lazyload";
import {ProductCard, ProductCardSkeleton} from "grvd/molecules";
import {useUser} from "grvd/contexts";
import {Typography} from "@material-tailwind/react";
import {TDashboardBoard} from "grvd/pages";
import {useDialog} from "grvd/organisms/Dialog";

export interface IAccountProductPageProps extends React.ComponentProps<'div'> {

}

export function AccountProductPage(props: IAccountProductPageProps) {
    const boards: TDashboardBoard[] = [
        {
            board: <AccountProductBoard/>,
            col: 1,
            row: 1,
            title: 'Products',
            className: 'h-full',
        },
    ];
    return (
        <div className={'w-full h-full'}>
            {boards.map((board, index) => (
                <div
                    key={index}
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
            ))}
        </div>
    )
}

export function AccountProductBoard() {
    const user = useUser();
    const {close, open} = useDialog();
    const [products, setProducts] = useState<TProduct []>([]);
    const [productSkeletons, setProductSkeletons] = useState<number []>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const loadProducts = async () => {
        setIsLoading(true);
        await axios.get(`${config.server.url}/products`, {
            withCredentials: true,
            params: {
                where: {
                    merchantId: user?.merchant?.id,
                }
            }
        })
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                open('Something went wrong. Please try again!', 'error');
                setIsLoading(false);
            });
    };
    useEffect(() => {
        loadProducts().then().catch();
    }, []);
    if (products.length === 0 && !isLoading) {
        return (
            <div className={twJoin(
                'flex',
                'justify-center',
                'items-center',
                'w-full h-full',
            )}>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-on-primary-variant text-center',
                    )}>
                    You don't have any products yet.<br/>
                    Click <span className={'font-bold text-grvd-theme-sys-dark-on-primary p-1 rounded-sm bg-white'}>Create Ad</span> to create the first product.
                </Typography>
            </div>
        );
    }
    if (!user) {
        return (
            <div className={twJoin(
                'flex',
                'justify-center',
                'items-center',
                'w-full h-full',
            )}>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-on-primary-variant text-center',
                    )}>
                    Please <span className={'font-bold text-grvd-theme-sys-dark-on-primary p-1 rounded-sm bg-white'}>Login</span> to see your products.
                </Typography>
            </div>
        );
    }
    return (
        <div className={twJoin(
            'grid',
            'gap-16',
            'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
            'auto-rows-auto',
        )}>
            {isLoading && productSkeletons.map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
            {!isLoading && products.map((product) => (
                <LazyLoad offset={1000} classNamePrefix={'blur-[1000px]'} key={product.id}>
                    <ProductCard key={product.id} id={product.id}/>
                </LazyLoad>
            ))}
        </div>
    );

}