import { useCallback, useEffect, useState } from "react";
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "@/liveblocks.config"
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import LiveCursors from "@/components/cursor/LiveCursors"
import CursorChat from "@/components/cursor/CursorChat";
import ReactionSelector from "@/components/reaction/ReactionButton";
import FlyingReaction from "@/components/reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";

const Live = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    })

    const [reaction, setReaction] = useState<Reaction[]>([]);

    const broadcast = useBroadcastEvent();

    useInterval(() => {
        setReaction((reaction) => reaction.filter((reaction) => reaction.timestamp > Date.now() - 4000));
    }, 1000);

    useInterval(() => {
        if (cursorState.mode === CursorMode.Reaction &&
            cursorState.isPressed && cursor) {
            setReaction((reactions) => reactions.concat([
                {
                    point: { x: cursor.x, y: cursor.y },
                    value: cursorState.reaction,
                    timestamp: Date.now(),
                }
            ]));

            broadcast({
                x: cursor.x,
                y: cursor.y,
                value: cursorState.reaction,
            })
        }
    }, 100);

    useEventListener((eventData) => {
        const event = eventData.event as ReactionEvent;
        setReaction((reactions) =>
            reactions.concat([
                {
                    point: { x: event.x, y: event.y },
                    value: event.value,
                    timestamp: Date.now(),
                },
            ])
        );
    });

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();

        if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
            const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
            const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
            updateMyPresence({ cursor: { x, y } });
        }
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })

        updateMyPresence({ cursor: null, message: null });
    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });

        setCursorState((state: CursorState) =>
            state.mode === CursorMode.Reaction ?
                { ...state, isPressed: true } :
                state);
    }, [cursorState.mode, setCursorState]);

    const handlePointerUp = useCallback((event: React.PointerEvent) => {
        setCursorState((state: CursorState) =>
            state.mode === CursorMode.Reaction ?
                { ...state, isPressed: true } :
                state);
    }, [cursorState.mode, setCursorState]);


    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === "/") {
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: '',
                })
            } else if (e.key === 'Escape') {
                setCursorState({
                    mode: CursorMode.Hidden,
                })
            } else if (e.key === 'e') {
                setCursorState({
                    mode: CursorMode.ReactionSelector,
                })
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/") {
                e.preventDefault();
            }
        }

        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.addEventListener('keyup', onKeyUp);
            window.addEventListener('keydown', onKeyDown);
        }

    }, [updateMyPresence]);

    const setReactions = useCallback((reaction: string) => {
        setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false })
    }, [])

    return (
        <div
            className="border-2 border-emerald-500 h-[100vh] w-full flex justify-center items-center text-center"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <h1 className="text-2xl text-white">Etiquette</h1>

            {reaction.map((r) => (
                <FlyingReaction
                    key={r.timestamp.toString()}
                    x={r.point.x}
                    y={r.point.y}
                    timestamp={r.timestamp}
                    value={r.value}
                />
            ))}

            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}

            {cursorState.mode === CursorMode.ReactionSelector && (
                <ReactionSelector
                    setReaction={setReactions}
                />
            )}

            <LiveCursors others={others} />
        </div>
    )
}

export default Live