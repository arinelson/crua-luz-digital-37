
import { supabase } from '@/integrations/supabase/client';

// Dados de posts em destaque existentes
const featuredArticles = {
  pt: [
    {
      id: 1,
      title: 'Como orar mesmo sem saber por onde começar',
      excerpt: 'Descubra passos simples para iniciar sua jornada de oração, mesmo que você nunca tenha orado antes.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Conexão com Deus',
      slug: 'como-orar-sem-saber-por-onde-comecar'
    },
    {
      id: 2,
      title: 'Os 3 segredos para entender melhor a Bíblia',
      excerpt: 'Técnicas simples que vão transformar sua leitura bíblica e ajudar você a compreender as escrituras.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Entendendo a Bíblia',
      slug: 'segredos-para-entender-melhor-a-biblia'
    },
    {
      id: 3,
      title: 'Encontre alívio para sua dor emocional com estes versículos',
      excerpt: 'Versículos poderosos que trazem conforto e esperança nos momentos mais difíceis da vida.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Superando Desafios',
      slug: 'versiculos-para-alivio-emocional'
    }
  ],
  en: [
    {
      id: 1,
      title: 'How to pray even if you don\'t know where to start',
      excerpt: 'Discover simple steps to begin your prayer journey, even if you\'ve never prayed before.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Connection with God',
      slug: 'how-to-pray-without-knowing-where-to-start'
    },
    {
      id: 2,
      title: 'The 3 secrets to better understanding the Bible',
      excerpt: 'Simple techniques that will transform your Bible reading and help you comprehend the scriptures.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Understanding the Bible',
      slug: 'secrets-to-better-understand-the-bible'
    },
    {
      id: 3,
      title: 'Find relief for your emotional pain with these verses',
      excerpt: 'Powerful verses that bring comfort and hope in life\'s most difficult moments.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Overcoming Challenges',
      slug: 'verses-for-emotional-relief'
    }
  ],
  // Incluir outras línguas...
};

// Dados de artigos recentes
const recentArticles = {
  pt: [
    {
      id: 4,
      title: 'Superando o medo: Lições de Jesus para momentos de incerteza',
      excerpt: 'Como aplicar os ensinamentos de Jesus para enfrentar o medo e a ansiedade nos dias de hoje.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Superando Desafios',
      slug: 'superando-medo-licoes-jesus'
    },
    {
      id: 5,
      title: 'Plano de leitura bíblica para 30 dias: Um novo começo',
      excerpt: 'Um guia passo a passo para iniciar sua jornada na leitura bíblica em apenas 30 dias.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Entendendo a Bíblia',
      slug: 'plano-leitura-biblica-30-dias'
    }
  ],
  en: [
    {
      id: 4,
      title: 'Overcoming fear: Jesus\' lessons for moments of uncertainty',
      excerpt: 'How to apply Jesus\' teachings to face fear and anxiety in today\'s world.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Overcoming Challenges',
      slug: 'overcoming-fear-jesus-lessons'
    },
    {
      id: 5,
      title: '30-day Bible reading plan: A new beginning',
      excerpt: 'A step-by-step guide to start your journey in Bible reading in just 30 days.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Understanding the Bible',
      slug: '30-day-bible-reading-plan'
    }
  ],
  // Incluir outras línguas...
};

// Dados de web stories
const webStories = [
  {
    id: 1,
    titleKey: 'Finding Inner Peace Through Prayer',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    date: '2025-03-20',
    category: 'connectionWithGod',
    slug: 'finding-inner-peace'
  },
  {
    id: 2,
    titleKey: '5 Teachings of Jesus That Changed My Life',
    imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    date: '2025-03-15',
    category: 'teachingsOfJesus',
    slug: '5-teachings-jesus'
  },
  {
    id: 3,
    titleKey: 'How to Overcome Anxiety with Faith',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    date: '2025-03-10',
    category: 'overcomingChallenges',
    slug: 'overcome-anxiety-faith'
  },
  {
    id: 4,
    titleKey: 'Understanding Psalm 23 in Modern Context',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    date: '2025-03-05',
    category: 'understandingBible',
    slug: 'psalm-23-modern-context'
  },
  {
    id: 5,
    titleKey: 'Building a Spiritual Community Online',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    date: '2025-02-28',
    category: 'communityAndCommunion',
    slug: 'spiritual-community-online'
  },
  {
    id: 6,
    titleKey: 'Simple Daily Prayer Routine',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    date: '2025-02-25',
    category: 'practicalResources',
    slug: 'daily-prayer-routine'
  }
];

