'use client'

import { useState } from "react";

export default function ListItem({results, pagenation, currPage, search1}) {
    let [search, setSearch] = useState(search1);
    let [result, setResult] = useState(results);
    let [pageTag, setPageTag] = useState(
        <div>
        <a href={"/board/list?currPage=1&search="+search}>처음&nbsp;&nbsp;</a> 
        {pagenation.prev?<a href={"/board/list?currPage="+(pagenation.items[0]-1)+"&search="+search}>이전&nbsp;&nbsp;</a>:<></>}
        {
            pagenation.items.map((a, i)=>{
                return(
                    <span key={i}>
                        <a href={"/board/list?currPage="+a+"&search="+search}>{a}</a>&nbsp;&nbsp;
                    </span>
                )
            })
        }
        {pagenation.next?<a href={"/board/list?currPage="+(pagenation.items[pagenation.items.length-1]+1)+"&search="+search}>다음&nbsp;&nbsp;</a>:<></>}
        <a href={"/board/list?currPage="+pagenation.last+"&search="+search}>마지막임</a>
        </div>
    );
    
    function list(r) {
        return(
            r.map((a, i)=>
                <div key={i}>
                    <a href={"/board/view/"+a.post_seq}>{a.post_title}</a>
                    <p>{a.post_content}</p>
                    <hr/>
                </div>
            )
        )
    }

    function searchFunc(s, p) {
        fetch('/api/search?currPage='+p+'&search='+s)
        .then(res => res.json())
        .then(async r => {
            setResult(r);
            let amount = 10;
            let response = await fetch('/api/searchAmount?search='+s).then(res=>res.json());
            let totalAmount = response.count
            const pagePerPage = 10;
            let endPage = Math.ceil((p * 1.0) / pagePerPage) * pagePerPage;
            let startPage = endPage - (pagePerPage - 1);
            let realEndPage = Math.ceil( (totalAmount * 1.0) / amount );
            let pageitems = [];
            for ( let i = startPage; i <= (endPage > realEndPage? realEndPage : endPage); i++ ) {
                pageitems.push(i);
            }
            let paging = {
                            first: 1,
                            prev: startPage > 1,
                            items: pageitems,
                            next: endPage < realEndPage,
                            last: realEndPage
                        }
            setPageTag(
                <div>
                <a href={"/board/list?currPage=1&search="+s}>처음&nbsp;&nbsp;</a> 
                {paging.prev?<a href={"/board/list?currPage="+(paging.items[0]-1)+"&search="+s}>이전&nbsp;&nbsp;</a>:<></>}
                {
                    paging.items.map((a, i)=>{
                        return(
                            <span key={i}>
                                <a href={"/board/list?currPage="+a+"&search="+s}>{a}</a>&nbsp;&nbsp;
                            </span>
                        )
                    })
                }
                {paging.next?<a href={"/board/list?currPage="+(paging.items[paging.items.length-1]+1)+"&search="+s}>다음&nbsp;&nbsp;</a>:<></>}
                <a href={"/board/list?currPage="+paging.last+"&search="+s}>마지막임</a>
                </div>
            )
        })
    }

    return (
        <div>
            {/* 검색 */}
            <input name="search" placeholder="검색할 내용을 입력해주세요." onChange={(e)=>{searchFunc(e.target.value, currPage)}}
            defaultValue={search !== ''?search:undefined} onInput={e=>setSearch(e.target.value)}/>
            <button onClick={() => {
                searchFunc(search, currPage)
            }}>검색</button>
            
            {/* 작성 */}
            <a href="/board/write"><button>작성</button></a>

            {/* 리스트 */}
            {list(result)}

            {/* 페이지네이션 */}
            {pageTag}
        </div>
    )
}