import { rateLimit } from "express-rate-limit";

const createHandler = (message) => (req, res) => {
  const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
  res.status(429).json({ message, retryAfter });
};

export const loginLimiter = rateLimit({
  windowMs: 0.3 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: createHandler("Muitas tentativas de login. Aguarde "),
});

export const cadastroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: createHandler("Muitos cadastros realizados. Aguarde "),
});
