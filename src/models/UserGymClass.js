// models/UserGymClass.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const UserGymClass = sequelize.define(
    "user_gym_class",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        gymClassId: {
            type: DataTypes.INTEGER,
            references: {
                model: "gym_class",
                key: "id",
            },
        },
    },
    { timestamps: false }
);