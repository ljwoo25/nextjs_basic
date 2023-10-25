import connection from '@/util/carrotDB';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const db = connection.promise();
        try {
            const query =   `
                            DELETE FROM rain_next_post 
                            WHERE post_seq = ${req.query.seq}
                            `
            await db.execute(query);
            res.redirect(302, '/board/list');
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}