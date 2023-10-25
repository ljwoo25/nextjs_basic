import connection from '@/util/carrotDB';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = connection.promise();
        try {
            const query =   `
                            UPDATE rain_next_post 
                            SET 
                                post_title = '${req.body.title}', 
                                post_content = '${req.body.content}'
                            WHERE
                                post_seq = ${req.body.postSeq}
                            `
            await db.execute(query);
            res.redirect(302, '/board/view/'+req.body.postSeq);
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}