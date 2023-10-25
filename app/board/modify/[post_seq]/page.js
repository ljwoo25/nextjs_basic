import connection from "@/util/carrotDB";

export default async function Modify(props) {
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
            <form action="/api/modify" method="POST">
                <input type="hidden" name="postSeq" defaultValue={result.post_seq}/>
                <input name="title" defaultValue={result.post_title}/><br/>
                <input name="content" defaultValue={result.post_content}/><br/>
                <input type="submit" value="작성"/>
            </form>
        </div>
    )
}