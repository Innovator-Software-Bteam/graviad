// Define interface of customer

/**
 * Customer interface
 * @method logIn
 * @method signUp
 * @method logOut
 */
export interface IAuth {
    logIn: (email: string, password: string) => any;
    logOut: (email: string) => any;
    signUp: (email: string, password: string) => any;
}
export class CustomerService implements IAuth {
    logIn(email: string, password: string): any {
    }

    logOut(email: string): any {
    }

    signUp(email: string, password: string): any {
    }

}