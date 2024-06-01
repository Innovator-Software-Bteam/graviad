import React, {useEffect, useState} from "react";
import {twJoin} from "tailwind-merge";
import {Typography} from "@material-tailwind/react";
import {FaCloudUploadAlt, FaRegFileImage} from "react-icons/fa";
import {set} from "react-hook-form";

export interface IInputTypeFileProps extends React.ComponentProps<'input'> {
    color?: string;
    title?: string;
    listaccept?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    file?: File | null;
}

export const InputTypeFile = React.forwardRef<HTMLInputElement, IInputTypeFileProps>((props, ref) => {
    const [file, setFile] = useState<File | null>(null);
    useEffect(() => {
        setFile(props.file? props.file : null);
    }, [props.file]);
    return (
        <div className={twJoin(
            'w-full aspect-[1/1]',
            'border border-gray-600 rounded-lg',
            'p-4',
            'cursor-pointer',
            props.className
        )}
        >
            <label htmlFor={props.id} className={twJoin(
                'w-full min-w-fit min-h-fit h-full cursor-pointer',
                'flex flex-col items-center justify-between',
            )}>
            <Typography
                variant={'lead'}
                className={twJoin(
                    'font-semibold text-center w-full',
                    'flex flex-col items-center'
                )}
                style={{
                    color: props.color,
                }}
            >
                <FaCloudUploadAlt size={32} color={props.color}/>
                {props.title}
            </Typography>
            <Typography
                variant={'paragraph'}
                className={'text-grvd-theme-sys-dark-on-primary-variant font-medium text-center w-full'}
            >
                <b>Click to upload</b> or drag here
            </Typography>
            <Typography
                variant={'small'}
                className={'text-grvd-theme-sys-dark-on-primary-variant font-light text-center'}
            >
                {props.listaccept}
            </Typography>
            <input
                hidden
                id={props.id}
                type="file"
                ref={ref}
                {...props}
            />
            {file &&
                <Typography className={twJoin(
                    'text-grvd-theme-sys-dark-on-primary-variant break-words',
                    'flex flex-row items-center justify-between',
                    'p-2 bg-grvd-theme-sys-dark-surface-container-highest/20 rounded-lg',
                    'w-full'

                )}>
                {file?.name}
                <FaRegFileImage size={20}/>
            </Typography>}
            </label>
        </div>
    );
});
