export enum MessageCode {
  // Success messages
  SUCCESS = 'SUCCESS',
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',

  // Authentication related messages
  USERNAME_OR_EMAIL_EXISTS = 'USERNAME_OR_EMAIL_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Validation messages
  INVALID_INPUT = 'INVALID_INPUT',
  REQUIRED_FIELD = 'REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Resource status messages
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  FORBIDDEN = 'FORBIDDEN',

  // Server related messages
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  BAD_REQUEST = 'BAD_REQUEST',
  QUERY_ERROR = 'QUERY_ERROR',
}

export const MessageCodeDescription = {
  [MessageCode.SUCCESS]: 'Operation completed successfully',
  [MessageCode.CREATED]: 'Resource created successfully',
  [MessageCode.UPDATED]: 'Resource updated successfully',
  [MessageCode.DELETED]: 'Resource deleted successfully',

  [MessageCode.USERNAME_OR_EMAIL_EXISTS]: 'Username or email already exists',
  [MessageCode.INVALID_CREDENTIALS]: 'Invalid username or password',
  [MessageCode.UNAUTHORIZED]: 'Unauthorized access',
  [MessageCode.TOKEN_EXPIRED]: 'Authentication token has expired',
  [MessageCode.INVALID_TOKEN]: 'Invalid authentication token',

  [MessageCode.INVALID_INPUT]: 'Invalid input provided',
  [MessageCode.REQUIRED_FIELD]: 'Required field is missing',
  [MessageCode.INVALID_FORMAT]: 'Invalid format',

  [MessageCode.NOT_FOUND]: 'Resource not found',
  [MessageCode.ALREADY_EXISTS]: 'Resource already exists',
  [MessageCode.FORBIDDEN]: 'Access forbidden',

  [MessageCode.INTERNAL_SERVER_ERROR]: 'Internal server error occurred',
  [MessageCode.SERVICE_UNAVAILABLE]: 'Service is currently unavailable',
  [MessageCode.BAD_REQUEST]: 'Bad request',
};
