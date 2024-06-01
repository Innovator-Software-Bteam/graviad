import {DataTypes, Model} from "sequelize";
import {localSequelize} from "../config/database.config";
import {User} from "./auth.model";

export class Customer extends Model {
    declare email: string;
    declare phone: string;
    declare address: string;
    declare slogan: string;
    declare socialLink: string;
    declare numberOfLikes: number;
    declare numberOfProducts: number;
}

Customer.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'email'
        },
        onDelete: 'CASCADE'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    slogan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    socialLink: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'social_link'
    },
    numberOfLikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'number_of_likes'
    },
    numberOfProducts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'number_of_products'
    },
}, {
    sequelize: localSequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
User.hasOne(Customer, {
    foreignKey: 'email',
    onDelete: 'CASCADE'
});
Customer.belongsTo(User, {
    foreignKey: 'email',
    onDelete: 'CASCADE'
});
