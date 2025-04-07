
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryTranslation, Post, PostTranslation, WebStory, WebStoryTranslation } from '@/types/supabase';

export const supabaseService = {
  // Categorias
  async getCategories(language: string): Promise<Category[]> {
    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        *,
        category_translations!inner(*)
      `)
      .eq('category_translations.language', language);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return categories || [];
  },

  // Posts
  async getFeaturedPosts(language: string, limit = 3): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('post_translations.language', language)
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }

    return posts || [];
  },

  async getRecentPosts(language: string, limit = 2): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('post_translations.language', language)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent posts:', error);
      return [];
    }

    return posts || [];
  },

  async getPostsByCategory(language: string, categorySlug: string): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id!inner(*),
        category_translations:category_id(*)
      `)
      .eq('post_translations.language', language)
      .eq('categories.slug', categorySlug)
      .order('published_at', { ascending: false });

    if (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      return [];
    }

    return posts || [];
  },

  async getAllPosts(language: string): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('post_translations.language', language)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }

    return posts || [];
  },

  async getPostBySlug(language: string, slug: string): Promise<Post | null> {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('post_translations.language', language)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }

    return post;
  },

  // Web Stories
  async getAllWebStories(language: string): Promise<WebStory[]> {
    const { data: webStories, error } = await supabase
      .from('web_stories')
      .select(`
        *,
        web_story_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('web_story_translations.language', language)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching web stories:', error);
      return [];
    }

    return webStories || [];
  },

  async getWebStoryBySlug(language: string, slug: string): Promise<WebStory | null> {
    const { data: webStory, error } = await supabase
      .from('web_stories')
      .select(`
        *,
        web_story_translations!inner(*),
        categories:category_id(*),
        category_translations:category_id(*)
      `)
      .eq('web_story_translations.language', language)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching web story with slug ${slug}:`, error);
      return null;
    }

    return webStory;
  }
};
