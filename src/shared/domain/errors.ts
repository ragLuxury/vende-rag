export class AppError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.name = new.target.name;
  }
}

export class HttpError extends AppError {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown,
  ) {
    super(message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(body?: unknown) {
    super(401, 'Unauthorized', body);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
