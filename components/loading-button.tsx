import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface LoadingButonProps {
    isLoading: boolean;
    children: ReactNode;
    loadingText: string
}

export function LoadingButton({ isLoading, children, loadingText }: LoadingButonProps) {
    return (
        <Button
            className="flex gap-1 items-center"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    )
}