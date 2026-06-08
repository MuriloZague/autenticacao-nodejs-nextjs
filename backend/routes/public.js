import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.ts";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json({ message: "Usuario criado com sucesso!"});
  } catch (err) {
    res.status(500).json({ message: "Erro do servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    // Busca usuario se existe ou nao
    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário nao encontrado!" });
    }

    // Verifica se senha corresponde ou nao
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    // Gera JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro do servidor" });
  }
});

export default router;
