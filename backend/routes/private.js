import express from "express";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma.ts";

const router = express.Router();

router.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "Usuarios listados com sucesso!", users });
  } catch (err) {
    res.status(500).json({ message: "Erro do servidor" });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: `Usuário deletado com sucesso!` });
  } catch (err) {
    res.status(500).json({ message: "Erro do servidor" });
  }
});

export default router;
