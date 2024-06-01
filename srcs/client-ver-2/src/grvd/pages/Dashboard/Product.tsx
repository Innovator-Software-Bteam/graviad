import {ProductDetailForPreview} from "grvd/molecules/Product";
import {useParams} from "react-router-dom";
import {ProductDetailForEdit} from "../../molecules/Product/ProductDetailForEdit";

export function Product() {
    const {id} = useParams();
    return(
        <div>
            {/*<ProductDetailForPreview id={id}/>*/}
            <ProductDetailForEdit id={id}/>
        </div>
    )
}