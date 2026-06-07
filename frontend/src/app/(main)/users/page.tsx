import { cookies } from "next/headers";
import DeleteButton from "../../components/deleteButtom";

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function ListUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { users }: { users: User[] } = await response.json();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <DeleteButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}
