import {useDialog} from "grvd/organisms";
import {Dialog, DialogBody, DialogFooter, Typography} from "@material-tailwind/react";
import React from "react";
import {twJoin} from "tailwind-merge";
import {Button} from "grvd/components/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {TRedirectURL} from "grvd";


export interface IDialogRequiredLoginProps extends React.ComponentProps<'div'> {
    title?: string;
    content?: string;
}

export function DialogRequiredLogin(props: IDialogRequiredLoginProps) {
    const {close, open, isOpen} = useDialog();
    const location = useLocation();
    const handleLogin = () => {
        const itemName: TRedirectURL = 'redirect_url_after_login';
        localStorage.setItem(itemName, location.pathname);
        window.location.href = '/homepage/login';
    }
    return (
        <Dialog
            open={isOpen}
            handler={open}
            title={'Login Required'}
            size={'sm'}
            className={'bg-grvd-theme-sys-dark-surface-container-lower overflow-clip z-[100]'}
        >
            <div className={twJoin(
                'absolute top-0 left-1/2 transform -translate-x-1/2',
                'w-full h-[30%]',
                'bg-[rgb(176,13,253)]/50 blur-[50px] -z-10',
            )}/>
            <svg width="100%" height="50%" viewBox="0 0 429 195" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1482_7192)">
                    <path
                        d="M122.103 91.2928C122.103 94.3659 124.594 96.8571 127.667 96.8571L134.739 96.8571C138.376 96.8571 141.424 99.414 143.326 102.514C144.657 104.681 146.379 106.604 148.422 108.176C152.11 111.013 156.635 112.545 161.288 112.531L178.573 112.499C180.736 112.495 182.487 110.741 182.487 108.577V108.577C182.487 106.411 184.243 104.655 186.41 104.655L194.909 104.655C197.961 104.655 200.434 102.181 200.434 99.1299V99.1299C200.434 96.0784 197.961 93.6047 194.909 93.6047L184.799 93.6047C183.523 93.6047 182.487 92.5696 182.487 91.2928V91.2928C182.487 90.0159 183.523 88.9808 184.799 88.9808L194.909 88.9808C197.961 88.9808 200.434 86.5071 200.434 83.4557V83.4557C200.434 80.4042 197.961 77.9305 194.909 77.9305L186.41 77.9305C184.243 77.9305 182.487 76.1745 182.487 74.0084V74.0084C182.487 71.845 180.736 70.0902 178.573 70.0862L161.288 70.0542C156.642 70.069 152.131 71.6115 148.448 74.4441C146.4 76.0196 144.672 77.9454 143.334 80.1165C141.435 83.1969 138.397 85.7284 134.778 85.7284L127.667 85.7284C124.594 85.7284 122.103 88.2197 122.103 91.2928V91.2928ZM161.288 81.1437C161.288 81.1653 161.306 81.1828 161.327 81.1828L166.363 81.1633C169.162 81.1525 171.437 83.4189 171.437 86.2184L171.437 93.4109C171.437 97.8412 167.837 101.428 163.406 101.411L161.288 101.403C158.596 101.403 156.015 100.333 154.112 98.4301C152.208 96.5267 151.139 93.9453 151.139 91.2536C151.139 88.5619 152.208 85.9804 154.112 84.0771C156.006 82.183 158.571 81.1149 161.249 81.1046C161.271 81.1045 161.288 81.1221 161.288 81.1437V81.1437Z"
                        fill="white"/>
                    <path
                        d="M270.447 85.6735C266.829 85.6735 263.79 83.142 261.891 80.0615C260.553 77.8905 258.825 75.9646 256.777 74.3892C253.095 71.5566 248.583 70.014 243.937 69.9993L230.723 70.0237C226.31 70.0319 222.738 73.6112 222.738 78.0237L222.738 104.437C222.738 108.855 226.319 112.437 230.738 112.437L243.976 112.437C248.622 112.422 253.134 110.88 256.816 108.047C258.864 106.472 260.592 104.546 261.93 102.375C263.829 99.2945 266.868 96.763 270.486 96.763L277.597 96.763C280.667 96.763 283.153 94.2686 283.142 91.1987V91.1987C283.131 88.1441 280.652 85.6735 277.597 85.6735L270.447 85.6735ZM243.917 101.367C243.925 101.36 243.919 101.348 243.909 101.348L236.757 101.375C235.119 101.382 233.788 100.056 233.788 98.4177L233.788 89.0888C233.788 84.6705 237.37 81.0888 241.788 81.0888L243.898 81.0888C246.589 81.0888 249.171 82.1581 251.074 84.0614C252.978 85.9647 254.047 88.5462 254.047 91.2378C254.047 93.9295 252.978 96.511 251.074 98.4143C249.177 100.311 246.607 101.38 243.925 101.387C243.915 101.387 243.91 101.375 243.917 101.367V101.367Z"
                        fill="#B00DFD"/>
                    <path
                        d="M491.148 98.8792C491.327 99.6881 492.128 100.199 492.937 100.02C493.746 99.8412 494.257 99.0405 494.078 98.2316L491.148 98.8792ZM282.72 92.7329C296.946 93.4577 316.712 91.9836 338.381 89.9579C360.1 87.9277 383.762 85.3397 405.937 83.7984C428.124 82.2562 448.678 81.7742 464.154 83.9218C471.897 84.9963 478.255 86.715 482.885 89.2122C487.488 91.6953 490.263 94.8746 491.148 98.8792L494.078 98.2316C492.948 93.1223 489.417 89.3274 484.309 86.5718C479.226 83.8305 472.466 82.0465 464.567 80.9503C448.759 78.7567 427.939 79.2618 405.729 80.8056C383.508 82.3502 359.753 84.947 338.102 86.971C316.402 88.9995 296.848 90.4488 282.873 89.7368L282.72 92.7329Z"
                        fill="#B00DFD"/>
                    <path
                        d="M134.946 93.1636C135.774 93.1636 136.446 92.492 136.446 91.6636C136.446 90.8351 135.774 90.1636 134.946 90.1636L134.946 93.1636ZM-64.0731 105.129C-64.6805 107.511 -64.6923 109.677 -64.0237 111.587C-63.35 113.511 -62.0379 115.023 -60.2707 116.174C-56.8216 118.419 -51.4984 119.378 -45.0334 119.548C-32.0202 119.89 -13.2241 117.038 7.78985 113.132C28.9271 109.204 52.1896 104.235 74.6145 100.205C96.9872 96.1854 118.215 93.1636 134.946 93.1636L134.946 90.1636C117.927 90.1636 96.4725 93.2299 74.084 97.2526C51.7476 101.266 28.1701 106.293 7.2417 110.183C-13.81 114.095 -32.3048 116.881 -44.9546 116.549C-51.3211 116.381 -55.9223 115.425 -58.634 113.66C-59.9472 112.805 -60.7745 111.788 -61.1923 110.595C-61.6152 109.387 -61.6704 107.848 -61.1662 105.871L-64.0731 105.129Z"
                        fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_1482_7192" x="-64.5271" y="69.9993" width="567.64" height="58.5764"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dx="5" dy="5"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1482_7192"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1482_7192" result="shape"/>
                    </filter>
                    <filter id="filter1_d_1482_7192" x="192.738" y="39.9993" width="120.405" height="102.438"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="15"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix"
                                       values="0 0 0 0 0.690196 0 0 0 0 0.0509804 0 0 0 0 0.992157 0 0 0 0.5 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1482_7192"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1482_7192" result="shape"/>
                    </filter>
                </defs>
            </svg>

            <DialogBody className={twJoin(
                'flex flex-col gap-4 items-center justify-center',
                'p-4',
            )}>
                <Typography
                    variant={'h4'}
                    className={'text-grvd-theme-sys-dark-quaternary font-bold'}
                >
                    Oops!
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary'}
                >
                    You need login to use this feature!
                </Typography>
            </DialogBody>
            <DialogFooter
                className={twJoin(
                    'flex flex-row justify-end gap-4 items-center !w-full',
                    'p-4',
                )}
            >
                <Button
                    sizecustom={'lg'}
                    variant={'text'}
                    onClick={close}
                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
                >
                    Cancel
                </Button>
                <Button
                    sizecustom={'lg'}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </DialogFooter>
        </Dialog>
    );
}