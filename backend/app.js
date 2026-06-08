import express from "express"
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import auth from "./middlewares/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}))

app.use("/", publicRoutes)
app.use("/", auth, privateRoutes)

app.listen(3002, () => console.log('Rodando'))