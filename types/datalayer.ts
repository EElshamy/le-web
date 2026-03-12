export type Event =
  | "add_to_cart"
  | "view_cart"
  | "view_item"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase";

export interface EcommerceItems {
  /**
   * course id
   */
  item_id: string;

  /**
   * course name
   */
  item_name: string;

  /**
   * course discount e.g. discount value -> priceAfterDiscount - originalPrice
   */
  discount: number;

  /**
   * category name
   */
  item_category: string;

  /**
   * learning program type
   */
  type: "COURSE" | "PROGRAM" | "LIVE" | "PATH";

  /**
   * certifications the user will get after the learning program
   */
  certifications: string[];

  /**
   * case1: priceAfterDiscount !== null -> priceAfterDiscount
   * case2: priceAfterDiscount === null -> originalPrice
   */
  price: number;

  /**
   * !!
   */
  quantity: number;

  /**
   * language
   */
  language: string;

  /**
   * courses and programs inside a path
   */
  programs: EcommerceItems[] | null;

  /**
   * duration
   */
  course_duration_hours: number;

  /**
   * level
   */
  difficulty_level: string;

  /**
   * number of lessons
   */
  number_of_lessons: number;

  /**
   * instructors names e.g. ['Adham Saleh', 'Omar Elsayed']
   */
  instructors: string[];
}

export interface Ecommerce {
  /**
   * currency e.g. USD / EGP
   */
  currency: string;

  /**
   * the total value of all viewed items,
   * E.G. Add to cart: the price of the item
   * E.G. View cart: the total price of all items in the cart
   */
  value: number;

  /**
   * array includes all the item(s) the user is seeing
   * E.G. View course: single program page
   * E.G. View cart: all cart items
   */
  items: any;

  /**
   * learning program type
   */
  course_type: "PATH" | null;

  /**
   * path id in case of paths
   */
  path_id: string;

  /**
   * path name in case of paths
   */
  path_name: string;

  /**
   * discount value in case of path
   */
  discount: number | null;

  /**
   * coupon code
   */
  couponCode: string | null;
}

export interface User {
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
  country: string;
}

export interface DataLayer {
  event: Event;
  ecommerce: Ecommerce;
  user: User;
}
