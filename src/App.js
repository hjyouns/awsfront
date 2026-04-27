import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('대기 중...');
  const [error, setError] = useState(null);

  const callBackend = async () => {
    // Dockerfile에서 설정한 VITE_ 변수명을 사용하여 주소를 가져옵니다.
    // 만약 이 값이 읽히지 않으면 undefined가 발생하므로 기본값을 설정해두면 좋습니다.
    const albAddress = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

    setMessage('호출 중...');
    setError(null);

    try {
      // 주소 뒤에 /api/hello가 붙으므로, Secrets에는 끝에 / 없이 IP만 넣어야 합니다.
      const response = await fetch(`${albAddress}/api/hello`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setMessage(data);
    } catch (err) {
      setError(err.message);
      setMessage('호출 실패');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2>🚀 React Frontend -{">"} ALB -{">"} Private Backend 테스트</h2>
      <p>아래 버튼을 눌러 Private 서브넷에 있는 백엔드를 호출해 보세요.</p>

      <button
        onClick={callBackend}
        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#ff9900', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        백엔드 API 호출하기
      </button>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', display: 'inline-block', borderRadius: '8px', minWidth: '300px' }}>
        <h3 style={{ color: error ? 'red' : 'green' }}>
          {error ? '❌ 에러 발생' : '✅ 백엔드 응답'}
        </h3>
        <p style={{ fontWeight: 'bold', color: '#333' }}>{error ? error : message}</p>
      </div>
    </div>
  );
}

export default App;