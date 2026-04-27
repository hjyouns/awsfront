import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('대기 중...');
  const [error, setError] = useState(null);

  const callBackend = async () => {
    // CRA 환경 변수 읽기 방식 (process.env)
    const albAddress = process.env.REACT_APP_API_BASE_URL;
    
    setMessage('호출 중...');
    setError(null);

    try {
      // albAddress가 제대로 설정되었는지 확인하며 호출
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