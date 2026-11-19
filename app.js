import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import peritoRoutes from "./src/routes/peritoRoutes.js";
import { initializeDatabase } from "./src/models/index.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/v1/peritos", peritoRoutes);

// Ruta inexistente
app.use((req, res, next) => {
    next(Object.assign(
        new Error("Ruta no encontrada"),
        { status: 404 }
    ));
});

// Manejo centralizado de errores
app.use(errorHandler);

// Iniciar servidor
const iniciarServidor = async () => {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en puerto ${PORT}`);
            console.log(`API de peritos: http://localhost:${PORT}/api/v1/peritos`);
        });

    } catch (error) {
        console.error("Error al iniciar:", error);
        process.exit(1);
    }
};

iniciarServidor();
