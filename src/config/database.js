
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dialect = process.env.DB_DIALECT || "sqlite";

let sequelize;

if (dialect === "sqlite") {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_STORAGE || "./forensics.db",
        logging: false
    });
} else if (dialect === "postgres") {
    const requiredVariables = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST"];
    const missingVariables = requiredVariables.filter(
        (variable) => !process.env[variable]
    );

    if (missingVariables.length > 0) {
        throw new Error(
            `Faltan variables de PostgreSQL: ${missingVariables.join(", ")}`
        );
    }

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: "postgres",
            logging: false
        }
    );
} else {
    throw new Error("Dialecto de base de datos no válido");
}

export default sequelize;
