/**
 * @file auth.model.ts
 * @module Authentication
 * @version 0.0.2
 * @description This is the model for the authentication module.
 * It includes all models from the root database and initializes the connections to map them.
 * @updated on 04/05/2024
 */
import {ABaseEntity} from "../base.model";
import {DataTypes} from "sequelize";
import {localSequelize} from "../../config";
import {IUser} from "../../declare";

export class Role extends ABaseEntity<number> {
    declare name: string;
    declare description: string;

    declare permissions: Permission[];
}

export class Permission extends ABaseEntity<number> {
    declare name: string;
    declare description: string;
}

export class User extends ABaseEntity<string> implements IUser {
    declare firstName: string;
    declare lastName: string;
    declare username: string;
    declare email: string;
    declare password: string;

    declare roles: Role[];

    constructor(values?: any, options?: any) {
        super(values, options);
    }

    logout = (email: string) => {
        // Implement the logout functionality here
    };

    signUp = (email: string, password: string) => {
        // Implement the signUp functionality here
    };

    login = (password: string) => {
        return this.password === password;
    };
}
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'last_name'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: localSequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Role.init({}, {
    sequelize: localSequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Permission.init({}, {
    sequelize: localSequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

User.hasMany(Role, {
    foreignKey: 'email',
    as: 'user_has_roles'
});
Role.belongsTo(User, {
    foreignKey: 'email',
    as: 'user_has_roles'
});
Role.hasMany(Permission, {
    foreignKey: 'roleId',
    as: 'role_has_permissions'
});
Permission.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role_has_permissions'
});

