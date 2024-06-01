"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    title: z.string().min(2).max(250),
    file: z.instanceof(File),
})

const UploadDocumentForm = ({
    onUpload,
}: {
    onUpload: () => void;
}) => {
    const createDocument = useMutation(api.documents.createDocument);
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = await generateUploadUrl();

        const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": values.file.type },
            body: values.file,
        });

        const { storageId } = await result.json();

        await createDocument({
            title: values.title,
            fileId: storageId as Id<"_storage">,
        });
        onUpload();
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Upload a File</FormLabel>
                                <FormControl>
                                    <Input {...fieldProps}
                                        accept=".txt,.xml,.doc"
                                        type="file"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            onChange(file);
                                        }}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <LoadingButton
                        isLoading={form.formState.isSubmitting}
                        loadingText="Uploading"
                    >
                        Upload
                    </LoadingButton>
                </form>
            </Form>
        </>
    )
}

export default UploadDocumentForm