import {Typography} from "@material-tailwind/react";
import {Button} from "grvd/components/Button";
import {Link, useNavigate} from "react-router-dom";
import {twJoin} from "tailwind-merge";
import Spline from "@splinetool/react-spline";
import {Application, SPEObject} from "@splinetool/runtime";

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div
            className={twJoin(
                'flex flex-col justify-start items-center w-full gap-4',
                'px-2 py-20 h-full min-h-fit',
                'md:h-screen lg:h-screen xl:h-screen',
            )}
        >
            <Typography
                variant={'lead'}
                className={'font-bold text-9xl text-grvd-theme-sys-dark-primary text-center'}
            >
                404
            </Typography>
            <Typography
                variant={'h6'}
                className={'text-grvd-theme-sys-dark-primary text-center'}
            >
                Page Not Found
            </Typography>
            <Typography
                variant={'paragraph'}
                className={'text-grvd-theme-sys-dark-primary w-full break-words text-center'}
            >
                The page you are looking for is not found or missing
            </Typography>
            <Button
                colorcustom={'primary'}
                sizecustom={'lg'}
                onClick={() => {
                    navigate('.', {replace: true});
                }}
            >
                BACK HOME
            </Button>
            <Spline
                scene="https://prod.spline.design/sIKw5w-KAvhEJLTR/scene.splinecode"
            />
        </div>
    );
}