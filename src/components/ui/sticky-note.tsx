"use client";

import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "./separator";
import { X } from "lucide-react";

const GRID_SIZE = 150;
const GRID_PADDING = 10;
const DEFAULT_COLORS = ["#FFD700", "#FF5733", "#33FF57", "#337BFF", "#FF33C4"];

const NOTE_SIZES = {
    small: { width: 160, height: 160 },
    medium: { width: 200, height: 200 },
    large: { width: 220, height: 220 },
} as const;

const TEXT_SIZE_CLASSES = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-md",
}

type NoteSize = keyof typeof NOTE_SIZES;
type TextSize = keyof typeof TEXT_SIZE_CLASSES;

interface Note {
    id: string;
    content: string;
    x: number;
    y: number;
    color: string;
    size: NoteSize;
    text_size: TextSize;
    layout: "none" | "TimeOnly" | "Both";
    time?: string;
}

interface StickyNotesGridProps {
    limit?: number;
}

export default function StickyNotesGrid({ limit = 4 }: StickyNotesGridProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [counter, setCounter] = useState(0);
    const [hoveredGrid, setHoveredGrid] = useState<{ x: number; y: number } | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const draggedNoteRef = useRef<string | null>(null);

    const getNextPosition = (): { x: number; y: number } => {
        let x = 0;
        let y = 0;

        while (notes.some((note) => note.x === x && note.y === y)) {
            x += GRID_SIZE + GRID_PADDING;
            if (x + GRID_SIZE > window.innerWidth - 50) {
                x = 0;
                y += GRID_SIZE + GRID_PADDING;
            }
        }

        return { x, y };
    };

    const addNote = () => {
        if (notes.length >= limit) return;
        const { x, y } = getNextPosition();

        const newNote: Note = {
            id: `note-${counter}`,
            content: "New Note",
            x,
            y,
            color: DEFAULT_COLORS[counter % DEFAULT_COLORS.length],
            size: "small",
            text_size: "small",
            layout: "none",
        };

        setNotes([...notes, newNote]);
        setCounter(counter + 1);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, noteId: string) => {
        draggedNoteRef.current = noteId;
        e.dataTransfer.setData("text/plain", noteId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const gridRect = gridRef.current?.getBoundingClientRect();
        if (!gridRect) return;

        const gridX = Math.floor((e.clientX - gridRect.left) / GRID_SIZE) * GRID_SIZE;
        const gridY = Math.floor((e.clientY - gridRect.top) / GRID_SIZE) * GRID_SIZE;

        setHoveredGrid({ x: gridX, y: gridY });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggedNoteRef.current || !hoveredGrid) return;

        const draggedId = draggedNoteRef.current;
        const draggedNote = notes.find((note) => note.id === draggedId);
        if (!draggedNote) return;

        let { x, y } = hoveredGrid;

        // If the dragged note is already at the target grid position, do nothing
        if (draggedNote.x === x && draggedNote.y === y) {
            setHoveredGrid(null);
            draggedNoteRef.current = null;
            return;
        }

        // Find the next available cell to avoid overlap
        while (notes.some((note) => note.id !== draggedId && note.x === x && note.y === y)) {
            x += GRID_SIZE + GRID_PADDING;
            if (x + GRID_SIZE > (gridRef.current?.offsetWidth ?? window.innerWidth)) {
                x = 0;
                y += GRID_SIZE + GRID_PADDING;
            }
        }

        // Only update if position actually changed
        if (draggedNote.x !== x || draggedNote.y !== y) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === draggedId ? { ...note, x, y } : note
                )
            );
        }

        setHoveredGrid(null);
        draggedNoteRef.current = null;
    };

    const updateNoteSize = (id: string, size: NoteSize) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, size } : note
            )
        );
    };


    const updateTextSize = (id: string, text_size: NoteSize) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, text_size } : note
            )
        );
    };

    const deleteNote = (noteId: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    return (
        <>
            <Button
                onClick={addNote}
                size={"sm"}
                disabled={notes.length >= limit}
                className="py-2 px-2 text-xs rounded-lg shadow-md mb-4"
            >
                Add Note +
            </Button>

            <div
                ref={gridRef}
                className="p-4 h-full w-min gap-4 relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {hoveredGrid && (
                    <div
                        style={{
                            position: "absolute",
                            left: hoveredGrid.x,
                            top: hoveredGrid.y,
                            width: GRID_SIZE,
                            height: GRID_SIZE,
                            borderRadius: "8px",
                            border: "2px dashed rgba(255, 215, 0, 0.7)",
                            background: "rgba(255, 215, 0, 0.2)",
                        }}
                        className="transition-all duration-200"
                    />
                )}

                {notes.map((note) => {
                    const { width, height } = NOTE_SIZES[note.size];

                    return (
                        <div
                            key={note.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, note.id)}
                            style={{
                                position: "absolute",
                                left: note.x,
                                top: note.y,
                                width,
                                height,
                                backgroundColor: note.color,
                            }}

                            className="p-2 rounded-lg shadow-md flex flex-col cursor-move transition-all"
                        >
                            <div className="flex justify-end right-0 w-full items-center">
                                <Popover>
                                    <PopoverTrigger className="hover:bg-none" asChild>
                                        <Button size="sm" variant="link" className="p-1 h-6 hover:bg-none w-6 text-black">
                                            ⋮
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 p-2">
                                        <div className="mb-2">
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">Note Size</p>
                                            {(["small", "medium", "large"] as NoteSize[]).map((sizeOption) => (
                                                <Button
                                                    key={sizeOption}
                                                    onClick={() => updateNoteSize(note.id, sizeOption)}
                                                    variant="ghost"
                                                    className="w-full justify-start text-xs capitalize"
                                                >
                                                    {sizeOption}
                                                </Button>
                                            ))}
                                        </div>
                                        <Separator className="my-2" />
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">Text Size</p>
                                            {(["small", "medium", "large"] as TextSize[]).map((textOption) => (
                                                <Button
                                                    key={textOption}
                                                    onClick={() => updateTextSize(note.id, textOption)}
                                                    variant="ghost"
                                                    className="w-full justify-start text-xs capitalize"
                                                >
                                                    {textOption}
                                                </Button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <X className="text-black hover:bg-none w-4 h-4 cursor-pointer" onClick={() => deleteNote(note.id)} />
                            </div>

                            <textarea
                                value={note.content}
                                onChange={(e) =>
                                    setNotes((prev) =>
                                        prev.map((n) =>
                                            n.id === note.id ? { ...n, content: e.target.value } : n
                                        )
                                    )
                                }
                                className={`flex-grow bg-transparent font-[family-name:var(--font-excali)] border-none resize-none focus:outline-none text-black ${TEXT_SIZE_CLASSES[note.text_size]}`}
                            />

                            {note.time && (note.layout === "TimeOnly" || note.layout === "Both") && (
                                <div className="text-black text-xs text-right">{note.time}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
