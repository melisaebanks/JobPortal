
export interface Job {
  id: number;
  categoryType: string;
  title: string;
  description: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Login{
  username: string;
  password: string;
}
