import React, { useMemo } from "react";
import { Avatar } from "@/components/users/Avatar";

import styles from "./index.module.css";
import { useOthers, useSelf } from "@/liveblocks.config";
import { generateRandomName } from "@/lib/utils";

const ActiveUsers = () => {

    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > 3;

    const memoizedUsers = useMemo(() => {
        return (
            <div className="py-2 flex items-center justify-center gap-1">
                <div className="flex pl-3">
                    {currentUser && (
                        <div className="relative ml-8 first:ml-0">
                            <Avatar name="You" otherStyles="border-[3px] border-primary-green" />
                        </div>
                    )}

                    {users.slice(0, 3).map(({ connectionId, info }) => {
                        return (
                            <Avatar key={connectionId} name={generateRandomName()} otherStyles="-ml-3" />
                        );
                    })}

                    {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}


                </div>
            </div>
        )
    }, [users.length])

    return memoizedUsers;

}

export default ActiveUsers