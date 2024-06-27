import * as MT from "@material-tailwind/react";
import {color, size} from "grvd/components";

export interface IButtonProps extends MT.ButtonProps {
    colorcustom?: color;
    sizecustom?: size;
}

export type TButtonWithLoadingLabel = {
    labelDefault: string;
    labelLoading: string;
    labelDone: string;
    labelError?: string;
}

export interface IButtonWithLoadingProps extends IButtonProps {
    isloading?: boolean;
    isdone?: boolean;
    iserror?: boolean;
    textloading?: string;
    textdone?: string;
    label: TButtonWithLoadingLabel;
}
