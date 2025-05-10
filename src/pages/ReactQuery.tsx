import { useState } from 'react';

const getPosts = async () => {
  const response = await $get<{ id: number; title: string }[]>('common/board/post/list');
  return response.data;
};

const createPost = async (payload: { title: string }) => {
  return $post('common/board/post', payload);
};

const ReactQuery = () => {
  const [title, setTitle] = useState('');

  const { data: posts } = $query(['posts'], getPosts);

  const { mutate: submit, isPending } = $mutation(createPost, {
    onSuccess: () => {
      $toast('게시글 등록 성공!');
      // 캐시 무효화
      $queryClient.invalidateQueries({ queryKey: ['posts'] });
      // refetch
      // $queryClient.refetchQueries({ queryKey: ['posts'] });
      setTitle('');
    },
    onError: () => {
      $toast('게시글 등록 실패!');
    }
  });

  const handleSubmit = () => {
    if (!title) {
      return $toast('제목을 입력하세요');
    }

    submit({ title });
  };

  return (
    <div>
      <h2>React Query</h2>

      <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="게시글 제목을 입력하세요" />
        <button onClick={() => handleSubmit()} disabled={isPending}>
          등록
        </button>
      </div>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQuery;
