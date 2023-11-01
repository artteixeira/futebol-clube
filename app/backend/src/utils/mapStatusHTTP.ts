type HttpStatus = {
  [key: string]: number;
};

export default function mapStatusHTTP(status: string): number {
  const httpStatus: HttpStatus = {
    invalidData: 400,
    notFound: 404,
    conflict: 409,
    successful: 200,
    created: 201,
  };

  return httpStatus[status] || 500;
}
