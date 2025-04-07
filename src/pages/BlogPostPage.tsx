
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Calendar, Clock, Bookmark } from 'lucide-react';

// Sample blogs data - in production this would come from an API or CMS
const blogPosts = {
  'understanding-jesus-parables': {
    title: {
      en: 'How to Understand Jesus Parables',
      pt: 'Como Entender as Parábolas de Jesus',
      es: 'Cómo Entender las Parábolas de Jesús',
      de: 'Wie man die Gleichnisse Jesu versteht',
      fr: 'Comment Comprendre les Paraboles de Jésus',
      it: 'Come Comprendere le Parabole di Gesù'
    },
    category: 'teachingsOfJesus',
    imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    date: '2025-03-15',
    readTime: 5,
    author: {
      en: 'John Smith',
      pt: 'João Silva',
      es: 'Juan Smith',
      de: 'Johan Schmidt',
      fr: 'Jean Dupont',
      it: 'Giovanni Rossi'
    },
    content: {
      en: `
        <h2>Introduction to Jesus' Parables</h2>
        <p>Jesus often taught using parables—simple stories that conveyed deeper spiritual truths. These stories connected with people of His time by using familiar situations to explain complex concepts about God's kingdom.</p>
        
        <p>Understanding parables requires us to look beyond the surface narrative and consider the context and audience Jesus was addressing. While some parables can seem straightforward, others contain layers of meaning that reward deeper study.</p>
        
        <h2>Why Did Jesus Teach in Parables?</h2>
        <p>Jesus explained His use of parables in Matthew 13:10-13, when His disciples asked why He taught this way. He indicated that parables revealed truth to those genuinely seeking understanding, while concealing it from those with closed hearts.</p>
        
        <p>Parables also had the advantage of being memorable and relatable. They stuck in the minds of listeners and could be easily shared with others, helping spread Jesus' teachings throughout communities.</p>
        
        <h2>Keys to Understanding the Parables</h2>
        <p>When approaching Jesus' parables, consider these principles:</p>
        
        <ol>
          <li><strong>Look for the main point</strong> - Most parables have one central message rather than symbolic meanings for every detail.</li>
          <li><strong>Consider the historical context</strong> - Understanding the cultural setting helps reveal what would have resonated with the original audience.</li>
          <li><strong>Note the audience</strong> - Jesus often tailored His message depending on whether He was speaking to disciples, religious leaders, or crowds.</li>
          <li><strong>Connect to broader teachings</strong> - Parables support Jesus' overall message about God's kingdom, not isolated lessons.</li>
        </ol>
        
        <h2>Common Misunderstandings</h2>
        <p>Many readers make the mistake of over-interpreting parables, treating them like allegories where every element represents something specific. While some parables do contain multiple symbolic elements (such as the Parable of the Sower), most focus on conveying a single truth.</p>
        
        <p>Another error is missing cultural references that would have been obvious to Jesus' original audience. For example, understanding local farming practices, wedding customs, or social structures often illuminates the intended meaning.</p>
        
        <h2>Applying Parables Today</h2>
        <p>Though spoken in a different time and culture, Jesus' parables contain timeless wisdom that still applies to our modern lives. The key is to identify the core principle and consider how it manifests in our current context.</p>
        
        <p>For example, the Parable of the Good Samaritan isn't just about helping strangers in physical danger—it challenges us to reconsider who we view as our "neighbor" and how we might overcome social boundaries to show compassion.</p>
        
        <h2>Conclusion</h2>
        <p>Jesus' parables continue to challenge and inspire us today. By approaching them with humility, historical awareness, and openness to their message, we can discover profound insights about God's character and His kingdom.</p>
        
        <p>Rather than quick, surface-level readings, take time to sit with these stories, considering what they revealed to their original audience and what they might be saying to you today.</p>
      `,
      pt: `
        <h2>Introdução às Parábolas de Jesus</h2>
        <p>Jesus frequentemente ensinava usando parábolas—histórias simples que transmitiam verdades espirituais mais profundas. Essas histórias conectavam-se com as pessoas de Seu tempo usando situações familiares para explicar conceitos complexos sobre o reino de Deus.</p>
        
        <p>Compreender parábolas requer que olhemos além da narrativa superficial e consideremos o contexto e o público que Jesus estava abordando. Enquanto algumas parábolas podem parecer diretas, outras contêm camadas de significado que recompensam um estudo mais profundo.</p>
        
        <h2>Por Que Jesus Ensinava em Parábolas?</h2>
        <p>Jesus explicou Seu uso de parábolas em Mateus 13:10-13, quando Seus discípulos perguntaram por que Ele ensinava dessa maneira. Ele indicou que as parábolas revelavam a verdade àqueles que genuinamente buscavam entendimento, enquanto a ocultavam daqueles com corações fechados.</p>
        
        <p>As parábolas também tinham a vantagem de serem memoráveis e relacionáveis. Elas ficavam nas mentes dos ouvintes e podiam ser facilmente compartilhadas com outros, ajudando a espalhar os ensinamentos de Jesus pelas comunidades.</p>
        
        <h2>Chaves para Entender as Parábolas</h2>
        <p>Ao abordar as parábolas de Jesus, considere estes princípios:</p>
        
        <ol>
          <li><strong>Procure o ponto principal</strong> - A maioria das parábolas tem uma mensagem central em vez de significados simbólicos para cada detalhe.</li>
          <li><strong>Considere o contexto histórico</strong> - Entender o cenário cultural ajuda a revelar o que teria ressoado com a audiência original.</li>
          <li><strong>Observe o público</strong> - Jesus frequentemente adaptava Sua mensagem dependendo se Ele estava falando com discípulos, líderes religiosos ou multidões.</li>
          <li><strong>Conecte-se a ensinamentos mais amplos</strong> - As parábolas apoiam a mensagem geral de Jesus sobre o reino de Deus, não lições isoladas.</li>
        </ol>
        
        <h2>Mal-entendidos Comuns</h2>
        <p>Muitos leitores cometem o erro de super-interpretar parábolas, tratando-as como alegorias onde cada elemento representa algo específico. Embora algumas parábolas contenham múltiplos elementos simbólicos (como a Parábola do Semeador), a maioria se concentra em transmitir uma única verdade.</p>
        
        <p>Outro erro é perder referências culturais que teriam sido óbvias para o público original de Jesus. Por exemplo, entender práticas agrícolas locais, costumes de casamento ou estruturas sociais frequentemente ilumina o significado pretendido.</p>
        
        <h2>Aplicando Parábolas Hoje</h2>
        <p>Embora faladas em um tempo e cultura diferentes, as parábolas de Jesus contêm sabedoria atemporal que ainda se aplica às nossas vidas modernas. A chave é identificar o princípio central e considerar como ele se manifesta em nosso contexto atual.</p>
        
        <p>Por exemplo, a Parábola do Bom Samaritano não é apenas sobre ajudar estranhos em perigo físico—ela nos desafia a reconsiderar quem vemos como nosso "próximo" e como podemos superar barreiras sociais para mostrar compaixão.</p>
        
        <h2>Conclusão</h2>
        <p>As parábolas de Jesus continuam a nos desafiar e inspirar hoje. Ao abordá-las com humildade, consciência histórica e abertura à sua mensagem, podemos descobrir insights profundos sobre o caráter de Deus e Seu reino.</p>
        
        <p>Em vez de leituras rápidas e superficiais, reserve um tempo para sentar-se com essas histórias, considerando o que elas revelaram para seu público original e o que elas podem estar dizendo para você hoje.</p>
      `,
      // Additional languages would be included here
    }
  },
  'finding-peace-in-prayer': {
    title: {
      en: 'Finding Peace in Prayer',
      pt: 'Encontrando Paz na Oração',
      es: 'Encontrando Paz en la Oración',
      de: 'Frieden im Gebet finden',
      fr: 'Trouver la Paix dans la Prière',
      it: 'Trovare Pace nella Preghiera'
    },
    category: 'connectionWithGod',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    date: '2025-03-10',
    readTime: 4,
    author: {
      en: 'Sarah Johnson',
      pt: 'Sara Oliveira',
      es: 'Sara Jiménez',
      de: 'Sarah Müller',
      fr: 'Sarah Dubois',
      it: 'Sara Bianchi'
    },
    content: {
      en: `
        <h2>The Power of Prayer in Finding Peace</h2>
        <p>In our fast-paced world filled with constant notifications, deadlines, and pressures, finding genuine peace can seem impossible. Yet throughout history, people have discovered a powerful source of tranquility through prayer—a practice that transcends religious boundaries and speaks to our deepest human need for connection.</p>
        
        <p>Prayer isn't about perfect words or following strict formulas. At its heart, prayer is about opening yourself to a relationship with God, creating space for both speaking and listening.</p>
        
        <h2>What Happens When We Pray</h2>
        <p>Research has consistently shown that regular prayer is associated with numerous psychological benefits, including reduced anxiety, increased resilience to stress, and greater feelings of peace. But beyond these measurable effects, those who practice prayer often report something deeper—a sense of being known, held, and loved by something greater than themselves.</p>
        
        <p>When we bring our worries, fears, and uncertainties before God, we're not simply offloading them or engaging in positive thinking. We're acknowledging that we were never meant to carry life's burdens alone.</p>
        
        <h2>Creating a Simple Prayer Practice</h2>
        <p>If you're new to prayer or looking to deepen your practice, consider these approaches:</p>
        
        <ol>
          <li><strong>Start with gratitude</strong> - Begin by noting three things you're thankful for, no matter how small.</li>
          <li><strong>Speak naturally</strong> - Talk to God as you would to a trusted friend. No special language is required.</li>
          <li><strong>Incorporate silence</strong> - Allow moments of quiet to listen, not just speak.</li>
          <li><strong>Use simple prayers</strong> - When you don't know what to say, even "Help me" or "Thank you" are powerful prayers.</li>
        </ol>
        
        <h2>Finding Peace in Difficult Times</h2>
        <p>Perhaps the most profound test of prayer comes during our darkest moments. When suffering strikes, platitudes often fail us, but honest prayer creates space for authentic expression—whether that's grief, anger, confusion, or hope.</p>
        
        <p>Jesus himself prayed from a place of anguish in the Garden of Gethsemane, showing us that prayer doesn't require us to hide our true feelings or present only our most polished selves.</p>
        
        <h2>A Daily Practice for Peace</h2>
        <p>Consider this simple framework for daily prayer:</p>
        
        <ul>
          <li><strong>Morning</strong> - Take 5 minutes to set your intention for the day and ask for guidance.</li>
          <li><strong>Midday</strong> - Pause for 1 minute of conscious breathing, reconnecting with God's presence.</li>
          <li><strong>Evening</strong> - Reflect on where you experienced peace, challenge, or growth throughout the day.</li>
        </ul>
        
        <p>This rhythm creates touchpoints throughout your day, reminding you that peace isn't something you achieve once, but a relationship you continuously return to.</p>
        
        <h2>Conclusion</h2>
        <p>The peace that prayer offers isn't superficial calm or temporary escape. It's what Jesus referred to when he said, "Peace I leave with you; my peace I give you. I do not give to you as the world gives" (John 14:27).</p>
        
        <p>This peace exists not in the absence of storms, but in knowing we're never facing them alone. Through prayer, we open ourselves to a deeper reality—one where we're held in love, guided with wisdom, and offered a peace that truly surpasses understanding.</p>
      `,
      pt: `
        <h2>O Poder da Oração em Encontrar Paz</h2>
        <p>Em nosso mundo acelerado cheio de notificações constantes, prazos e pressões, encontrar paz genuína pode parecer impossível. No entanto, ao longo da história, as pessoas descobriram uma poderosa fonte de tranquilidade através da oração—uma prática que transcende fronteiras religiosas e fala à nossa necessidade humana mais profunda de conexão.</p>
        
        <p>A oração não se trata de palavras perfeitas ou de seguir fórmulas estritas. Em sua essência, a oração é sobre abrir-se para um relacionamento com Deus, criando espaço tanto para falar quanto para ouvir.</p>
        
        <h2>O Que Acontece Quando Oramos</h2>
        <p>Pesquisas têm mostrado consistentemente que a oração regular está associada a numerosos benefícios psicológicos, incluindo redução da ansiedade, aumento da resiliência ao estresse e maiores sentimentos de paz. Mas além desses efeitos mensuráveis, aqueles que praticam a oração frequentemente relatam algo mais profundo—um senso de ser conhecido, amparado e amado por algo maior que eles mesmos.</p>
        
        <p>Quando trazemos nossas preocupações, medos e incertezas diante de Deus, não estamos simplesmente descarregando-os ou envolvendo-nos em pensamento positivo. Estamos reconhecendo que nunca fomos destinados a carregar os fardos da vida sozinhos.</p>
        
        <h2>Criando uma Prática Simples de Oração</h2>
        <p>Se você é novo na oração ou está procurando aprofundar sua prática, considere estas abordagens:</p>
        
        <ol>
          <li><strong>Comece com gratidão</strong> - Comece anotando três coisas pelas quais você é grato, não importa quão pequenas sejam.</li>
          <li><strong>Fale naturalmente</strong> - Fale com Deus como você falaria com um amigo confiável. Nenhuma linguagem especial é necessária.</li>
          <li><strong>Incorpore o silêncio</strong> - Permita momentos de quietude para ouvir, não apenas falar.</li>
          <li><strong>Use orações simples</strong> - Quando você não sabe o que dizer, até mesmo "Ajuda-me" ou "Obrigado" são orações poderosas.</li>
        </ol>
        
        <h2>Encontrando Paz em Tempos Difíceis</h2>
        <p>Talvez o teste mais profundo da oração venha durante nossos momentos mais sombrios. Quando o sofrimento nos atinge, lugares-comuns frequentemente nos falham, mas a oração honesta cria espaço para expressão autêntica—seja luto, raiva, confusão ou esperança.</p>
        
        <p>O próprio Jesus orou de um lugar de angústia no Jardim do Getsêmani, mostrando-nos que a oração não exige que escondamos nossos verdadeiros sentimentos ou apresentemos apenas nossos eus mais polidos.</p>
        
        <h2>Uma Prática Diária para a Paz</h2>
        <p>Considere este framework simples para oração diária:</p>
        
        <ul>
          <li><strong>Manhã</strong> - Tire 5 minutos para definir sua intenção para o dia e pedir orientação.</li>
          <li><strong>Meio-dia</strong> - Pause para 1 minuto de respiração consciente, reconectando-se com a presença de Deus.</li>
          <li><strong>Noite</strong> - Reflita sobre onde você experimentou paz, desafio ou crescimento ao longo do dia.</li>
        </ul>
        
        <p>Este ritmo cria pontos de contato ao longo do seu dia, lembrando-o de que a paz não é algo que você alcança uma vez, mas um relacionamento ao qual você continuamente retorna.</p>
        
        <h2>Conclusão</h2>
        <p>A paz que a oração oferece não é calma superficial ou fuga temporária. É ao que Jesus se referiu quando disse: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá" (João 14:27).</p>
        
        <p>Esta paz existe não na ausência de tempestades, mas em saber que nunca estamos enfrentando-as sozinhos. Através da oração, nos abrimos para uma realidade mais profunda—uma onde somos mantidos no amor, guiados com sabedoria e nos é oferecida uma paz que verdadeiramente ultrapassa o entendimento.</p>
      `,
      // Additional languages would be included here
    }
  },
  'faith-meets-anxiety': {
    title: {
      en: 'When Faith Meets Anxiety',
      pt: 'Quando a Fé Encontra a Ansiedade',
      es: 'Cuando la Fe Encuentra la Ansiedad',
      de: 'Wenn Glaube auf Angst trifft',
      fr: 'Quand la Foi Rencontre l\'Anxiété',
      it: 'Quando la Fede Incontra l\'Ansia'
    },
    category: 'overcomingChallenges',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    date: '2025-03-05',
    readTime: 6,
    author: {
      en: 'Michael Thompson',
      pt: 'Miguel Santos',
      es: 'Miguel Torres',
      de: 'Michael Weber',
      fr: 'Michel Dupont',
      it: 'Michele Rossi'
    },
    content: {
      en: `
        <h2>The Reality of Anxiety in the Life of Faith</h2>
        <p>Many believers struggle with a painful contradiction: they have genuine faith in God, yet still experience debilitating anxiety. This disconnect can lead to shame, confusion, and even deeper anxiety as they wonder, "Shouldn't my faith be enough to overcome these feelings?"</p>
        
        <p>The truth is that anxiety disorders affect people of all beliefs and backgrounds. Having faith doesn't make us immune to mental health challenges any more than it prevents physical illness. What faith does provide, however, is a framework for understanding and navigating anxiety in a way that leads toward healing rather than isolation.</p>
        
        <h2>Faith and Anxiety in Scripture</h2>
        <p>Throughout the Bible, we find honest portrayals of anxiety and fear, even among those closest to God:</p>
        
        <ul>
          <li>David frequently wrote about his fears and anxieties in the Psalms</li>
          <li>Elijah experienced what sounds like depression and anxiety after his confrontation with the prophets of Baal</li>
          <li>Jesus himself experienced deep distress in the Garden of Gethsemane</li>
        </ul>
        
        <p>Rather than condemning these experiences, Scripture acknowledges them as part of the human journey and offers pathways through them—not around them.</p>
        
        <h2>Practical Steps for Managing Anxiety Through Faith</h2>
        <p>When anxiety and faith intersect, these practices can help:</p>
        
        <ol>
          <li><strong>Honest prayer</strong> - God invites us to "cast all your anxiety on him" (1 Peter 5:7). This means being truthful about our struggles rather than trying to present a perfect facade.</li>
          <li><strong>Scripture meditation</strong> - Focusing on passages like Philippians 4:6-7 or Matthew 6:25-34 can help reframe anxious thoughts.</li>
          <li><strong>Community support</strong> - Share your struggles with trusted believers who can offer both spiritual and practical support.</li>
          <li><strong>Professional help</strong> - Seeking therapy or medical treatment for anxiety is not a sign of insufficient faith, but rather good stewardship of your mental health.</li>
        </ol>
        
        <h2>Reframing Anxious Thoughts</h2>
        <p>One powerful way faith helps with anxiety is by providing an alternative narrative to catastrophic thinking. When anxiety tells us the worst-case scenario is inevitable, faith reminds us that we are held by a God who works for good in all circumstances.</p>
        
        <p>This doesn't mean expecting everything to turn out perfectly, but rather trusting that whatever happens, we won't face it alone.</p>
        
        <h2>When Anxiety Persists</h2>
        <p>For many people, anxiety is not a temporary challenge but a chronic condition requiring ongoing management. In these cases, faith offers not a quick cure, but a source of enduring hope and meaning.</p>
        
        <p>Like Paul's "thorn in the flesh" that was not removed despite prayer, persistent anxiety may become a space where we experience God's sufficient grace in a unique way—not by the anxiety disappearing, but by finding God present within it.</p>
        
        <h2>Conclusion</h2>
        <p>Faith and anxiety are not mutually exclusive. In fact, bringing these two aspects of your experience into honest dialogue can lead to a more authentic faith and more effective anxiety management.</p>
        
        <p>The promise of faith is not a life free from all distress, but rather the assurance that in our distress, we are never abandoned. As Jesus said, "In this world you will have trouble. But take heart! I have overcome the world" (John 16:33).</p>
      `,
      pt: `
        <h2>A Realidade da Ansiedade na Vida de Fé</h2>
        <p>Muitos crentes lutam com uma contradição dolorosa: eles têm fé genuína em Deus, mas ainda experimentam ansiedade debilitante. Essa desconexão pode levar à vergonha, confusão e até ansiedade mais profunda, enquanto se perguntam: "Minha fé não deveria ser suficiente para superar esses sentimentos?"</p>
        
        <p>A verdade é que transtornos de ansiedade afetam pessoas de todas as crenças e origens. Ter fé não nos torna imunes a desafios de saúde mental, assim como não previne doenças físicas. O que a fé oferece, no entanto, é uma estrutura para entender e navegar pela ansiedade de uma forma que leva à cura, em vez de isolamento.</p>
        
        <h2>Fé e Ansiedade nas Escrituras</h2>
        <p>Ao longo da Bíblia, encontramos retratos honestos de ansiedade e medo, mesmo entre aqueles mais próximos de Deus:</p>
        
        <ul>
          <li>Davi frequentemente escrevia sobre seus medos e ansiedades nos Salmos</li>
          <li>Elias experimentou o que parece depressão e ansiedade após sua confrontação com os profetas de Baal</li>
          <li>O próprio Jesus experimentou profunda angústia no Jardim do Getsêmani</li>
        </ul>
        
        <p>Em vez de condenar essas experiências, as Escrituras as reconhecem como parte da jornada humana e oferecem caminhos através delas—não ao redor delas.</p>
        
        <h2>Passos Práticos para Gerenciar a Ansiedade Através da Fé</h2>
        <p>Quando ansiedade e fé se cruzam, estas práticas podem ajudar:</p>
        
        <ol>
          <li><strong>Oração honesta</strong> - Deus nos convida a "lançar sobre ele toda a sua ansiedade" (1 Pedro 5:7). Isso significa ser verdadeiro sobre nossas lutas, em vez de tentar apresentar uma fachada perfeita.</li>
          <li><strong>Meditação nas Escrituras</strong> - Focar em passagens como Filipenses 4:6-7 ou Mateus 6:25-34 pode ajudar a reenquadrar pensamentos ansiosos.</li>
          <li><strong>Apoio comunitário</strong> - Compartilhe suas lutas com crentes confiáveis que podem oferecer apoio tanto espiritual quanto prático.</li>
          <li><strong>Ajuda profissional</strong> - Buscar terapia ou tratamento médico para ansiedade não é um sinal de fé insuficiente, mas sim uma boa administração de sua saúde mental.</li>
        </ol>
        
        <h2>Reenquadrando Pensamentos Ansiosos</h2>
        <p>Uma maneira poderosa pela qual a fé ajuda com a ansiedade é fornecendo uma narrativa alternativa ao pensamento catastrófico. Quando a ansiedade nos diz que o pior cenário é inevitável, a fé nos lembra que somos sustentados por um Deus que trabalha para o bem em todas as circunstâncias.</p>
        
        <p>Isso não significa esperar que tudo saia perfeitamente, mas confiar que, o que quer que aconteça, não enfrentaremos isso sozinhos.</p>
        
        <h2>Quando a Ansiedade Persiste</h2>
        <p>Para muitas pessoas, a ansiedade não é um desafio temporário, mas uma condição crônica que requer gerenciamento contínuo. Nesses casos, a fé oferece não uma cura rápida, mas uma fonte de esperança e significado duradouros.</p>
        
        <p>Como o "espinho na carne" de Paulo que não foi removido apesar da oração, a ansiedade persistente pode se tornar um espaço onde experimentamos a graça suficiente de Deus de uma maneira única—não pelo desaparecimento da ansiedade, mas por encontrar Deus presente dentro dela.</p>
        
        <h2>Conclusão</h2>
        <p>Fé e ansiedade não são mutuamente exclusivas. Na verdade, trazer esses dois aspectos de sua experiência para um diálogo honesto pode levar a uma fé mais autêntica e um gerenciamento de ansiedade mais eficaz.</p>
        
        <p>A promessa da fé não é uma vida livre de toda angústia, mas sim a garantia de que em nossa angústia, nunca somos abandonados. Como Jesus disse: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo" (João 16:33).</p>
      `,
      // Additional languages would be included here
    }
  }
};

