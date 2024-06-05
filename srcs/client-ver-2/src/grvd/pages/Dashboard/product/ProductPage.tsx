import {ProductDetailForPreview} from "grvd/molecules/Product";
import {useParams} from "react-router-dom";
import {ProductDetailForEdit} from "grvd/molecules/Product/ProductDetailForEdit";
import {twJoin} from "tailwind-merge";

export function ProductPage() {
    const {id} = useParams();
    return (
        <div className={'w-full min-w-fit h-full min-h-fit relative'}>
            <div className={twJoin(
                'bg-[radial-gradient(41.69%_43.44%_at_51.96%_21.43%,rgba(0,177,253,0.50)_0%,rgba(0,86,215,0.50)_100%)] blur-[200px]',
                'rounded-full',
                'w-1/2 h-[30vh] absolute top-0 left-1/2 transform -translate-x-1/2 -z-20',
            )}/>
            <ProductDetailForPreview id={id}/>
            {/*<ProductDetailForEdit id={id}/>*/}
        </div>
    );
}