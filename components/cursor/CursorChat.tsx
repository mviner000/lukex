import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'


const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence
}: CursorChatProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateMyPresence({ message: e.target.value });
        setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: e.target.value,
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setCursorState({
                mode: CursorMode.Chat,
                previousMessage: cursorState.message,
                message: '',
            })
        } else if (e.key === 'Escape') {
            setCursorState({
                mode: CursorMode.Hidden,
            })
        }
    }


    return (
        <div className="absolute top-0 left-0"
            style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}
            onKeyUp={(e) => e.stopPropagation()}
        >
            {cursorState.mode === CursorMode.Chat && (
                <>
                    <CursorSVG color="#000" />

                    <div className=' absolute left-2 top-5 bg-blue-500
            px-4 py-2 text-sm leading-relaxed text-white dark:text-black rounded-[20px]
            '>
                        {cursorState.previousMessage && (
                            <div>{cursorState.previousMessage}</div>
                        )}
                        <input
                            value={cursorState.message}
                            maxLength={50}
                            placeholder={cursorState.previousMessage ? '' : 'Type a message...'}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus={true}
                            className='z-10 w-60 border-nonoe bg-transparent text-white  placeholder-blue-300 outline-none' type="text" />
                    </div>
                </>
            )}
        </div>
    )
}

export default CursorChat