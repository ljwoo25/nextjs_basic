import connection from '@/util/carrotDB';
import {IncomingForm} from "formidable";
import path from "path";
import fs from "fs/promises"; 

export const config = {
    api: {
    bodyParser: false,  //next에서는 기본으로 bodyParser가 작동되므로 false로 해준다.
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = connection.promise();
        try {
            await db.beginTransaction();
            const filePath = path.join(process.cwd(), "public/images");
            try {
                await fs.readdir(filePath);
            } catch {
                await fs.mkdir(filePath, {recursive: true});
            }

            const options = {
                uploadDir: filePath,
                multiple: true,
                filename: (name, ext, path, form) => path.originalFilename
            };
            const form = new IncomingForm(options);
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    await db.rollback();
                    return res.status(500).json({ error: "파일 업로드 및 파싱 중 오류 발생" });
                }
                const query =   `
                            INSERT INTO rain_next_post 
                            (
                                user_seq, 
                                post_title, 
                                post_content
                            ) 
                            VALUES 
                            (
                                1, 
                                "${fields.title}", 
                                "${fields.content}"
                            )
                            `
                await db.execute(query);
                await db.commit();
                // res.redirect(302, '/board/list');
                return res.status(200).json({ message: "OK" });
            });
            
        } catch (error) {
            await db.rollback();
            console.error('Error', error);
            res.status(500).json({error: 'Server Error'});
        }
    } else {
        res.status(405).end();
    }
}