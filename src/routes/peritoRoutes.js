import express from "express";

import {
    crearPerito,
    eliminarPerito,
    listarPeritos,
    obtenerPerito
} from "../controllers/peritoController.js";

const router = express.Router();

router.post("/", crearPerito);
router.get("/", listarPeritos);
router.get("/:id", obtenerPerito);
router.delete("/:id", eliminarPerito);

export default router;
