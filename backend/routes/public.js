import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cadastroSchema, loginSchema } from "../schemas/auth.js";
import { loginLimiter, cadastroLimiter } from "../middlewares/rateLimiter.js";
import { prisma } from "../lib/prisma.ts";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
router.post("/cadastro", cadastroLimiter, async (req, res) => {
  const result = cadastroSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }

  try {
    const { name, email, password } = result.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    res.status(201).json({ message: "Usuario criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro do servidor" });
  }
});

// Login
router.post("/login", loginLimiter, async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }

  try {
    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "E-mail não encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta." });
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
