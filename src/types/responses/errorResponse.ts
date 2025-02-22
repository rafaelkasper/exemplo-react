export interface ErrorResponse {
  message: string;
  errors: FieldErrorResponse[];
}

export interface FieldErrorResponse {
  code?: string;
  field: string;
  message: string;
}
