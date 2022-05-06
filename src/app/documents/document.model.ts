import * as internal from 'stream';

export class Document {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public url: string,
    public children: Document[]
  ) {}
}