const webStoryTranslations = {
  en: {
    'Finding Inner Peace Through Prayer': 'Finding Inner Peace Through Prayer',
    '5 Teachings of Jesus That Changed My Life': '5 Teachings of Jesus That Changed My Life',
    'How to Overcome Anxiety with Faith': 'How to Overcome Anxiety with Faith',
    'Understanding Psalm 23 in Modern Context': 'Understanding Psalm 23 in Modern Context',
    'Building a Spiritual Community Online': 'Building a Spiritual Community Online',
    'Simple Daily Prayer Routine': 'Simple Daily Prayer Routine'
  },
  pt: {
    'Finding Inner Peace Through Prayer': 'Encontrando Paz Interior Através da Oração',
    '5 Teachings of Jesus That Changed My Life': '5 Ensinamentos de Jesus Que Mudaram Minha Vida',
    'How to Overcome Anxiety with Faith': 'Como Superar a Ansiedade com Fé',
    'Understanding Psalm 23 in Modern Context': 'Entendendo o Salmo 23 no Contexto Moderno',
    'Building a Spiritual Community Online': 'Construindo uma Comunidade Espiritual Online',
    'Simple Daily Prayer Routine': 'Rotina Simples de Oração Diária'
  },
  // Incluir outras línguas...
};

// Função auxiliar para obter o ID de uma categoria pelo slug
async function getCategoryIdBySlug(slug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error(`Error getting category ID for slug ${slug}:`, error);
    return null;
  }

  return data.id;
}

// Função auxiliar para mapear categoria name para slug
function getCategorySlugByName(categoryName: string): string {
  const mapping: Record<string, string> = {
    'Conexão com Deus': 'connection-with-god',
    'Connection with God': 'connection-with-god',
    'Entendendo a Bíblia': 'understanding-bible',
    'Understanding the Bible': 'understanding-bible',
    'Superando Desafios': 'overcoming-challenges',
    'Overcoming Challenges': 'overcoming-challenges',
    'Ensinos de Jesus': 'teachings-of-jesus',
    'Teachings of Jesus': 'teachings-of-jesus',
    'Comunidade e Comunhão': 'community-communion',
    'Community and Communion': 'community-communion',
    'Recursos Práticos': 'practical-resources',
    'Practical Resources': 'practical-resources',
  };

  return mapping[categoryName] || '';
}

