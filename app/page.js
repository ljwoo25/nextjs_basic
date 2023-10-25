
export default function Home() {
  return (
    <div>
      <h2>메인 화면</h2>
      <p>사용하는 DB: mariaDB</p>
      <p>사용하는 bucket: 로컬, S3</p>
      <p>사용하는 로그인: 로컬, 카카오, 네이버, 구글, 깃</p>
      <p>보여줄 기능</p>
      <ul>
        <li>게시판</li>
        <ul>
          <li>Create, Read, Update, Delete</li>
          <li>리스트, 검색, 페이지네이션</li>
          <li>댓글, 파일 업로드/다운로드</li>
          <li>찜</li>
        </ul>
        <li>유저</li>
        <ul>
          <li>회원가입</li>
          <li>로그인, 로그아웃</li>
          <li>마이페이지</li>
          <li>팔로우, 팔로잉</li>
        </ul>
        <li>기타 부가기능</li>
        <ul>
          <li>카카오맵</li>
          <li>쿠키이용한 css변경(다크 모드 등)</li>
        </ul>
        <li>설치</li>
        <ul>
          <li>초기설치</li>
          <li>버전 다운그레이드</li>
          <li>데이터베이스 연결</li>
          <li>버킷 연결</li>
          <li>같이쓰면 좋은 프로그램</li>
        </ul>
        <li>관리자</li>
        <ul>
          <li>문의사항</li>
          <li>신고</li>
          <li>권한부여</li>
        </ul>
      </ul>
    </div>
  )
}     
