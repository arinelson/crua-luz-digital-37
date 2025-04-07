
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryTranslation, Post, PostTranslation, WebStory, WebStoryTranslation, Contact, NewsletterSubscriber } from '@/types/supabase';

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
        categories:category_id(*)
      `)
      .eq('post_translations.language', language)
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }

    // Process the data to match our Post type
    const processedPosts = posts?.map(post => {
      // Get category ID to fetch translations separately
      const categoryId = post.categories?.id;
      
      return {
        ...post,
        category_translations: [] // Initialize with empty array
      };
    }) || [];

    // For each post with a category, fetch the category translations
    if (processedPosts.length > 0) {
      for (const post of processedPosts) {
        if (post.categories?.id) {
          const { data: translations } = await supabase
            .from('category_translations')
            .select('*')
            .eq('category_id', post.categories.id)
            .eq('language', language);
            
          if (translations && translations.length > 0) {
            post.category_translations = translations;
          }
        }
      }
    }

    return processedPosts as Post[];
  },

  async getRecentPosts(language: string, limit = 2): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*)
      `)
      .eq('post_translations.language', language)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent posts:', error);
      return [];
    }

    // Process the data to match our Post type
    const processedPosts = posts?.map(post => {
      return {
        ...post,
        category_translations: [] // Initialize with empty array
      };
    }) || [];

    // For each post with a category, fetch the category translations
    if (processedPosts.length > 0) {
      for (const post of processedPosts) {
        if (post.categories?.id) {
          const { data: translations } = await supabase
            .from('category_translations')
            .select('*')
            .eq('category_id', post.categories.id)
            .eq('language', language);
            
          if (translations && translations.length > 0) {
            post.category_translations = translations;
          }
        }
      }
    }

    return processedPosts as Post[];
  },

  async getPostsByCategory(language: string, categorySlug: string): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id!inner(*)
      `)
      .eq('post_translations.language', language)
      .eq('categories.slug', categorySlug)
      .order('published_at', { ascending: false });

    if (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      return [];
    }

    // Process the data to match our Post type
    const processedPosts = posts?.map(post => {
      return {
        ...post,
        category_translations: [] // Initialize with empty array
      };
    }) || [];

    // For each post with a category, fetch the category translations
    if (processedPosts.length > 0) {
      for (const post of processedPosts) {
        if (post.categories?.id) {
          const { data: translations } = await supabase
            .from('category_translations')
            .select('*')
            .eq('category_id', post.categories.id)
            .eq('language', language);
            
          if (translations && translations.length > 0) {
            post.category_translations = translations;
          }
        }
      }
    }

    return processedPosts as Post[];
  },

  async getAllPosts(language: string): Promise<Post[]> {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*)
      `)
      .eq('post_translations.language', language)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }

    // Process the data to match our Post type
    const processedPosts = posts?.map(post => {
      return {
        ...post,
        category_translations: [] // Initialize with empty array
      };
    }) || [];

    // For each post with a category, fetch the category translations
    if (processedPosts.length > 0) {
      for (const post of processedPosts) {
        if (post.categories?.id) {
          const { data: translations } = await supabase
            .from('category_translations')
            .select('*')
            .eq('category_id', post.categories.id)
            .eq('language', language);
            
          if (translations && translations.length > 0) {
            post.category_translations = translations;
          }
        }
      }
    }

    return processedPosts as Post[];
  },

  async getPostBySlug(language: string, slug: string): Promise<Post | null> {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_translations!inner(*),
        categories:category_id(*)
      `)
      .eq('post_translations.language', language)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }

    // Initialize with empty category_translations array
    const processedPost = {
      ...post,
      category_translations: [] as CategoryTranslation[]
    };

    // If the post has a category, fetch its translations
    if (post.categories?.id) {
      const { data: translations } = await supabase
        .from('category_translations')
        .select('*')
        .eq('category_id', post.categories.id)
        .eq('language', language);
        
      if (translations && translations.length > 0) {
        processedPost.category_translations = translations;
      }
    }

    return processedPost as Post;
  },

  // Web Stories
  async getAllWebStories(language: string): Promise<WebStory[]> {
    const { data: webStories, error } = await supabase
      .from('web_stories')
      .select(`
        *,
        web_story_translations!inner(*),
        categories:category_id(*)
      `)
      .eq('web_story_translations.language', language)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching web stories:', error);
      return [];
    }

    // Process the data to match our WebStory type
    const processedStories = webStories?.map(story => {
      return {
        ...story,
        category_translations: [] // Initialize with empty array
      };
    }) || [];

    // For each story with a category, fetch the category translations
    if (processedStories.length > 0) {
      for (const story of processedStories) {
        if (story.categories?.id) {
          const { data: translations } = await supabase
            .from('category_translations')
            .select('*')
            .eq('category_id', story.categories.id)
            .eq('language', language);
            
          if (translations && translations.length > 0) {
            story.category_translations = translations;
          }
        }
      }
    }

    return processedStories as WebStory[];
  },

  async getWebStoryBySlug(language: string, slug: string): Promise<WebStory | null> {
    const { data: webStory, error } = await supabase
      .from('web_stories')
      .select(`
        *,
        web_story_translations!inner(*),
        categories:category_id(*)
      `)
      .eq('web_story_translations.language', language)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching web story with slug ${slug}:`, error);
      return null;
    }

    // Initialize with empty category_translations array
    const processedStory = {
      ...webStory,
      category_translations: [] as CategoryTranslation[]
    };

    // If the story has a category, fetch its translations
    if (webStory.categories?.id) {
      const { data: translations } = await supabase
        .from('category_translations')
        .select('*')
        .eq('category_id', webStory.categories.id)
        .eq('language', language);
        
      if (translations && translations.length > 0) {
        processedStory.category_translations = translations;
      }
    }

    return processedStory as WebStory;
  }
};
