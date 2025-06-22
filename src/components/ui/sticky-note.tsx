import { PlusIcon, X } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef, FC, ChangeEvent, DragEvent, memo } from 'react';
import { Button } from './button';

// Define a unique prefix for localStorage keys to avoid conflicts
const LOCAL_STORAGE_KEY_PREFIX = 'custom_sticky_notes_app_';

// Helper to generate unique IDs
const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

// Define a list of beautiful gradient Tailwind classes
const gradientClasses = [
    'bg-gradient-to-br from-purple-400 to-pink-500',
    'bg-gradient-to-br from-blue-400 to-green-500',
    'bg-gradient-to-br from-yellow-300 to-orange-400',
    'bg-gradient-to-br from-red-400 to-purple-500',
    'bg-gradient-to-br from-teal-400 to-blue-500',
    'bg-gradient-to-br from-indigo-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-red-500',
    'bg-gradient-to-br from-green-300 to-blue-400',
    'bg-gradient-to-br from-orange-300 to-red-400',
    'bg-gradient-to-br from-sky-400 to-indigo-500'
];

// Helper to pick a random gradient class
const getRandomGradient = (): string => {
    const randomIndex = Math.floor(Math.random() * gradientClasses.length);
    return gradientClasses[randomIndex];
};

interface Note {
    id: string;
    content: string;
    gradientClass: string;
}

// Define the props for the StickyNote component
interface StickyNoteProps {
    id: string;
    content: string;
    gradientClass: string; // Added gradientClass to props
    onContentChange: (id: string, newContent: string) => void;
    onDelete: (id: string) => void;
    onDragStart: (id: string) => void;
    onDragOver: (id: string) => void;
    onDrop: (draggedId: string, droppedOnId: string) => void;
    onDragEnd: () => void;
    isDragging: boolean;
    isDragOver: boolean;
}

// StickyNote Component can pass  gradientClass
const StickyNote: FC<StickyNoteProps> = ({ id, content, onContentChange, onDelete, onDragStart, onDragOver, onDrop, onDragEnd, isDragging, isDragOver }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [noteContent, setNoteContent] = useState<string>(content);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update internal state when external content prop changes (e.g., from localStorage load)
    useEffect(() => {
        setNoteContent(content);
    }, [content]);

    // Auto-focus textarea when editing starts
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            // Move cursor to the end
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, [isEditing]);

    const handleDoubleClick = (): void => {
        setIsEditing(true);
    };

    const handleBlur = (): void => {
        setIsEditing(false);
        onContentChange(id, noteContent);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setNoteContent(e.target.value);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>): void => {
        // Set data to be transferred (note ID)
        e.dataTransfer.setData('text/plain', id);
        onDragStart(id);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault(); // Necessary to allow dropping
        onDragOver(id);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        onDrop(draggedId, id);
    };

    const handleDragEnd = (): void => {
        onDragEnd();
    };

    return (
        <div
            // Apply the random gradient class here instead of bg-yellow-200  ${gradientClass}
            className={`relative p-4 rounded-lg bg-yellow-500 shadow-md flex flex-col min-h-[150px] max-h-[400px] min-w-[240px] max-w-[320px] flex-shrink-0 overflow-hidden group cursor-grab active:cursor-grabbing

                       ${isDragging ? 'opacity-50 border-2 border-blue-500' : ''}
                       ${isDragOver && !isDragging ? 'border-2 border-blue-500' : ''}`}
            draggable="true" // Make the note draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
        >
            <button
                onClick={() => onDelete(id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Delete note"
            >
                <X className='w-3 h-3' />
            </button>
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    // Adjusted text color for better contrast on gradients
                    className="flex-grow w-full font-[family-name:var(--font-excali)] h-full bg-transparent resize-none focus:outline-none overflow-auto font-inter text-white placeholder-white/80"
                    value={noteContent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }} // Add subtle text shadow for readability
                />
            ) : (
                <div
                    // Adjusted text color for better contrast on gradients
                    className="flex-grow text-black font-[family-name:var(--font-excali)] w-full h-full cursor-pointer overflow-auto font-inter break-words whitespace-pre-wrap"
                    onDoubleClick={handleDoubleClick}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }} // Add subtle text shadow for readability
                >
                    {noteContent}
                </div>
            )}
            <div className="absolute bottom-2 left-2 text-xs text-white/70 opacity-75 font-inter">
                Double click to edit
            </div>
        </div>
    );
};

