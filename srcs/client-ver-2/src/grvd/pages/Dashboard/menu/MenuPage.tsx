import {IPageProps} from "grvd/pages/types";
import {Outlet} from "react-router-dom";

export interface IMenuPageProps extends IPageProps {}
export function MenuPage(props: IMenuPageProps) {
    return (
        <div>
            <Outlet/>
        </div>
    )
}