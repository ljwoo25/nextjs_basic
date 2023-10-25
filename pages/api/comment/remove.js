import connection from '@/util/carrotDB';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const db = connection.promise();
        try {
            const query =   `
                            DELETE FROM rain_next_comment 
                            WHERE comment_seq = ${req.query.seq}
                            `
            await db.execute(query);
            res.status(200).json('댓글삭제완료');
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}