import connection from "@/util/carrotDB"
import ListItem from "./ListItem";

export default async function List(props) {
    let page = 1;
    if(props.searchParams.currPage){
        page = props.searchParams.currPage;
    }
    let search = '';
    if (props.searchParams.search) {
        search = props.searchParams.search;
    }
    const amount = 10;
    const rowStart = (page - 1) * amount;

    const db = connection.promise();
    const query =   `
                    SELECT 
                        post_seq, 
                        user_seq, 
                        post_title, 
                        post_content
                    FROM rain_next_post
                    WHERE post_title LIKE CONCAT('%', '${search}', '%')
                    LIMIT ${amount} OFFSET ${rowStart}
                    `;
    const [results, ] = await db.execute(query);
    const [[total],] = await db.execute(`
                                        SELECT count(post_seq) AS count 
                                        FROM rain_next_post
                                        WHERE post_title LIKE CONCAT('%', '${search}', '%')
                                        `);
    let totalAmount = total.count
    // console.log("results: ", results);
    const pagePerPage = 10;
    let endPage = Math.ceil((page * 1.0) / pagePerPage) * pagePerPage;
    let startPage = endPage - (pagePerPage - 1);
    let realEndPage = Math.ceil( (totalAmount * 1.0) / amount );
    let pageitems = [];
    for ( let i = startPage; i <= (endPage > realEndPage? realEndPage : endPage); i++ ) {
        pageitems.push(i);
    }

    let pagenation = {
        first: 1,
        prev: startPage > 1,
        items: pageitems,
        next: endPage < realEndPage,
        last: realEndPage
    }

    
    return(
        <div>
            <ListItem results={results} pagenation={pagenation} currPage={page} search1={search}/>
        </div>
    )
}