"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";


export default function DocumentPage({ params }: {
    params: {
        documentId: Id<"documents">;
    }
}) {
    const document = useQuery(api.documents.getDocument, {
        documentId: params.documentId,
    });

    if (!document) {
        return <div>You don't have access to view this document</div>
    }

    return (
        <main className="p-14 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document?.title}</h1>

            </div>
            <div className="flex gap-12 h-[600px]">
                <div className="flex-1 bg-gray-900 p-4 rounded">
                    {document.documentUrl &&
                        <iframe className="w-full h-full bg-gray-900" src={document.documentUrl} />
                    }
                </div>
                <div className="w-[300px] bg-gray-900"></div>
            </div>
        </main>
    );
}

