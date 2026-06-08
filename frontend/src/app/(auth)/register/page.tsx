"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import api from "../../../services/api";
import { cadastroSchema, type CadastroForm } from "../../../schemas/auth";
import { useCountdown, formatCountdown } from "../../../hooks/useCountdown";

function Cadastro() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [retryAfter, setRetryAfter] = useState(0);
  const countdown = useCountdown(retryAfter);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  async function onSubmit(data: CadastroForm) {
    setServerError(null);
    setRetryAfter(0);
    try {
      await api.post("/cadastro", data);
      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message, retryAfter } = err.response?.data ?? {};
        if (retryAfter) {
          setRetryAfter(retryAfter);
          setServerError(message);
        } else {
          setServerError(message || "Erro ao criar conta. Tente novamente.");
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-1">Criar conta</h1>
        <p className="text-gray-400 text-sm mb-6">Junte-se à rede</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Nome</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Seu nome"
              className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.name && (
              <span className="text-red-400 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

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
            <p className="text-red-400 text-sm text-center">
              <span>
              {serverError}
              {countdown > 0 && (
                formatCountdown(countdown)
              )}
              </span>
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || countdown > 0}
            className="mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 transition cursor-pointer"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar-se"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
