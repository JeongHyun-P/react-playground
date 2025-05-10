const Home = () => {
  const onClickGetRequest = async () => {
    try {
      const data = await $get<{ id: number; title: string }>('common/app/version');
      // const data = await $get<{ id: number; title: string }>('user');
      console.log('API 응답:', data);
    } catch (err: any) {
      console.error('API 오류:', err.message);
    }
  };

  const onClickSetToken = async () => {
    try {
      await $post('common/token', { id: 4 });
    } catch (err: any) {
      console.error('API 오류:', err.message);
    }
  };

  const onClickUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        await $post('common/upload', formData);
      } catch (err) {
        console.error('업로드 실패:', err);
      } finally {
        input.remove();
      }
    };

    input.click();
  };

  return (
    <div>
      <button onClick={() => $toast('토스트!')}>toast</button>
      <button onClick={() => $alert('알러트!', () => console.log('확인'))}>alert</button>
      <button
        onClick={() =>
          $confirm(
            '컨펌!',
            () => console.log('삭제됨'),
            () => console.log('취소됨')
          )
        }
      >
        confirm
      </button>
      <button onClick={() => onClickGetRequest()}>get request</button>
      <button onClick={() => onClickSetToken()}>set token</button>
      <button onClick={() => onClickUpload()}>upload file</button>
    </div>
  );
};

export default Home;
