export class TableNotFoundError extends Error {
  static errorType = 'TableNotFoundError';
  constructor(message?: string) {
    super(message);
    this.name = TableNotFoundError.errorType;
  }
}
