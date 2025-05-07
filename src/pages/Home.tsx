const Home = () => {
  const onClickGetRequest = async() => {
    try {
      const data = await $get<{ id: number; title: string }>('common/app/version');
      // const data = await $get<{ id: number; title: string }>('user');
      console.log('API 응답:', data);
    } catch (err: any) {
      console.error('API 오류:', err.message);
    }
  }

  const onClickSetToken = async() => {
    try {
      await $post('common/token', { id: 4 });
    } catch (err: any) {
      console.error('API 오류:', err.message);
    }
  }

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
    </div>
  );
};

export default Home;
