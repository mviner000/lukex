"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments)
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />

        <Button onClick={() => {
          createDocument({ title: 'hellow' })
        }}>Click Me</Button>

        {documents?.map((doc) =>
          <div key={doc._id}>{doc.title}</div>
        )}
      </Authenticated>
    </main>
  );
}

