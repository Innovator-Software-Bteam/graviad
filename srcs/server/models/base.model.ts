import {DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {v4 as uuidv4} from 'uuid';
import {localSequelize} from "../config/database.config";

export class ABaseEntity<IdType> extends Model {
    declare id: IdType;
}
ABaseEntity.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize: localSequelize,
    modelName: 'ABaseEntity',
    tableName: 'base_entities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
