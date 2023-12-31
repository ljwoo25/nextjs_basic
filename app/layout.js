import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Home',
  description: 'Generated by Rain',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
      <div className="navbar"> 
        <Link href="/" className="logo">Home</Link> 
        <Link href="/board">게시판</Link>
        <Link href="/user">유저</Link>
        {/* {
          session ?
          <span>{session.user.name}<LogoutBtn /></span> :
          <>
            <LoginBtn />&nbsp;
            <button><Link href={"/register"}>회원가입</Link></button>
          </>
        } */}
        </div>
        <hr/>
        {children}
      </body>
    </html>
  )
}
