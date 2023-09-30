//  All the interface go here

export interface NoteModel {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteSubmitType {
  title: string;
  description?: string;
}
