// Define logic related to classes
import {Request, Response, NextFunction} from 'express';
import {CustomerService} from "../interfaces/customer/customer.interface";

export class CustomerController {
    public customerService = new CustomerService();

    public async signIn(req: Request, res: Response): Promise<void> {

    }
}