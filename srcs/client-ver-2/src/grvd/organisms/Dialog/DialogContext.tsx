import React, {useEffect} from 'react';
import {DialogError, DialogRequiredLogin, DialogType, TDialogType} from "./index";


export type TDialogContext = {
    open: (content?: React.ReactNode, type?: TDialogType) => void;
    isOpen: boolean;

    close: () => void;
};

export const DialogContext = React.createContext<TDialogContext | undefined>(undefined);
export const DialogErrorContext = React.createContext<TDialogContext | undefined>(undefined);
export const DialogRequiredContext = React.createContext<TDialogContext | undefined>(undefined);



export const useDialogError = () => {
    const context = React.useContext(DialogErrorContext);
    if (!context) {
        throw new Error('useDialogError must be used within a DialogProvider');
    }
    return context;
};
export const useDialogRequired = () => {
    const context = React.useContext(DialogRequiredContext);
    if (!context) {
        throw new Error('useDialogRequired must be used within a DialogProvider');
    }
    return context;
};
export const useDialog = () => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};
// export function DialogErrorProvider(props: React.PropsWithChildren<{}>) {
//     const [isOpen, setIsOpen] = React.useState<boolean>(false);
//     const [title, setTitle] = React.useState<string>('');
//     const [content, setContent] = React.useState<React.ReactNode>('');
//     const open = (content: React.ReactNode) => {
//         setIsOpen(true);
//         setContent(content);
//     };
//     const close = () => {
//         setIsOpen(false);
//     };
//     return (
//         <DialogErrorContext.Provider value={{open, close, isOpen}}>
//             {props.children}
//             <DialogError title={'Oops!'} content={content || 'Something went wrong. Please try again!'}/>
//         </DialogErrorContext.Provider>
//     );
// }
export interface IDialogProviderProps extends React.PropsWithChildren<{}> {
}

export function DialogProvider(props: IDialogProviderProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<React.ReactNode>('');
    const [title, setTitle] = React.useState<string>('');
    const [type, setType] = React.useState<TDialogType | undefined>(DialogType.DIALOG_TYPE_ERROR);
    const open = (content?: React.ReactNode, type?: TDialogType) => {
        setIsOpen(true);
        setType(type);
        setContent(content);
    };
    const close = () => {
        setIsOpen(false);
    };
    useEffect(() => {

    }, [type]);
    return (
        <DialogContext.Provider value={{open, close, isOpen}}>
            {props.children}
            {type === DialogType.DIALOG_TYPE_ERROR && <DialogError content={content} title={title || 'Oops'}/>}
            {type === DialogType.DIALOG_TYPE_REQUIRED && <DialogRequiredLogin/>}
        </DialogContext.Provider>
    );

}