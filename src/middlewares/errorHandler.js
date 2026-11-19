
import chalk from "chalk";
import { AuditLog } from "../models/index.js";

export const errorHandler = async (err, req, res, next) => {

    const status = err.status || err.statusCode || 500;

    if ([401, 403, 404].includes(status)) {
        const auditMessage = `${req.method} ${req.originalUrl} - ${err.message}`;
        console.log(chalk.red(`Acceso no autorizado: ${auditMessage}`));

        try {
            await AuditLog.create({
                method: req.method,
                path: req.originalUrl,
                status,
                message: err.message,
                ip: req.ip
            });
        } catch (auditError) {
            console.log(chalk.red(
                `No se pudo guardar la auditoría: ${auditError.message}`
            ));
        }
    }

    // Errores de validación
    if (status === 400) {
        console.log(chalk.yellow(
            `Error de validación: ${err.message}`
        ));
    }

    // Errores críticos
    if (status >= 500) {
        console.log(chalk.red(
            `ERROR CRÍTICO: ${err.stack}`
        ));
    }

    res.status(status).json({
        error: err.message || "Error interno del servidor"
    });
};
