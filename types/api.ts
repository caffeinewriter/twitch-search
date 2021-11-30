export interface BeforeCursor {
  before: string;
}

export interface AfterCursor {
  after: string;
}

export type PaginationCursor = BeforeCursor | AfterCursor;
