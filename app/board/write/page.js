'use client'
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Write() {
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [selectFiles, setSelectFiles] = useState([]);
    let router = useRouter();

    return(
        <div>
            <form action="/api/write" method="POST">
                <input name="title" placeholder="제목을 입력해주세요" onChange={e=>setTitle(e.target.value)} /><br/>
                <input name="content" placeholder="내용을 입력해주세요" onChange={e=>setContent(e.target.value)} /><br/>
                <input type="submit" value="작성"/>
            </form>
            <hr/>
            <div>
                <input type="file" multiple onChange={e=>{
                    const files = e.target.files;
                    const newFiles = [...selectFiles];
                    for (let i = 0; i < files.length; i++) {
                        newFiles.push(files[i]);
                    }
                    setSelectFiles(newFiles)
                }} />
                <button onClick={()=>{
                    if (selectFiles) {
                        let formData = new FormData();
                        for (let i = 0; i < selectFiles.length; i++) {
                            formData.append('file', selectFiles[i]);
                        }
                        formData.append('title', title);
                        formData.append('content', content);

                        fetch('/api/write', {
                            method: 'POST',
                            body: formData
                        })
                        .then(res => {
                            if (res.ok) {
                                res.json()
                            } else {
                                alert('오류');
                                return;
                            }
                        }
                        )
                        .then(() => {
                            alert('성공');
                            router.push('/board/list');
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    } else {
                        alert('파일을 선택해주세요');
                    }
                }}>fetch로 제출</button>
            </div>
        </div>
    )
}