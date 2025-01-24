export interface User {
  id: string;
  name: string;
  email: string;
  slug: string | null;
  status: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  order: number;
  type: LINKTYPE;
  active: boolean;
}
export interface Profile {
  id: string
  name: string;
  image?: string;
  email: string;
  slug: string;
  links: Link[]
}

export enum LINKTYPE {
  OTHERS = "OTHERS",
  SOCIAL = "SOCIAL",
}
