import UsersTable from "@/components/screens/users/users-table";

import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DEMO</title>
        <meta name="description" content="DEMO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UsersTable />
      </main>
    </div>
  );
}
