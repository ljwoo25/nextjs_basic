import Link from "next/link";

export default function Board() {
    return(
        <div>
            <p><Link href="/board/list">리스트</Link></p>
            <p><Link href="/board/write">작성</Link></p>
            <p><Link href="/board/view/1">읽기(1번게시물)</Link></p>
            <p style={{color: 'blue'}}>수정과 삭제는 상세화면에서 동작</p>
        </div>
    )
}