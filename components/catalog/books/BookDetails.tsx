"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { parseMaintext } from "@/lib/utils/maintext";
import { Button } from "@/components/ui/button";


export interface Book {
    bkID: number;

    Title: string | null;
    Maintext: string | null;

    Fil: number;
    Ref: number;
    Bio: number;
    Fic: number;
    Res: number;

    Copy: number;
    Inn: number;
    t_Out: number;
    t_TimesOut: number;

    images?: string | null;
    tm?: string | null;

    gc: number;
    tr: number;
    easy: number;
    circ: number;
    fr: number;
    sm: number;

    entered_by?: string | null;
    date_entered: Date;
    updated_by?: string | null;
    date_updated?: Date | null;

    schl: number;
    acquisitionmode?: string | null;
    donor?: string | null;

    branch?: string | null;
    restricted: boolean;

    filsts?: string | null;
    coding?: string | null;
}

export default function BookDetails({ book }: { book: Book | null }) {
    const formatDate = (d?: Date | null) => d ? new Date(d).toLocaleString() : "—";

    if (!book) {
        return (
            <Card className="w-full shadow-md p-4 text-muted-foreground">
                No book selected.
            </Card>
        );
    }
    const parsed = book.Maintext ? parseMaintext(book.Maintext) : null;

    const categories = [
        { key: "Fil", label: "Fil.", value: book.Fil },
        { key: "Ref", label: "Ref.", value: book.Ref },
        { key: "Bio", label: "Bio.", value: book.Bio },
        { key: "Fic", label: "Fic.", value: book.Fic },
        { key: "Res", label: "Res.", value: book.Res },
        { key: "gc", label: "GC", value: book.gc },
        { key: "tr", label: "TR", value: book.tr },
        { key: "easy", label: "Easy", value: book.easy },
        { key: "circ", label: "Circ.", value: book.circ },
        { key: "fr", label: "FR", value: book.fr },
        { key: "sm", label: "SM", value: book.sm },
    ];

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="flex items-start justify-between">
                <div>
                    <CardTitle className="text-xl font-semibold">
                        {book.Title || "Untitled Book"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Book ID: {book.bkID.toString()}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" className="text-sm  hover:underline bg-green-500">
                        Edit
                    </Button>

                    <Button 
                    variant="outline" 
                    className="text-sm text-muted-foreground hover:underline"
                    onClick={() => window.location.href = '/dashboard/catalog/books'}
                    >
                        Back
                    </Button>
                </div>
            </CardHeader>




            <CardContent className="space-y-4">

                {/* Parsed Bibliographic Metadata */}
                {parsed && (
                    <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="font-medium mb-2">Bibliographic Details</p>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div><span className="font-semibold">Title:</span> {parsed.title || "—"}</div>
                            <div><span className="font-semibold">Author:</span> {parsed.author || "—"}</div>
                            <div><span className="font-semibold">Editor:</span> {parsed.editor || "—"}</div>
                            <div><span className="font-semibold">Publisher:</span> {parsed.publisher || "—"}</div>
                            <div><span className="font-semibold">Publication Place:</span> {parsed.place || "—"}</div>
                            <div><span className="font-semibold">Year:</span> {parsed.year || "—"}</div>
                            <div><span className="font-semibold">Pages:</span> {parsed.pages || "—"}</div>
                            <div><span className="font-semibold">Illustrations:</span> {parsed.illustrations || "—"}</div>
                            <div><span className="font-semibold">Size:</span> {parsed.size || "—"}</div>
                            <div><span className="font-semibold">ISBN:</span> {parsed.isbn || "—"}</div>
                            <div><span className="font-semibold">Call Number:</span> {parsed.callNumber || "—"}</div>
                            <div><span className="font-semibold">Barcode #:</span> {parsed.accessionNumber || "—"}</div>
                            <div><span className="font-semibold">Language:</span> {parsed.language || "—"}</div>
                            <div><span className="font-semibold">Section:</span> {parsed.section || "—"}</div>
                            <div><span className="font-semibold">Accession #:</span> {parsed.controlNumber || "—"}</div>
                            <div><span className="font-semibold">Category:</span> {parsed.category || "—"}</div>
                            <div><span className="font-semibold">Resource Type:</span> {parsed.resourceType || "—"}</div>
                            <div><span className="font-semibold">Media Type:</span> {parsed.mediaType || "—"}</div>
                            <div><span className="font-semibold">Carrier Type:</span> {parsed.carrierType || "—"}</div>
                        </div>

                        {/* Subjects list */}
                        {parsed.subjects.length > 0 && (
                            <div className="mt-3">
                                <span className="font-semibold">Subjects: </span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {parsed.subjects.map((s, i) => (
                                        <Badge key={i}>{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Image */}
                {book.images && (
                    <div>
                        <p className="font-medium mb-1">Cover</p>
                        <img
                            src={`/uploads/books/${book.images}`}
                            alt="Book Cover"
                            className="max-h-64 rounded-md border"
                        />
                    </div>
                )}

                {/* Categories */}
                <div>
                    <p className="font-medium mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                        {categories
                            .filter((c) => c.value === 1)
                            .map((c) => (
                                <Badge key={c.key}>{c.label}</Badge>
                            ))}
                    </div>
                </div>

                {/* Copy & Status */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex grid-cols-2">
                        <p className="font-medium text-muted-foreground ">Copies Available :</p>
                        <p className=""> {book.Copy}</p>
                    </div>

                    <div className="flex grid-cols-2">
                        <p className="font-medium text-muted-foreground ">Inside :</p>
                        <p className=" ">{book.Inn}</p>
                    </div>

                    <div className="flex grid-cols-2">
                        <p className="font-medium text-muted-foreground">Times Borrowed :</p>
                        <p className="">{book.t_TimesOut}</p>
                    </div>

                    <div className="flex grid-cols-2">
                        <p className="font-medium text-muted-foreground">Currently Borrowed: </p>
                        <p className="">{book.t_Out}</p>
                    </div>
                </div>

                {/* Audit */}
                <div className="pt-4 border-t">
                    <p className="font-medium">Record Info</p>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                            <span className="font-semibold">Entered By:</span>{" "}
                            {book.entered_by || "—"}
                        </div>

                        <div>
                            <span className="font-semibold">Updated By:</span>{" "}
                            {book.updated_by || "—"}
                        </div>

                        <div>
                            <span className="font-semibold">Date Entered:</span>{" "}
                            {formatDate(book.date_entered)}
                        </div>

                        <div>
                            <span className="font-semibold">Date Updated:</span>{" "}
                            {formatDate(book.date_updated)}
                        </div>

                        <div>
                            <span className="font-semibold">Branch:</span>{" "}
                            {book.branch || "—"}
                        </div>

                        <div>
                            <span className="font-semibold">Donor:</span>{" "}
                            {book.donor || "—"}
                        </div>

                        <div>
                            <span className="font-semibold">Acq. Mode:</span>{" "}
                            {book.acquisitionmode || "—"}
                        </div>

                        <div>
                            <span className="font-semibold">Coding:</span>{" "}
                            {book.coding || "—"}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
