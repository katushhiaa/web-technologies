export interface Identifiable {
  id: string;
}

export interface IBook extends Identifiable {
  title: string;
  author: string;
  year: number;
  borrowedBy?: string;
}

export interface IUser extends Identifiable {
  name: string;
  email: string;
  borrowedCount: number;
}

export class Book implements IBook {
  constructor(
    private _id: string,
    private _title: string,
    private _author: string,
    private _year: number,
    private _borrowedBy?: string
  ) {}

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get author(): string {
    return this._author;
  }
  get year(): number {
    return this._year;
  }
  get borrowedBy(): string | undefined {
    return this._borrowedBy;
  }
  get isBorrowed(): boolean {
    return !!this._borrowedBy;
  }

  /* mutators (керовано міняємо стан)*/
  markBorrowedBy(userId: string): void {
    this._borrowedBy = userId;
  }
  markReturned(): void {
    this._borrowedBy = undefined;
  }

  //localStorage
  toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      borrowedBy: this._borrowedBy,
    };
  }

  static from(data: IBook): Book {
    return new Book(data.id, data.title, data.author, data.year, data.borrowedBy);
  }
}

export class User implements IUser {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _borrowedCount: number = 0
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get borrowedCount(): number {
    return this._borrowedCount;
  }

  incrementBorrowed(): void {
    this._borrowedCount += 1;
  }
  decrementBorrowed(): void {
    this._borrowedCount = Math.max(0, this._borrowedCount - 1);
  }

  toJSON(): IUser {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      borrowedCount: this._borrowedCount,
    };
  }

  static from(data: IUser): User {
    return new User(data.id, data.name, data.email, data.borrowedCount);
  }
}
