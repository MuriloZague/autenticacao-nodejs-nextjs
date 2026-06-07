import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link className="block" href={"/login"}>Login</Link>
      <Link className="block" href={"/register"}>Cadastro</Link>
    </div>
  );
}
