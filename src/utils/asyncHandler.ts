const AsyncHandler = {
  sendObjectResponse(message: string, data?: any): { success: boolean; message: string; data?: any } {
    return {
      success: true,
      message,
      data,
    };
  },

  catchErrors(fn: any) {
    return (req: any, res: any, next: any) => {
      fn(req, res, next).catch((err: { status?: number; message?: string; data?: any }) => {
        console.log({ err });
        const { status = 500, message = 'Internal Server Error', data = null } = err;
        res.status(status).json({ success: false, error: message, data });
      });
    };
  },
};

export default AsyncHandler;
