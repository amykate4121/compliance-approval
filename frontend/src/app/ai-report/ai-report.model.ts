// information used to create ai report, saved to/from db
export class AiReport {
  constructor(
    public fullBody: string,
    public sentence?: string,
    public description?: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string
  ) {}
}