const StickyNotesGrid: FC = () => {
    // State to store notes (content and order)
    const [notes, setNotes] = useState<Note[]>(() => {
        try {
            const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'notes');
            // When loading, ensure older notes without gradientClass get a default
            const parsedNotes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
            return parsedNotes.map(note => ({
                ...note,
                gradientClass: note.gradientClass || getRandomGradient() // Assign if missing
            }));
        } catch (error) {
            console.error("Error loading notes from localStorage:", error);
            return [];
        }
    });

    // State to manage drag and drop operations
    const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
    const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

    // Effect to save notes to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'notes', JSON.stringify(notes));
        } catch (error) {
            console.error("Error saving notes to localStorage:", error);
        }
    }, [notes]);

    // Function to add a new sticky note
    const addNote = useCallback((): void => {
        const newId = generateId();
        const newNote: Note = {
            id: newId,
            content: 'New sticky note',
            gradientClass: getRandomGradient() // Assign a random gradient on creation
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    }, []);

    // Function to delete a sticky note
    const deleteNote = useCallback((idToDelete: string): void => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== idToDelete));
    }, []);

    // Function to update content of a sticky note
    const updateNoteContent = useCallback((id: string, newContent: string): void => {
        setNotes((prevNotes) =>
            prevNotes.map(note =>
                note.id === id ? { ...note, content: newContent } : note
            )
        );
    }, []);

    // Drag and Drop handlers
    const handleDragStart = useCallback((id: string): void => {
        setDraggedItemId(id);
    }, []);

    const handleDragOver = useCallback((id: string): void => {
        setDragOverItemId(id);
    }, []);

    const handleDrop = useCallback((draggedId: string, droppedOnId: string): void => {
        // Find the index of the dragged item and the dropped-on item
        const draggedIndex = notes.findIndex(note => note.id === draggedId);
        const droppedOnIndex = notes.findIndex(note => note.id === droppedOnId);

        if (draggedIndex === -1 || droppedOnIndex === -1 || draggedIndex === droppedOnIndex) {
            return; // Invalid drag/drop
        }

        // Create a new array to reorder notes
        const newNotes = [...notes];
        const [draggedNote] = newNotes.splice(draggedIndex, 1); // Remove dragged note
        newNotes.splice(droppedOnIndex, 0, draggedNote); // Insert it at the new position

        setNotes(newNotes);
        setDraggedItemId(null);
        setDragOverItemId(null);
    }, [notes]);

    const handleDragEnd = useCallback((): void => {
        setDraggedItemId(null);
        setDragOverItemId(null);
    }, []);

    return (
        <div className="font-inter w-full">
            <div className="flex justify-start mb-3 w-fit items-center gap-5">
                <h1>Sticky Notes</h1>
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    className='text-xs  '
                    onClick={addNote}
                >
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </div>
            <div className="max-w-full mx-auto overflow-hidden">
                <div
                    className="flex flex-row items-start overflow-x-auto gap-4 "
                    onDragOver={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); }}
                    onDrop={(e: DragEvent<HTMLDivElement>) => {
                        e.preventDefault();
                        if (!dragOverItemId && draggedItemId) {
                            const draggedIndex = notes.findIndex(note => note.id === draggedItemId);
                            if (draggedIndex !== -1) {
                                const newNotes = [...notes];
                                const [draggedNote] = newNotes.splice(draggedIndex, 1);
                                newNotes.push(draggedNote);
                                setNotes(newNotes);
                            }
                        }
                        setDraggedItemId(null);
                        setDragOverItemId(null);
                    }}
                >
                    {notes.length === 0 && (
                        <p className="text-gray-500 text-center mt-20 w-full">
                            {"No notes yet! Click Add New Note to get started."}
                        </p>
                    )}
                    {notes.map((note: Note) => (
                        <StickyNote
                            key={note.id}
                            id={note.id}
                            content={note.content}
                            gradientClass={note.gradientClass} // Pass the gradient class to the StickyNote
                            onContentChange={updateNoteContent}
                            onDelete={deleteNote}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                            isDragging={draggedItemId === note.id}
                            isDragOver={dragOverItemId === note.id}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default memo(StickyNotesGrid);
