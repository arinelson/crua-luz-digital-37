
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryTranslation, Post, PostTranslation, WebStory, WebStoryTranslation, Contact, NewsletterSubscriber } from '@/types/supabase';

export const supabaseService = {
  // Categorias
  async getCategories(language: string): Promise<Category[]> {
    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        *,
        category_translations(*)
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
    try {
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
      const processedPosts = posts?.map(post => ({
        ...post,
        category_translations: []
      })) || [];

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

      return processedPosts;
    } catch (error) {
      console.error('Error processing featured posts:', error);
      return [];
    }
  },

  async getRecentPosts(language: string, limit = 2): Promise<Post[]> {
    try {
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
      const processedPosts = posts?.map(post => ({
        ...post,
        category_translations: []
      })) || [];

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

      return processedPosts;
    } catch (error) {
      console.error('Error processing recent posts:', error);
      return [];
    }
  },

  async getPostsByCategory(language: string, categorySlug: string): Promise<Post[]> {
    try {
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
      const processedPosts = posts?.map(post => ({
        ...post,
        category_translations: []
      })) || [];

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

      return processedPosts;
    } catch (error) {
      console.error(`Error processing posts for category ${categorySlug}:`, error);
      return [];
    }
  },

  async getAllPosts(language: string): Promise<Post[]> {
    try {
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
      const processedPosts = posts?.map(post => ({
        ...post,
        category_translations: []
      })) || [];

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

      return processedPosts;
    } catch (error) {
      console.error('Error processing all posts:', error);
      return [];
    }
  },

  async getPostBySlug(language: string, slug: string): Promise<Post | null> {
    try {
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
    } catch (error) {
      console.error(`Error processing post with slug ${slug}:`, error);
      return null;
    }
  },

  // Web Stories
  async getAllWebStories(language: string): Promise<WebStory[]> {
    try {
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
      const processedStories = webStories?.map(story => ({
        ...story,
        category_translations: []
      })) || [];

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

      return processedStories;
    } catch (error) {
      console.error('Error processing web stories:', error);
      return [];
    }
  },

  async getWebStoryBySlug(language: string, slug: string): Promise<WebStory | null> {
    try {
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
    } catch (error) {
      console.error(`Error processing web story with slug ${slug}:`, error);
      return null;
    }
  },

  // Contacts
  async createContact(contact: Contact): Promise<{ success: boolean; error?: any }> {
    const { error } = await supabase
      .from('contacts')
      .insert([contact]);
    
    return { success: !error, error };
  },
  
  // Newsletter Subscribers
  async createNewsletterSubscriber(subscriber: NewsletterSubscriber): Promise<{ success: boolean; error?: any }> {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([subscriber]);
    
    return { success: !error, error };
  }
};
