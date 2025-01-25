export interface User {
  id: string;
  name: string;
  email: string;
  slug: string | null;
  status: string;
  image: string | null
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
export interface Profile {
  id: string
  name: string;
  image?: string;
  email: string;
  slug: string;
  links: Link[]
}
export interface AnalyticsData {
  slugStats: {
    city: string | null;
    country: string | null;
    ip: string;
    ll: number[];
    region: string | null;
    timezone: string | null;
  }[];
  linksStats: {
    _count: {
      id: number;
    };
    linkId: string;
  }[];
};

export enum LINKTYPE {
  OTHERS = "OTHERS",
  SOCIAL = "SOCIAL",
}

export enum BACKGROUNDOPTIONS {
  FLAT = "FLAT",
  GRADIENT = "GRADIENT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  POLKA = "POLKA" ,
  STRIPE = "STRIPE",
  WAVES = "WAVES",
  ZIGZAG = "ZIGZAG"
}

export enum BUTTONOPTIONS {
  FILL = "FILL",
  OUTLINE = "OUTLINE",
  SOFT_SHADOW = "SOFT_SHADOW",
  HARD_SHADOW = "HARD_SHADOW"
}

export enum BUTTONROUNDEDOPTIONS {
  NO = "NO",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}