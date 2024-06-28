import {twJoin} from "tailwind-merge";

export function DemoPage() {
    return(
        <div
            className={twJoin(
                "h-screen w-full py-20",
                'flex items-center justify-center',
            )}
        >

        <div
            className={twJoin(
                "relative h-screen w-full",
                'rounded-lg'
            )}
        >
            <video width="100%" height="100%" loop={true} muted={true} playsInline={true} autoPlay={true}
                   className={twJoin(
                          "absolute",
                          "top-0",
                          "left-0",
                          "object-fill",
                          "max-w-[800px] aspect-video",
                          "z-0",
                       'rounded-lg',

                   )}
            >
                <source src="/assets/graviad_demo_desktop.mp4" type="video/mp4;"/>
            </video>
        </div>
        </div>
    )
}