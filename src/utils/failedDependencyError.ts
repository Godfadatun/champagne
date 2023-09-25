/* eslint-disable lines-between-class-members */
export default class FailedDependencyError extends Error {
  status: number;
  data: any;

  constructor(message: string, data: any = null) {
    super(message);
    this.name = 'FailedDependencyError';
    this.message = message;
    this.status = 424;
    this.data = data;
  }
}
