import React from "react";
import {Buffer} from "buffer";
import {Avatar, AvatarProps} from "@material-tailwind/react";

export interface IAvatarProps extends AvatarProps {
    data: any
}

export const AvatarBase64 = React.forwardRef((props: IAvatarProps, ref) => {
    const {data, ...otherProps} = props;
    const bufferData = Buffer.from(data);
    const base64String = Buffer.from(bufferData).toString('base64');
    if (!data || !base64String || !Buffer.isBuffer(bufferData)) {
        return <Avatar ref={ref as any} {...otherProps}/>
    }
    return (
        <Avatar
            ref={ref as any}
            {...otherProps}
            src={`data:image/*;base64,${base64String}`}
        />
    );
});