import {LeftBar} from "./components/organisms/Dashboard";
import {Main} from "./components/organisms/Dashboard";
import classNames from "classnames";
import {ToolBar} from "./components/organisms/Dashboard/ToolBar";

function Dashboard() {
    return (
        <div className={classNames(
            'dashboard h-screen max-h-screen',
            'grid grid-cols-[min-content_auto] grid-rows-[min-content_auto]',
        )
        }>
            <LeftBar className={'row-span-full'}/>
            <ToolBar className={'col-span-full'}/>
            <Main className={'col-start-2 col-span-full'}/>
        </div>
    )
}
export default Dashboard;