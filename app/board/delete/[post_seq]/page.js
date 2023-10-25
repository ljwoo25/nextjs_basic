'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Delete(props) {
    let [done, setDone] = useState(null);
    useEffect(()=>{
        fetch('/api/remove?seq='+ props.params.post_seq, {method: 'DELETE'})
        .then(()=>{setDone('완료')})
    },[]);

    return(
        <div>
            {
            done !=null && <Link href='/board/list'>리스트로 이동</Link>
            }
        </div>
    )
}