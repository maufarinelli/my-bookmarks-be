export interface IBookmark {
  url: string;
  category: string;
  destroy: () => Promise<void>;
  dataValues: {
    url: string;
    category: string;
  }
}

export interface IUserInstance {
  username: string;
  email: string;
  password: string;
}
