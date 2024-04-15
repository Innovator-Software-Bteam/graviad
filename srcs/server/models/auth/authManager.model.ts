// Manager for auth database
import {Customer} from "./auth.model";

export class CustomerManager {
    public static async validatorPassword(customer: Customer, password: string): Promise<boolean> {
        // Compare password
        return customer.account.password === password;
    }
}