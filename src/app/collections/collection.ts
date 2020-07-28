import { Note } from '../note';

export interface Collection {
    id: number;
    name: string;
    notes: Note[];
}
