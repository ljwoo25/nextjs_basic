import connection from "@/util/carrotDB"
import Link from "next/link";
import Comment from "./Comment";

export default async function View(props){
    const db = connection.promise();
    const query =   `
                    SELECT *
                    FROM rain_next_post
                    WHERE post_seq = ${props.params.post_seq}
                    `;
    const [results, fields] = await db.execute(query);
    const result = results[0];
    return(
        <div>
            <p>작성자 번호: {result.user_seq}</p>
            <p>제목: {result.post_title}</p>
            <p>내용: {result.post_content}</p>
            <Link href={`/board/modify/${result.post_seq}`}>✏️</Link>
            <Link href={`/board/delete/${result.post_seq}`}>🗑️</Link>
            <Comment seq={props.params.post_seq}/>
        </div>
    )
}