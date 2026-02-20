export interface IFetch {
  status: number;
  success: boolean;
  message: string;
}

export interface IFetchData<T> extends IFetch {
  data: T;
}

export interface Paginate<T> extends IFetch {
  data: {
    data: T[];
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
  };
}
