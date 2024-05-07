/**
 * @file user.ts
 * @description Customer interface, describing state of customer action.
 * @module Authentication
 * @version 0.0.1
 */

export declare enum CustomerMessage {
    GET_CUSTOMER_SUCCESS = 'Get customer successfully',
    GET_CUSTOMER_FAILED = 'Get customer failed',
    CREATE_CUSTOMER_SUCCESS = 'Create customer successfully',
    CREATE_CUSTOMER_FAILED = 'Create customer failed',
    UPDATE_CUSTOMER_SUCCESS = 'Update customer successfully',
    UPDATE_CUSTOMER_FAILED = 'Update customer failed',
    DELETE_CUSTOMER_SUCCESS = 'Delete customer successfully',
    DELETE_CUSTOMER_FAILED = 'Delete customer failed',
}

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