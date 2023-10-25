import connection from "@/util/carrotDB";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const db = connection.promise();
        try {
            const query =   `
                            SELECT 
                                count(post_seq) AS count
                            FROM rain_next_post
                            WHERE post_title LIKE CONCAT('%', '${req.query.search}', '%')
                            `;
            const [results, ] = await db.execute(query);
            const totalAmount = results[0]
            res.status(200).json(totalAmount);
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}