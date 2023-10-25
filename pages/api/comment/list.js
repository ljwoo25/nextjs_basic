import connection from '@/util/carrotDB';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const db = connection.promise();
        try {
            const query =   `
                            SELECT 
                                comment_seq, 
                                user_seq, 
                                comment_content
                            FROM rain_next_comment 
                            WHERE post_seq = ${req.query.seq}
                            `
            const [results, ] = await db.execute(query);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}