import { caller } from "@/trps/server";

async function Home() {
  const users = await caller.getUsers()
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(users)}
    </div>
  );
}

 export default Home