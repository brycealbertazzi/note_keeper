import { Note } from '../note.model';

export interface Collection {
    id: string;
    name: string;
    notes: Note[];
}
