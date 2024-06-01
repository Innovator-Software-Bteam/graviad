import {IPageProps} from "grvd/pages/types";
import {twJoin} from "tailwind-merge";
import {ProfileDetailForPreview} from "grvd/molecules";

export function Profile({className, ...props}: IPageProps) {
    return (
        <div className={'w-full h-full flex items-center justify-center relative'}>
            <img
                src={'/assets/profile_view_effect.png'}
                alt={'Profile view effect'}
                className={twJoin(
                    'absolute top-[35%] left-0',
                    'w-full h-full object-cover',
                    'z-[-1]'
                )}
            />
            <ProfileDetailForPreview/>
        </div>
    );

}