
import { User, Role } from "../models/index.js";
import createError from "http-errors";
import chalk from "chalk";

// POST: Crear perito
export const crearPerito = async (req, res, next) => {
    try {
        const { username, role_id } = req.body;

        // Validar username
        if (!username || !username.trim()) {
            console.log(chalk.yellow(
                "Error de validación: username vacío"
            ));

            throw createError(400, "El username es obligatorio");
        }

        // Validar role_id
        if (!role_id) {
            throw createError(400, "El role_id es obligatorio");
        }

        // Comprobar si existe el rol
        const rol = await Role.findByPk(role_id);

        if (!rol) {
            throw createError(400, "El rol no existe");
        }

        // Comprobar si el username ya existe
        const existente = await User.findOne({
            where: { username: username.trim() }
        });

        if (existente) {
            throw createError(409, "El username ya existe");
        }

        // Crear usuario
        const nuevoPerito = await User.create({
            username: username.trim(),
            role_id
        });

        console.log(chalk.cyan(
            "Nuevo perito registrado:",
            JSON.stringify(nuevoPerito.toJSON())
        ));

        res.status(201).json(nuevoPerito);

    } catch (error) {
        next(error);
    }
};


export const eliminarPerito = async (req, res, next) => {
    try {
        const { id } = req.params;

        const perito = await User.findByPk(id);

        if (!perito) {
            throw createError(404, "Perito no encontrado");
        }

        if (!perito.active) {
            throw createError(404, "Perito no encontrado");
        }

        // Baja lógica
        await perito.update({ active: false });

        res.status(200).json({
            mensaje: "Perito dado de baja correctamente"
        });

    } catch (error) {
        next(error);
    }
};
 

export const listarPeritos = async (req, res, next) => {
    try {
        const { role } = req.query;

        const where = {
            active: true
        };

        if (role) {
            where["$role.nombre_rol$"] = role;
        }

        const peritos = await User.findAll({
            where,
            include: [{
                model: Role,
                as: "role",
                attributes: ["nombre_rol"],
                required: false
            }]
        });

        res.status(200).json(peritos);

    } catch (error) {
        next(error);
    }
};


export const obtenerPerito = async (req, res, next) => {
    try {
        const { id } = req.params;

        const perito = await User.findOne({
            where: {
                id,
                active: true
            },
            include: [{
                model: Role,
                as: "role",
                attributes: ["nombre_rol"]
            }]
        });

        if (!perito) {
            throw createError(404, "Perito no encontrado");
        }

        res.status(200).json(perito);

    } catch (error) {
        next(error);
    }
};
