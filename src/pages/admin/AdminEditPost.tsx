
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import SimpleEditor from '@/components/admin/SimpleEditor';
import ContentPreview from '@/components/admin/ContentPreview';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

// Define o esquema de validação para o formulário
const formSchema = z.object({
  title_pt: z.string().min(1, 'O título em português é obrigatório'),
  title_en: z.string().min(1, 'O título em inglês é obrigatório'),
  summary_pt: z.string().min(1, 'O resumo em português é obrigatório'),
  summary_en: z.string().min(1, 'O resumo em inglês é obrigatório'),
  slug: z.string().min(1, 'O slug é obrigatório')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido. Use apenas letras minúsculas, números e hifens'),
  image_url: z.string().min(1, 'A URL da imagem é obrigatória'),
  category_id: z.string().min(1, 'A categoria é obrigatória'),
  read_time: z.coerce.number().min(1, 'O tempo de leitura deve ser pelo menos 1 minuto'),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const AdminEditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [translationIds, setTranslationIds] = useState<{pt: string, en: string}>({ pt: '', en: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_pt: '',
      title_en: '',
      summary_pt: '',
      summary_en: '',
      slug: '',
      image_url: '',
      category_id: '',
      read_time: 3,
      featured: false,
    },
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select(`
            id,
            slug,
            category_translations (name, language)
          `);
          
        if (error) throw error;
        
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Erro ao carregar categorias",
          description: "Não foi possível carregar a lista de categorias",
          variant: "destructive"
        });
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      try {
        setInitialLoading(true);
        
        // Fetch post data
        const { data: post, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();
        
        if (postError) throw postError;
        
        // Fetch translations
        const { data: translations, error: translationError } = await supabase
          .from('post_translations')
          .select('*')
          .eq('post_id', postId);
        
        if (translationError) throw translationError;
        
        const ptTranslation = translations.find((t: any) => t.language === 'pt');
        const enTranslation = translations.find((t: any) => t.language === 'en');
        
        if (ptTranslation && enTranslation) {
          // Update form with existing data
          form.reset({
            title_pt: ptTranslation.title,
            title_en: enTranslation.title,
            summary_pt: ptTranslation.summary,
            summary_en: enTranslation.summary,
            slug: post.slug,
            image_url: post.image_url,
            category_id: post.category_id || '',
            read_time: post.read_time,
            featured: post.featured,
          });
          
          // Set rich text content
          setContentPt(ptTranslation.content || '');
          setContentEn(enTranslation.content || '');
          
          // Save translation IDs for later update
          setTranslationIds({
            pt: ptTranslation.id,
            en: enTranslation.id
          });
        }
      } catch (error: any) {
        console.error('Error fetching post:', error);
        toast({
          title: "Erro ao carregar post",
          description: error.message || "Não foi possível carregar os dados do post",
          variant: "destructive"
        });
        navigate('/admin/posts');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, navigate]);

  const onSubmit = async (values: FormValues) => {
    // Validate rich text editors
    if (!contentPt) {
      toast({
        title: "Conteúdo em português obrigatório",
        description: "Por favor, preencha o conteúdo do post em português",
        variant: "destructive"
      });
      return;
    }
    
    if (!contentEn) {
      toast({
        title: "Conteúdo em inglês obrigatório",
        description: "Por favor, preencha o conteúdo do post em inglês",
        variant: "destructive"
      });
      return;
    }
    
    if (!postId) {
      toast({
        title: "ID do post não encontrado",
        description: "Não foi possível identificar o post a ser atualizado",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Update post first
      const { error: postError } = await supabase
        .from('posts')
        .update({
          slug: values.slug,
          image_url: values.image_url,
          category_id: values.category_id,
          read_time: values.read_time,
          featured: values.featured,
        })
        .eq('id', postId);
      
      if (postError) throw postError;
      
      // Update PT translation
      const { error: ptError } = await supabase
        .from('post_translations')
        .update({
          title: values.title_pt,
          summary: values.summary_pt,
          content: contentPt,
        })
        .eq('id', translationIds.pt);
      
      if (ptError) throw ptError;
      
      // Update EN translation
      const { error: enError } = await supabase
        .from('post_translations')
        .update({
          title: values.title_en,
          summary: values.summary_en,
          content: contentEn,
        })
        .eq('id', translationIds.en);
      
      if (enError) throw enError;
      
      toast({
        title: "Post atualizado",
        description: "O post foi salvo com sucesso",
      });
      
      navigate('/admin/posts');
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: "Erro ao atualizar post",
        description: error.message || "Ocorreu um erro ao tentar salvar o post",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const title = form.getValues('title_pt').toLowerCase();
    const slug = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // Remove acentos
      .replace(/[^\w\s-]/g, '')  // Remove caracteres especiais
      .replace(/\s+/g, '-')  // Substitui espaços por hifens
      .replace(/--+/g, '-')  // Remove múltiplos hifens
      .trim();
      
    form.setValue('slug', slug);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Editar Post</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title_pt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título (Português)</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do post em português" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="summary_pt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo (Português)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Breve resumo do post em português" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Conteúdo (Português)</FormLabel>
                <div className="mt-1">
                  <Tabs defaultValue="editor">
                    <TabsList className="mb-2">
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Prévia</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor">
                      <SimpleEditor
                        initialValue={contentPt}
                        onChange={setContentPt}
                        placeholder="Escreva o conteúdo do post em português..."
                      />
                    </TabsContent>
                    <TabsContent value="preview">
                      <ContentPreview content={contentPt} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título (Inglês)</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do post em inglês" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="summary_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo (Inglês)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Breve resumo do post em inglês" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Conteúdo (Inglês)</FormLabel>
                <div className="mt-1">
                  <Tabs defaultValue="editor">
                    <TabsList className="mb-2">
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Prévia</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor">
                      <SimpleEditor
                        initialValue={contentEn}
                        onChange={setContentEn}
                        placeholder="Escreva o conteúdo do post em inglês..."
                      />
                    </TabsContent>
                    <TabsContent value="preview">
                      <ContentPreview content={contentEn} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input placeholder="slug-do-post" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={generateSlug}
                        >
                          Gerar
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="read_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de leitura (min)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem</FormLabel>
                    <FormControl>
                      <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.category_translations.find((t: any) => t.language === 'pt')?.name || 
                             category.slug}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Destacar este post na página inicial
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              {form.getValues('image_url') && (
                <div>
                  <FormLabel>Preview da imagem</FormLabel>
                  <div className="mt-1 rounded-md overflow-hidden border border-border h-[200px]">
                    <img 
                      src={form.getValues('image_url')} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Imagem+não+encontrada";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/posts')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Atualizar Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminEditPost;
