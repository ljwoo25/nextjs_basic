import connection from "@/util/carrotDB";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const db = connection.promise();
        try {
            const amount = 10;
            const rowStart = (req.query.currPage - 1) * amount;
            const query =   `
                            SELECT 
                                post_seq,
                                user_seq,
                                post_title,
                                post_content
                            FROM rain_next_post
                            WHERE post_title LIKE CONCAT('%', '${req.query.search}', '%')
                            LIMIT ${amount} OFFSET ${rowStart}
                            `;
            const [results, fields] = await db.execute(query);
            // console.log(results);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}