// Define interface of customer

/**
 * Interface for a customer
 * @method login - Method for logging in a user. Takes an email and password as parameters.
 * @method logout - Method for logging out a user. Takes an email as a parameter.
 * @method signUp - Method for signing up a new user. Takes an email and password as parameters.
 */
export interface IUser {
    login: (email: string, password: string) => any;
    logout: (email: string) => any;
    signUp: (email: string, password: string) => any;
}
export interface ICustomer extends IUser {

}
export interface IDesigner extends IUser {

}
export interface IEnterprise extends IUser {

}