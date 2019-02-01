export interface IBookmark {
  url: string;
  category: string;
  destroy: () => Promise<any>;
}

export interface IUserInstance {
  username: string;
  email: string;
  password: string;
}
