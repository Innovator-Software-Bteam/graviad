import {DataTypes} from "sequelize";
import {Model} from "sequelize";
import {localSequelize as sequelize} from "../../config/database.config";
import {IAuth} from "../../interfaces/customer/customer.interface";

// Define the model
export abstract class BaseModel extends Model {
    public id!: number;
    public name!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export class Account extends Model {
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export class Role extends BaseModel {

}

export class Provider extends BaseModel {

}

export class Customer extends BaseModel {
    public account: Account = new Account();
    public firstName!: string;
    public lastName!: string;
    public roles: Role[] = [];

}

// Initialize the model
Customer.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    }
}, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers'
});
Account.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
});
Role.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
});
Provider.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Provider',
    tableName: 'providers'
});

// Define the relationships
Customer.hasOne(Account, {
    foreignKey: 'customerId',
    as: 'customer_has_account'
});
Account.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer_has_account'
});
Customer.hasMany(Role, {
    foreignKey: 'customerId',
    as: 'customer_has_roles'
});
Role.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer_has_roles'
});
