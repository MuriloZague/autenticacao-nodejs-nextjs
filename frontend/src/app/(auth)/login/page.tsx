"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import api from "../../../services/api";
import { loginSchema, type LoginForm } from "../../../schemas/auth";

function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    setServerError(null);
    try {
      await api.post("/login", data);
      router.push("/users");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setServerError(message || "Erro ao entrar. Tente novamente.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-1">Entrar</h1>
        <p className="text-gray-400 text-sm mb-6">Bem-vindo de volta</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">E-mail</label>
            <input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Senha</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-2.5 transition cursor-pointer"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
