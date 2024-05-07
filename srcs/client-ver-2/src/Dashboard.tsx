import React from "react";
import {Outlet} from 'react-router-dom';
import {Link, List, Typography} from "@mui/material";

interface IDashboardHeaderProps {
    title: string;
}

interface IDashboardFooterProps {
    title: string;
}

interface IDashboardMainProps {
    title: string;
}

function DashboardHeader({title, ...props}: IDashboardHeaderProps) {
    const routerList = [
        {
            title: 'Route1',
            path: '/route1'
        },
        {
            title: 'Route2',
            path: '/route2'
        }
    ];
    const renderRouterList = (route: string, path: string) => {
        return (
            <div>
                <Link href={path} variant={'caption'}>
                    {route}
                </Link>

            </div>
        )
    }
    return (
        <header>
            <div>
                <Typography variant={'h6'}>
                    {title}
                </Typography>
                <List>

                </List>
            </div>
        </header>
    )
}

function DashboardFooter({props}: any) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

function DashboardMain({props}: any) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export function Dashboard() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

