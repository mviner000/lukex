"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";
import Loader from "@/components/Loader"

export function Room({ children }: { children: ReactNode }) {
    return (
        <RoomProvider id="my-room"
            initialPresence={(roomId) => ({
                message: '',
                cursor: null,
                color: '',
                username: '',
            })}
            initialStorage={{
                canvasObjects: new LiveMap()
            }}
        >
            <ClientSideSuspense fallback={<Loader />}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider >
    );
}