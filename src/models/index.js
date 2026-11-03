
import sequelize from "../config/database.js";
import Role from "./role.js";
import User from "./user.js";


export async function initializeDatabase() {
    await sequelize.authenticate();

    // Activar claves foráneas en SQLite
    if (process.env.DB_DIALECT === "sqlite" ||
        !process.env.DB_DIALECT) {
        await sequelize.query("PRAGMA foreign_keys = ON");
    }

    // Crear las tablas
    await sequelize.sync();

    // Crear roles si todavía no existen
    const roles = ["ADMIN", "FORENSIC_INSPECTOR", "AUDITOR"];

    for (const nombre_rol of roles) {
        await Role.findOrCreate({
            where: { nombre_rol },
            defaults: { nombre_rol }
        });
    }

    // Crear usuarios de prueba
    const admin = await Role.findOne({
        where: { nombre_rol: "ADMIN" }
    });

    const inspector = await Role.findOne({
        where: { nombre_rol: "FORENSIC_INSPECTOR" }
    });

    const auditor = await Role.findOne({
        where: { nombre_rol: "AUDITOR" }
    });

    const users = [
        { username: "admin01", role_id: admin.id },
        { username: "perito01", role_id: inspector.id },
        { username: "auditor01", role_id: auditor.id }
    ];

    for (const user of users) {
        await User.findOrCreate({
            where: { username: user.username },
            defaults: user
        });
    }

    console.log("Base de datos inicializada correctamente");
}

// Un rol puede tener muchos usuarios
Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users"
});

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role"
});

export { sequelize, Role, User };
