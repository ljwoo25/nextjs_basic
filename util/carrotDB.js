import { createConnection } from 'mysql2';

const connection = createConnection({ // 호출할 변수명 지정
  host: '112.220.19.36', // MariaDB 호스트 주소
  user: 'carrot', // 데이터베이스 사용자 이름
  password: 'carrot2023', // 데이터베이스 암호
  database: 'carrot', // 사용할 데이터베이스 이름
});

connection.connect((err) => {
    if (err) {
    console.error('Database connection failed: ', err);
    } else {
    console.log('Connected to the database');
    }
});

export default connection;