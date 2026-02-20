import { IFetchData, Paginate } from "./common";

export interface IUser {
  _id: string;
  name: string;
  display_name: string;
  avatar: string;
  role: string;
  ghost: boolean;
  bio: string;
  verified: boolean;
  email: string;
  status: "active" | "inactive" | "deleted";
  vibes: number;
  audio: number;
  podcast: number;
  following: number;
  followers: number;
  views: number;
  clicks: number;
  is_friend?: boolean;
  subscription?: Subscriptions;
  plan?: IPlans;
  last_post_mode: {
    _id: string;
    icon: string;
    name: string;
  };
}

export interface Subscriptions {
  _id: string;
  user: string;
  plan: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  current_period_start: string;
  current_period_end: string;
  subscription_status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMedia {
  _id: string;
  file_type: string;
  url: string;
  is_favorite: boolean;
  duration?: number;
}

export type IUserFetch = IFetchData<IUser>;

export interface IPost {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
    display_name: string;
    ghost: string;
    verified: string;
  };
  is_followed: boolean;
  post_type: "audio" | "vibes" | "podcast";
  privacy: "public" | "private_circle" | "solo";
  private_circle: [];
  captions: string;
  location: {
    address: string;
    type: "Point";
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
  id: string;
  mood: {
    _id: string;
    name: string;
    color: string;
    icon: string;
  };
  music_station: boolean;
  is_verified: boolean;
  image: IMedia[];
  audio: IMedia[];
  podcast: IMedia[];
  likes: number;
  is_liked: false;
  is_favorite: false;
}

export interface IMoods {
  _id: string;
  createdAt: string;
  icon: string;
  user: string;
  name: string;
  updatedAt: string;
}

export interface IFriends {
  _id: string;
  name: string;
  display_name: string;
  role: string;
  ghost: boolean;
  bio: string;
  avatar: string;
  verified: boolean;
  email: string;
  status: string;
}

export enum EPlanLevel {
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

export interface IPlans {
  _id: string;
  name: string;
  slug: string;
  price: string;
  currency: string;
  interval: string;
  features: string[];
  level: EPlanLevel;
  color: string;
  stripe_product_id: string;
  stripe_price_id: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  current_plan: boolean;
}

interface IStatistics {
  price: string;
  plan_level: string;
  plan_name: string;
  plan_interval: string;
  plan_color: string;
  is_active: boolean;
  start_date: number;
  end_date: number;
  total_click: number;
  total_views: number;
  total_followers: number;
  durations: number;
  remaining_days: number;
  days_progress: number;
}

export interface IComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  edited: boolean;
  post: string;
  parent_comment: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  replies: IComment[];
}

export type ICommentFetch = Paginate<IComment>;

export type ISinglePost = IFetchData<IPost>;
export type IFriendsFetch = IFetchData<IFriends[]>;

export type IStatisticsFetch = IFetchData<IStatistics>;

export type IPostFetch = Paginate<IPost>;

export type IPlansFetch = IFetchData<IPlans[]>;

export type IMoodsFetch = IFetchData<IMoods[]>;

export interface IPrivateCircleUser {
  _id: string;
  name: string;
  display_name: string;
  avatar: string;
  email: string;
  already_added: boolean;
}

export type IPrivateCircleUserFetch = IFetchData<IPrivateCircleUser[]>;
