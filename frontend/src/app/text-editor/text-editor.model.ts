export class TextEditor {
    constructor(
      public fullBody: string,
      public sentence?: string,
      public description?: string,
      public _id?: number,
      public updatedAt?: Date,
      public createdAt?: Date,
      public lastUpdatedBy?: string,
    ) { }
  }