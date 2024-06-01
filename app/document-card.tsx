import { Doc } from "@/convex/_generated/dataModel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { document } from "postcss"
import Link from "next/link"


const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{document.title}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    {document.fileId}
                    {/* <Image src={document.fileId} alt="try" height={50} width={50} /> */}
                </CardContent>
                <CardFooter>
                    <Button asChild variant="secondary">
                        <Link href={`/documents/${document._id}`}>
                            View
                        </Link>
                    </Button>
                </CardFooter>
            </Card></div>
    )
}

export default DocumentCard