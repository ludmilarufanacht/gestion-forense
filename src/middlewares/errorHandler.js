
import chalk from "chalk";

export const errorHandler = (err, req, res, next) => {

    const status = err.status || err.statusCode || 500;

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
