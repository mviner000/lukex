"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadDocumentForm from './upload-document-form';
import { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadDocumentButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-1'>
                    <Upload className='size-4' /> Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a Document</DialogTitle>
                    <DialogDescription>
                        Upload a team document for you to search over in the future.
                        <UploadDocumentForm onUpload={() => setIsOpen(false)} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default UploadDocumentButton