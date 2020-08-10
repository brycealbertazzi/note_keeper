import { Note } from '../note.model';

export interface Collection {
    id: number;
    name: string;
    notes: Note[];
}
