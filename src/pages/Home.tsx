const Home = () => {
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
    </div>
  );
};

export default Home;
