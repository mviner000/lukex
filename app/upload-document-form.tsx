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

const formSchema = z.object({
    title: z.string().min(2).max(250),
})

const UploadDocumentForm = ({
    onUpload,
}: {
    onUpload: () => void;
}) => {
    const createDocument = useMutation(api.documents.createDocument);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await createDocument(values);
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
                                <FormLabel>Document</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
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