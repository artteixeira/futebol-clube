export type ServiceMessage = { message: string };

type ServiceResposneErrorType = 'invalidData' | 'notFound' | 'conflict';

export type ServiceResponseError = {
  status: ServiceResposneErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<T> = {
  status: 'successful' | 'created',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
