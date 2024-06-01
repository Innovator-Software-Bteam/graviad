import * as MT from "@material-tailwind/react";
import {color, size} from "grvd/components";

export interface IButtonProps extends MT.ButtonProps {
    colorCustom?: color;
    sizeCustom?: size;
}

export enum ButtonColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY_A = 'tertiary_a',
    TERTIARY_B = 'tertiary_b',
}

export enum ButtonSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}
