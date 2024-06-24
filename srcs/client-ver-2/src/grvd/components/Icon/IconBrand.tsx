import React from "react";

export interface IconBrandProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export function IconBrand(props: IconBrandProps) {
    const {size = 24} = props;
    return (
        <svg width={size} height={size} viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M35.7557 20.4718L54.1919 43.1335C56.1853 45.5837 54.4416 49.25 51.2829 49.25H14.4107C11.2519 49.25 9.50831 45.5837 11.5017 43.1335L29.9378 20.4718C31.4385 18.6272 34.2551 18.6272 35.7557 20.4718Z"
                stroke="#D9D9D9" strokeWidth="0.5"/>
            <rect x="28" y="17.5649" width="8" height="32.0012" rx="4" transform="rotate(-39.2805 28 17.5649)"
                  fill="#666666"/>
            <rect width="8" height="32.0012" rx="4"
                  transform="matrix(-0.774055 -0.633118 -0.633118 0.774055 38.4529 17.5649)" fill="white"/>
            <rect width="8" height="32.0012" rx="4" transform="matrix(0 -1 -1 0 48 52.5)" fill="white"/>
        </svg>
    )
}