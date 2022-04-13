
export type iUser = {
  username: string;
  email: string;
  password: string;
  _id: number;
  imgURI:string
};

export type iPost = {
  _id?: number
  desc: string
  imgURI?: string
  createdAt: string
  updatedAt?: string
  userId: number
  like?: number
  comment?: number
};
 