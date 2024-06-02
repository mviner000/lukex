"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import { Button } from "@/components/ui/button";
import CreateDocumentButton from "./upload-document-button";



export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-14 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {documents?.map((doc) => (
          <DocumentCard key={doc._id} document={doc} />
        ))}
      </div>
    </main>
  );
}

