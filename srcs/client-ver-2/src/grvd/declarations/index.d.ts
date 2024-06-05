// declare global {
//     /**
//      * @description [User] Type of user to fetch json.
//      */
//     export type TUser = {
//         id: string;
//         email: string;
//         role: Role;
//         profile: TProfile;
//         merchant?: TMerchant;
//
//     }
//     export type TMerchant = {
//         id: string;
//         name?: string;
//         description?: string;
//         slogan?: string;
//         email?: string;
//         phone?: string;
//         address?: string;
//         socialLinks?: any [];
//         numberOfLikes?: number;
//         numberOfProducts?: number;
//     }
//     type TProfileGoogle = {
//         id: string;
//         displayName: string;
//         name: {
//             familyName: string;
//             givenName: string;
//         };
//         photos: {
//             value: string;
//         } [];
//         emails: {
//             value: string;
//         } [];
//         provider: string;
//     }
//     type TProfileFacebook = {
//         id: string;
//         displayName: string;
//         name: {
//             familyName: string;
//             givenName: string;
//         };
//         photos: {
//             value: string;
//         } [];
//         emails: {
//             value: string;
//         } [];
//         provider: string;
//     }
//     type TProfile = TProfileFacebook | TProfileGoogle;
//     type TRole = "user" | "customer" | "enterprise";
//
//     /**
//      * @description [ProductPage] Type of product to fetch json.
//      */
//     type TThumbnail2D = {
//         id?: string;
//         data: any;
//     };
//     type TProduct = {
//         id?: string;
//         name: string;
//         merchantId: string;
//         description?: string;
//         brief?: string;
//         price?: number | string;
//         link?: string;
//         version?: string;
//         dateRelease?: Date;
//         highlightLabel?: string;
//         numberOfLikes?: number;
//         thumbnail2D?: TThumbnail2D;
//         features: TFeature[];
//     };
//     type TProductFeature = {
//         id: string;
//         title: string;
//         description: string;
//     }
// }