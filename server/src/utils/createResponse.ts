/* eslint-disable @typescript-eslint/no-explicit-any */
export const createResponse = (
  success: boolean,
  message: string,
  data: any = null,
  error: any = null,
) => {
  return { success, message, data, error };
};