// Migração de posts
export async function migratePosts() {
  try {
    console.log('Iniciando migração de posts...');
    
    // Migrar posts em destaque
    for (const language of ['pt', 'en']) {
      const articles = featuredArticles[language as keyof typeof featuredArticles] || [];
      
      for (const article of articles) {
        const categorySlug = getCategorySlugByName(article.category);
        const categoryId = await getCategoryIdBySlug(categorySlug);
        
        if (!categoryId) {
          console.error(`Category not found for ${article.category}`);
          continue;
        }
        
        // Verificar se o post já existe
        const { data: existingPost } = await supabase
          .from('posts')
          .select('id')
          .eq('slug', article.slug)
          .single();
        
        if (existingPost) {
          console.log(`Post ${article.slug} already exists, skipping...`);
          continue;
        }
        
        // Inserir o post
        const { data: newPost, error } = await supabase
          .from('posts')
          .insert({
            slug: article.slug,
            image_url: article.image,
            category_id: categoryId,
            published_at: new Date(article.date).toISOString(),
            read_time: 5, // Tempo médio de leitura
            featured: true
          })
          .select('id')
          .single();
        
        if (error || !newPost) {
          console.error(`Error inserting post ${article.slug}:`, error);
          continue;
        }
        
        // Inserir a tradução
        const { error: translationError } = await supabase
          .from('post_translations')
          .insert({
            post_id: newPost.id,
            language,
            title: article.title,
            summary: article.excerpt,
            content: `<p>${article.excerpt}</p><p>Este é um conteúdo de exemplo para o artigo "${article.title}".</p>`
          });
        
        if (translationError) {
          console.error(`Error inserting translation for post ${article.slug}:`, translationError);
        }
      }
    }
    
    // Migrar artigos recentes
    for (const language of ['pt', 'en']) {
      const articles = recentArticles[language as keyof typeof recentArticles] || [];
      
      for (const article of articles) {
        const categorySlug = getCategorySlugByName(article.category);
        const categoryId = await getCategoryIdBySlug(categorySlug);
        
        if (!categoryId) {
          console.error(`Category not found for ${article.category}`);
          continue;
        }
        
        // Verificar se o post já existe
        const { data: existingPost } = await supabase
          .from('posts')
          .select('id')
          .eq('slug', article.slug)
          .single();
        
        if (existingPost) {
          console.log(`Post ${article.slug} already exists, skipping...`);
          continue;
        }
        
        // Inserir o post
        const { data: newPost, error } = await supabase
          .from('posts')
          .insert({
            slug: article.slug,
            image_url: article.image,
            category_id: categoryId,
            published_at: new Date(article.date).toISOString(),
            read_time: 4, // Tempo médio de leitura
            featured: false
          })
          .select('id')
          .single();
        
        if (error || !newPost) {
          console.error(`Error inserting post ${article.slug}:`, error);
          continue;
        }
        
        // Inserir a tradução
        const { error: translationError } = await supabase
          .from('post_translations')
          .insert({
            post_id: newPost.id,
            language,
            title: article.title,
            summary: article.excerpt,
            content: `<p>${article.excerpt}</p><p>Este é um conteúdo de exemplo para o artigo "${article.title}".</p>`
          });
        
        if (translationError) {
          console.error(`Error inserting translation for post ${article.slug}:`, translationError);
        }
      }
    }
    
    console.log('Migração de posts concluída!');
    return true;
  } catch (error) {
    console.error('Erro durante a migração de posts:', error);
    return false;
  }
}

// Migração de web stories
export async function migrateWebStories() {
  try {
    console.log('Iniciando migração de web stories...');
    
    for (const story of webStories) {
      const categoryId = await getCategoryIdBySlug(story.category);
      
      if (!categoryId) {
        console.error(`Category not found for ${story.category}`);
        continue;
      }
      
      // Verificar se o web story já existe
      const { data: existingStory } = await supabase
        .from('web_stories')
        .select('id')
        .eq('slug', story.slug)
        .single();
      
      if (existingStory) {
        console.log(`Web story ${story.slug} already exists, skipping...`);
        continue;
      }
      
      // Inserir o web story
      const { data: newStory, error } = await supabase
        .from('web_stories')
        .insert({
          slug: story.slug,
          image_url: story.imageUrl,
          category_id: categoryId,
          published_at: new Date(story.date).toISOString()
        })
        .select('id')
        .single();
      
      if (error || !newStory) {
        console.error(`Error inserting web story ${story.slug}:`, error);
        continue;
      }
      
      // Inserir as traduções
      for (const language of ['en', 'pt']) {
        const translations = webStoryTranslations[language as keyof typeof webStoryTranslations] || {};
        const title = translations[story.titleKey as keyof typeof translations];
        
        if (!title) {
          console.error(`No translation found for ${story.titleKey} in ${language}`);
          continue;
        }
        
        const { error: translationError } = await supabase
          .from('web_story_translations')
          .insert({
            web_story_id: newStory.id,
            language,
            title
          });
        
        if (translationError) {
          console.error(`Error inserting translation for web story ${story.slug} in ${language}:`, translationError);
        }
      }
    }
    
    console.log('Migração de web stories concluída!');
    return true;
  } catch (error) {
    console.error('Erro durante a migração de web stories:', error);
    return false;
  }
}

// Função principal para executar todas as migrações
export async function migrateAllData() {
  await migratePosts();
  await migrateWebStories();
  console.log('Migração de dados concluída!');
}
