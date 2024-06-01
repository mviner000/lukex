"use client";

import { AuthLoading, Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

export function HeaderActions() {
    return (
        <>
            <Unauthenticated>
                <SignInButton />
            </Unauthenticated>
            <Authenticated>
                <UserButton />
            </Authenticated>
            <AuthLoading>Loading...</AuthLoading>
        </>
    )
}