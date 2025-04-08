import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Post, CategoryTranslation } from '@/types/supabase';

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('posts')
        .select(`
          *,
          post_translations (*),
          category_translations (*)
        `)
        .order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to ensure category_translations is always an array
      const transformedData = data?.map(post => ({
        ...post,
        category_translations: Array.isArray(post.category_translations) 
          ? post.category_translations 
          : [] as CategoryTranslation[]
      })) || [];
      
      setPosts(transformedData as Post[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Erro ao carregar posts",
        description: "Não foi possível carregar a lista de posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso",
      });
      
      // Reload posts
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Erro ao excluir post",
        description: "Não foi possível excluir o post",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  };

  const filteredPosts = searchQuery.trim() === '' ? posts : posts.filter(post => {
    const title = post.post_translations?.[0]?.title.toLowerCase() || '';
    return title.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link to="/admin/posts/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Post
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data de publicação</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Carregando posts...
                </TableCell>
              </TableRow>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Link 
                      to={`/admin/posts/edit/${post.id}`}
                      className="font-medium hover:underline"
                    >
                      {post.post_translations?.[0]?.title || 'Sem título'}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {post.category_translations?.[0]?.name || 'Sem categoria'}
                  </TableCell>
                  <TableCell>
                    {formatDate(post.published_at)}
                  </TableCell>
                  <TableCell>
                    {post.featured ? 
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Sim
                      </span> : 
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                        Não
                      </span>
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/posts/edit/${post.id}`}>
                        <Button variant="outline" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="Excluir"
                        onClick={() => handleDeletePost(post.id)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Nenhum post encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPosts;
