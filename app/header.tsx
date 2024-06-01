import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";

export function Header() {
    return (
        <header className="flex justify-between text-white py-4 md:pl-16 pl-5 pr-8 w-full z-10 border-b border-neutral-400 bg-gray-800">
            <div className="flex items-center gap-4">
                <Image
                    className="rounded-full"
                    src="/logo.png"
                    width={40}
                    height={40}
                    alt="lukex" />
                Etiquette Luxe
            </div>
            <div className="flex gap-4 items-center">
                <ModeToggle />
                <HeaderActions />
            </div>
        </header>
    )
}
