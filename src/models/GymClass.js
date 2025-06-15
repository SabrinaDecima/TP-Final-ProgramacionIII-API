import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const GymClass = sequelize.define(
  "gym_class",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
