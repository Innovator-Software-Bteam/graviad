import {useMediaQuery} from 'react-responsive';
import React from "react";

export type TMediaContext = {
    isBigScreen?: boolean;
    isTabletOrMobile?: boolean;
    isPortrait?: boolean;
    isRetina?: boolean;
    isMobile?: boolean;
};
export const MediaContext = React.createContext<TMediaContext>({});
export function MediaProvider(props: React.PropsWithChildren<{}>) {
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({query: '(min-resolution: 2dppx)'});
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return (
        <MediaContext.Provider value={{
            isBigScreen,
            isTabletOrMobile,
            isPortrait,
            isRetina,
            isMobile
        }}>
            {props.children}
        </MediaContext.Provider>
    );
}
export const useMedia = () => React.useContext(MediaContext);
