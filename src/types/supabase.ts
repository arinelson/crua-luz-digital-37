
export interface Category {
  id: string;
  slug: string;
  created_at: string;
  category_translations?: CategoryTranslation[];
}

export interface CategoryTranslation {
  id: string;
  category_id: string;
  language: string;
  name: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  language: string;
  ip_address: string | null;
  subscribed_at: string;
}

export interface Post {
  id: string;
  slug: string;
  image_url: string;
  category_id: string | null;
  published_at: string;
  read_time: number;
  featured: boolean;
  created_at: string;
  
  // Fields returned by joins
  post_translations?: PostTranslation[];
  categories?: Category;
  category_translations?: CategoryTranslation[];
  
  // Legacy fields (keeping for backward compatibility)
  translations?: PostTranslation[];
  category?: Category;
  categoryTranslation?: CategoryTranslation;
}

export interface PostTranslation {
  id: string;
  post_id: string;
  language: string;
  title: string;
  summary: string;
  content: string | null;
  created_at: string;
}

export interface WebStory {
  id: string;
  slug: string;
  image_url: string;
  category_id: string | null;
  published_at: string;
  created_at: string;
  
  // Fields returned by joins
  web_story_translations?: WebStoryTranslation[];
  categories?: Category;
  category_translations?: CategoryTranslation[];
  
  // Legacy fields (keeping for backward compatibility)
  translations?: WebStoryTranslation[];
  category?: Category;
  categoryTranslation?: CategoryTranslation;
}

export interface WebStoryTranslation {
  id: string;
  web_story_id: string;
  language: string;
  title: string;
  created_at: string;
}
