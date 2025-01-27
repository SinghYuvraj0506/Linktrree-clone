export interface User {
  id: string;
  name: string;
  email: string;
  slug: string | null;
  status: string;
  image: string | null;
  redirect_link_id: string| null
}

export interface Link {
  id: string;
  title: string;
  url: string;
  order: number;
  type: LINKTYPE;
  active: boolean;
  thumbnail?: string;
  thumbnail_layout: THUMBNAIlSLAYOUT;
  prioritize: boolean;
  animation_type: LINK_ANIMATION_TYPE;
  show_time?: string;
  hide_time?: string;
  isLocked: boolean;
  lock_type: LINK_LOCK_TYPE;
  lock_data: any
  _count:{
    analytics:number
  }
}

export interface Profile {
  id: string;
  name: string;
  image?: string;
  email: string;
  slug: string;
  links: Link[];
}
export interface Profile {
  id: string;
  name: string;
  image?: string;
  email: string;
  slug: string;
  links: Link[];
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
}

export enum LINKTYPE {
  OTHERS = "OTHERS",
  SOCIAL = "SOCIAL",
}

export enum BACKGROUNDOPTIONS {
  FLAT = "FLAT",
  GRADIENT = "GRADIENT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  POLKA = "POLKA",
  STRIPE = "STRIPE",
  WAVES = "WAVES",
  ZIGZAG = "ZIGZAG",
}

export enum BUTTONOPTIONS {
  FILL = "FILL",
  OUTLINE = "OUTLINE",
  SOFT_SHADOW = "SOFT_SHADOW",
  HARD_SHADOW = "HARD_SHADOW",
}

export enum BUTTONROUNDEDOPTIONS {
  NONE = "NONE",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum THUMBNAIlSLAYOUT {
  COMPACT = "COMPACT",
  LARGE = "LARGE",
}

export enum LINK_ANIMATION_TYPE {
  NONE = "NONE",
  BUZZ = "BUZZ",
  WOBBLE = "WOBBLE",
  POP = "POP",
  SWIPE = "SWIPE",
}

export enum LINK_LOCK_TYPE {
  NONE = "NONE",
  SUBSCRIBE = "SUBSCRIBE",
  CODE = "CODE",
  SENSITIVE = "SENSITIVE",
  DOB = "DOB",
}
