import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import classNames from "classnames";
import {Label} from "../../../atoms/Label/Label";
import {Input} from "../../../atoms/Input";
import {FaExternalLinkAlt} from "react-icons/fa";
import {FaCircleExclamation} from "react-icons/fa6";
import {useContext, useEffect, useState} from "react";
import {BusinessCardCanvas} from "../../../../three/BusinessCard/BusinessCard";
import {AuthContext} from "../../../../contexts/AuthContext";
import Spline from '@splinetool/react-spline';
import axios from "axios";
import url from "url";
import {urlServer} from "../../../../config/graviad.config";
import {setRole} from "../../../../redux/counters/User";

function ProfileAvatar() {
    const user = useSelector(state => state.User);
    const customer = useSelector(state => state.User.roles.customer);
    const dispatch = useDispatch();
    const getCustomer = () => {
        axios.get(url.resolve(urlServer.toString(), `/roles/customer/${user.profile.emails[0].value}`))
            .then((res) => {
                dispatch(setRole(res.data));
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    useEffect(() => {
        getCustomer();
    }, []);
    return (
        <div className={classNames(
            'flex flex-row gap-4',
            'w-fit h-full',
            'items-center justify-start',
        )}>
            <Avatar
                src={user.profile.photos[0].value}
                alt={user.profile.displayName}
                variant={'circular'}
                withBorder={true}
                className={classNames(
                    'mx-auto',
                    'outline outline-offset-5 outline-grvd-theme-sys-dark-tertiary',
                    'w-full h-full',
                )}
            />
            <div>
                <div className={classNames(
                    'flex flex-col',
                    'w-full h-full',
                    'gap-4'
                )}>
                    <Typography
                        variant={'h1'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-primary',
                            'font-bold',
                            'w-fit',
                            'whitespace-nowrap'
                        )}
                    >
                        {user.profile.displayName}
                    </Typography>
                    <Label variant={'contained'} size={'base'} color={'primary'} className={'w-fit'}>
                        {customer.slogan}</Label>
                    <Typography
                        as={'a'}
                        variant={'small'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-on-primary-variant',
                            'font-medium',
                            'flex flex-row gap-2 items-center justify-start',
                            'hover:text-grvd-theme-sys-dark-primary/80',
                            'transition-colors duration-200 ease-in-out',
                        )}
                        href={'https://trenalys.io.vn'}
                        target={'_blank'}
                    >
                        {customer.socialLink}
                        <FaExternalLinkAlt className={'inline-block'} size={'16'}/>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

function ProfileForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        criteriaMode: 'firstError'
    });
    const user = useSelector(state => state.User);
    const customer = useSelector(state => state.User.roles.customer);
    const [description, setDescription] = useState(user.profile.description);
    const [phone, setPhone] = useState(customer.phone);
    const [socialLink, setSocialLink] = useState(customer.socialLink);
    const [slogan, setSlogan] = useState(customer.slogan);
    const [email] = useState(user.profile.emails[0].value);

    return (
        <form className={classNames(
            'flex flex-col gap-4',
        )}>
            <div>
                <Typography
                    as={'label'}
                    variant={'paragraph'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-primary',
                        'font-medium',
                    )}
                >
                    Description
                </Typography>
                <Input
                    type={'text'}
                    label={'Description'}
                    placeholder={'Description'}
                    labelProps={{
                        className: 'hidden'
                    }}
                    defaultValue={description}
                    containerProps={{
                        className: '!w-full'
                    }}
                    {...register('description', {required: false})}
                />
            </div>
            <div className={classNames(
                'flex flex-row gap-4 items-center w-full',
            )}>
                <div
                    className={classNames(
                        'w-full',
                    )}
                >
                    <Typography
                        as={'label'}
                        variant={'paragraph'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-primary',
                            'font-medium',
                        )}
                    >
                        Email
                    </Typography>
                    <Input
                        type={'email'}
                        label={'Email'}
                        placeholder={'Email'}
                        labelProps={{
                            className: 'hidden'
                        }}
                        containerProps={{
                            className: '!w-full'
                        }}
                        disabled={true}
                        defaultValue={email}
                        {...register('email', {required: true})}
                    />
                </div>
                <div
                    className={classNames(
                        'w-full',
                    )}
                >
                    <Typography
                        as={'label'}
                        variant={'paragraph'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-primary',
                            'font-medium',
                        )}
                    >
                        Phone
                    </Typography>
                    <Input
                        type={'tel'}
                        label={'Phone'}
                        placeholder={'Phone'}
                        labelProps={{
                            className: 'hidden'
                        }}
                        containerProps={{
                            className: '!w-full'
                        }}
                        defaultValue={phone}
                        {...register('phone', {required: false})}
                    />
                </div>
            </div>
            <div>
                <Typography
                    as={'label'}
                    variant={'paragraph'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-primary',
                        'font-medium',
                    )}
                >
                    Slogan
                </Typography>
                <div>
                    <Input
                        type={'url'}
                        label={'Slogan'}
                        placeholder={'Type your slogan'}
                        labelProps={{
                            className: 'hidden'
                        }}
                        containerProps={{
                            className: '!w-full'
                        }}
                        defaultValue={slogan}
                        {...register('slogan', {required: false})}
                    />
                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-1 font-normal"
                    >
                        <FaCircleExclamation size={'16'}/>
                        Slogan should be less than 100 characters
                    </Typography>
                </div>

            </div>
        </form>
    );
}

export function Profile() {
    return (
        <div>
            <div className={classNames(
                'flex flex-row justify-between'
            )}>
                <div className={classNames(
                    'w-full h-fit flex flex-col gap-4',
                )}>
                    <ProfileAvatar/>
                    <ProfileForm/>
                </div>
                {/*<BusinessCardCanvas*/}
                {/*    brandName={user.profile.displayName}*/}
                {/*    brandSlogan={slogan}*/}
                {/*    email={email}*/}
                {/*    phone={phone}*/}
                {/*    socialLink={socialLink}*/}
                {/*/>*/}
                <Spline scene="https://prod.spline.design/sIKw5w-KAvhEJLTR/scene.splinecode"/>
            </div>
        </div>
    );
}