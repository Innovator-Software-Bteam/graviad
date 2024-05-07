import {ButtonProps as MTButtonProps, ButtonStyleTypes as MTButtonStyleTypes} from "@material-tailwind/react";

export interface IButtonProps extends MTButtonProps {

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
export interface IButtonStyleTypes extends MTButtonStyleTypes {
    readonly defaultProps?: {
        readonly variant?: string;
        readonly size?: string;
        readonly color?: string;
        readonly fullWidth?: boolean;
        readonly ripple?: boolean;
        readonly className?: string;
    };
}
