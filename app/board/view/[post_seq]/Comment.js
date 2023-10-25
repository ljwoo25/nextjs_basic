'use client'

import { useEffect, useState } from "react";

export default function Comment(props) {
    let [comment, setComment] = useState('');
    let [data, setData] = useState([]);
    let [change, setChange] = useState(1);
    
    useEffect(()=>{
        fetch('/api/comment/list?seq=' + props.seq)
        .then(res=>res.json())
        .then(r=>setData(r))
    }, [change]) // useEffect((...)=>{...}, []) 작성시 1회만 실행

    return(
        <div>
            <div>댓글목록</div>
            {   
                data.length > 0 ?
                data.map((a, i)=>
                    <div key={i}>
                        <p>
                            {a.comment_content}, {a.user_seq}
                        </p>
                        <button onClick={(e)=>{
                            let seq = a.comment_seq;
                            fetch('/api/comment/remove?seq='+seq, {
                                method : 'DELETE'
                            })
                            .then(()=>{
                                setChange(change+1)
                                console.log(change)
                            }
                            )
                        }}>🗑️</button>
                    </div>
                )
                : '댓글없음'
            }
            <input onChange={(e)=>{setComment(e.target.value)}}/>
            <button onClick={()=>{
                fetch('/api/comment/write', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: comment, 
                        postSeq: props.seq
                    })
                })
                .then(()=>{
                    setChange(change+1)
                    console.log(change)
                }
                )
                .catch(error => {
                    console.error(error);
                });
            }} >댓글전송</button>
        </div>
    )
}