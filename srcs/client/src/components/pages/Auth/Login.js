import {useForm} from "react-hook-form";
import {Input} from "@material-tailwind/react";
import classNames from "classnames";
import {Button} from "../../atoms/Button";
import {urlServer, urlServerAuthByGoogle} from "../../../config/graviad.config";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import url from "url";

export function LoginForm({className, ...props}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: "onChange",
        defaultValues: {},
        resolver: undefined,
        criteriaMode: 'firstError'
    });
    const onsubmit = async (data) => {
        console.log('data', data);
        await axios.post(url.resolve(urlServer.toString(), '/auth/grvd'), data, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    console.log('Login success');
                    window.location.href = '/';
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <form
            onSubmit={handleSubmit(onsubmit)}
            className={classNames(
                'w-full h-fit', className)}
            {...props}
        >
            <Input
                className={classNames(
                    'rounded-md',
                    'text-grvd-theme-sys-dark-on-surface',
                    '!bg-grvd-theme-sys-dark-surface-container',
                    '!border-grvd-theme-ref-neutral-neutral-400 !border',
                    'focus:!border-grvd-theme-sys-dark-primary',
                    'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
                    'outline-none',
                )}
                labelProps={{
                    className: classNames(
                        'hidden',
                    )
                }}

                type={'text'}
                placeholder={'Username'}
                onChange={(e) => setUsername(e.target.value)}
                {...register('username', {
                    required: true
                })}
            />
            <Input
                className={classNames(
                    'rounded-md',
                    'text-grvd-theme-sys-dark-on-surface',
                    '!bg-grvd-theme-sys-dark-surface-container',
                    '!border-grvd-theme-ref-neutral-neutral-400 !border',
                    'focus:!border-grvd-theme-sys-dark-primary',
                    'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
                    'outline-none',
                )}
                labelProps={{
                    className: classNames(
                        'hidden',
                    )
                }}
                type={'password'}
                placeholder={'Password'}
                onChange={(e) => setPassword(e.target.value)}
                {...register('password', {
                    required: true
                })}/>
            <div className={classNames(
                'flex',
                'flex-col',
                'items-center',
                'gap-5',
                'w-full',
                'mx-auto',
            )}>

            </div>
            <Button className={'w-full'} type='submit' size={'lg'} onSubmit={onsubmit}>Login</Button>
        </form>
    );
}

export function Login() {
    const user = useSelector(state => state.User);
    useEffect(() => {
        console.log('Login', user);
    });
    return (
        <div
            className={classNames(
                'w-full',
                'h-full',
                'login',
                'relative'
            )}
        >
            <div
                className={classNames(
                    'gap-5',
                    'w-[25em]',
                    'mx-auto',
                    'my-[7vh]',
                    'flex',
                    'flex-col',
                    'justify-between',
                    'items-center',


                    'bg-grvd-theme-sys-dark-surface-container',
                    'backdrop-blur-[2.5px]',
                    'rounded-lg',
                    'p-6'
                )}
            >
                <div className={classNames(
                    'bg-gradient-to-r from-[#009AF2] to-[#CB35FF]',
                    'stroke-2',
                    'rounded-full',
                    'absolute',
                    'top-0',
                    'w-1/2',
                    '-translate-y-1/2',
                    'size-1',
                )}
                ></div>
                <div className={classNames(
                    'rounded-full blur-[150px] bg-gradient-to-r from-[#009AF2] to-[#CB35FF]',
                    'absolute',
                    'top-0',
                    'w-1/2',
                    'h-1/2',
                    '-z-50'
                )}></div>
                <h1
                    className={classNames(
                        'text-6xl',
                        'font-bold',
                        'text-center',
                        'text-grvd-theme-sys-dark-primary',
                        'mt-10',
                    )}
                >Welcome to Graviad
                </h1>
                <p
                    className={classNames(
                        'text-base',
                        'text-center',
                        'font-normal',
                        'text-grvd-theme-sys-dark-on-secondary-variant',
                    )}
                >Log in to explore exciting features</p>
                <LoginForm className={classNames(
                    'flex',
                    'flex-col',
                    'gap-4',
                )}/>
                <div
                    className={classNames(
                        'w-full'
                    )}
                >
                    <p
                        className={classNames(
                            'text-base',
                            'text-center',
                            'font-normal',
                            'text-grvd-theme-sys-dark-on-secondary-variant',
                        )}
                    >or continue with</p>
                    <div
                        className={classNames(
                            'flex',
                            'flex-row',
                            'gap-5',
                            'w-full',
                        )}
                    >
                        <Link to={urlServerAuthByGoogle.toString()}>
                            <Button className={'w-full'} size={'lg'} color={'secondary'}>Google</Button>
                        </Link>
                        <Button className={'w-full'} size={'lg'} color={'secondary'}>Facebook</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