// Translation keys for post UI
const uiTranslations = {
  en: {
    'readingTime': 'min read',
    'publishedOn': 'Published on',
    'backToBlog': 'Back to blog',
    'share': 'Share',
    'bookmark': 'Save',
    'authorPrefix': 'By',
    'categoryPrefix': 'In',
    'relatedArticles': 'You might also like'
  },
  pt: {
    'readingTime': 'min de leitura',
    'publishedOn': 'Publicado em',
    'backToBlog': 'Voltar ao blog',
    'share': 'Compartilhar',
    'bookmark': 'Salvar',
    'authorPrefix': 'Por',
    'categoryPrefix': 'Em',
    'relatedArticles': 'Você também pode gostar'
  },
  // Additional languages would be included here
};

const BlogPostPage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { language, t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Get post data
  const post = blogPosts[articleSlug as keyof typeof blogPosts];
  
  // If post not found
  if (!post) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to={`/${language}/blog`}>
          <Button>Back to blog</Button>
        </Link>
      </div>
    );
  }

  // Format date based on locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'en' ? 'en-US' : 
      language === 'pt' ? 'pt-BR' : 
      language === 'es' ? 'es-ES' : 
      language === 'de' ? 'de-DE' : 
      language === 'it' ? 'it-IT' : 'fr-FR', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  // Translate UI text
  const translateUI = (key: string) => {
    const langUI = uiTranslations[language as keyof typeof uiTranslations] || uiTranslations.en;
    return langUI[key as keyof typeof langUI] || key;
  };

  // Handle scroll progress for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{post.title[language as keyof typeof post.title] || post.title.en} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={post.title[language as keyof typeof post.title] || post.title.en} />
        <meta property="og:title" content={post.title[language as keyof typeof post.title] || post.title.en} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Reading progress bar */}
      <div 
        className="progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="py-8 md:py-12">
        <div className="container-content max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/${language}/blog`} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {translateUI('backToBlog')}
              </Link>
            </Button>
          </div>

          {/* Post header */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-medium text-primary">
                {translateUI('categoryPrefix')} {t(post.category)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title[language as keyof typeof post.title] || post.title.en}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{translateUI('publishedOn')} {formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{post.readTime} {translateUI('readingTime')}</span>
              </div>
              <div>
                {translateUI('authorPrefix')} {post.author[language as keyof typeof post.author] || post.author.en}
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="rounded-xl overflow-hidden mb-8 md:mb-12">
            <img 
              src={post.imageUrl} 
              alt={post.title[language as keyof typeof post.title] || post.title.en}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
              loading="eager"
            />
          </div>

          {/* Social sharing buttons */}
          <div className="flex justify-end mb-8">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {translateUI('share')}
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                {translateUI('bookmark')}
              </Button>
            </div>
          </div>

          {/* Post content */}
          <div 
            className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:scroll-mt-20"
            dangerouslySetInnerHTML={{ 
              __html: post.content[language as keyof typeof post.content] || post.content.en 
            }}
          />
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
