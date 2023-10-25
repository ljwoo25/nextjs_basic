import connection from '@/util/carrotDB';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = connection.promise();
        try {
            const query =   `
                            INSERT INTO rain_next_comment
                            (
                                post_seq, 
                                user_seq, 
                                comment_content
                            ) 
                            VALUES 
                            (    
                                ${req.body.postSeq}, 
                                2, 
                                "${req.body.content}"
                            )
                            `
            await db.execute(query);
            res.status(200).json('댓글 작성 완료');
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}