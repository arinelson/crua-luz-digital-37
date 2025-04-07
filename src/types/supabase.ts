
export interface Category {
  id: string;
  slug: string;
  created_at: string;
}

export interface CategoryTranslation {
  id: string;
  category_id: string;
  language: string;
  name: string;
  created_at: string;
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
  
  // Campos virtuais (não armazenados no banco)
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
  
  // Campos virtuais (não armazenados no banco)
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
