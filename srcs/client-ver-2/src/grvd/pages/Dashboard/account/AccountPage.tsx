import {Outlet} from "react-router-dom";

export interface IAccountPage extends React.ComponentProps<'div'> {

}
export function AccountPage(props: IAccountPage) {
    return (
        <div className={'h-full w-full'}>
            <Outlet/>
        </div>
    )
}