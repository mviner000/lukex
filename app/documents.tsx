"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";




export default function DocumentPageExport() {
    const documents = useQuery(api.documents.getDocuments);

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">My Documents</h1>
                <CreateDocumentButton />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {documents?.map((doc) => (
                    <DocumentCard key={doc._id} document={doc} />
                ))}
            </div>
        </>
    );
}

