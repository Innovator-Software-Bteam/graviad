import React, {Component, MouseEvent} from "react";
import {useSelector} from "react-redux";
import {RootState} from "grvd/storage";
import {useDialog} from "grvd/organisms";

export interface IProtectedFeatureProps extends React.ComponentProps<'div'> {
    component?: Component;
}

export function ProtectedFeatureRequiredLogin(props: IProtectedFeatureProps) {
    const {children} = props;
    const state = useSelector((state: RootState) => state.state.state);
    const isAuthenticated = state.isAuthenticated;

    const {close, open, isOpen} = useDialog();
    if (!isAuthenticated) {
        const handlePrevent = (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            open('Required Login', 'required');
        };
        return (
            <div
                onClick={handlePrevent}
            >
                {children}
            </div>
        );
    }
    return (
        <>
            {children}
        </>
    );
}