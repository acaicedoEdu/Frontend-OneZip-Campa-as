export interface NavigationLink {
  title: string;
  icon: string;
  link: string;
  description?: string;
  external?: boolean;
}

export type NavigationSection = {
  title: string;
  links: NavigationLink[];
};
