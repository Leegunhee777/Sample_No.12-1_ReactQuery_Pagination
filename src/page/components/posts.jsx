import React from 'react';
import { useState } from "react";
import  PostDetail  from "./postDetail";

//서버에서 데이터를 가져올때 사용하는 hook이다.
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

//임의의 설정값
//해당 api가 100개를 반환할수있다고 하여 maxPage를 10으로 설정함
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();
  
  useEffect(()=> {
    
    //마지막 페이지에선, 다음페이지를 prefetching할 필요가 없으므로 조건추가
    if(currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts",nextPage], () => fetchPosts(nextPage))
    }

  },[currentPage, queryClient])

  // replace with useQuery
  /*
  첫번째 인자: query key
  두번째 인자: 데이터를 가져오는 비동기함수 명시
  { data } 에는 두번째 인자로 넣은 함수의 반환값이 들어간다.
  */
   const { data, isLoading, isError, error } = useQuery(['posts',currentPage],()=>fetchPosts(currentPage))

  if (isLoading) return <div >...로딩중</div>
  
  if (isError) return <div>...Oops, something went wrong {error.toString()}</div>

  return (
    <>
      <ul>
        {data.map((post, index) => (
          <li
            key={index}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button 
          disabled = {currentPage === 1} 
          onClick={() => {
            setCurrentPage(prev=> prev -1)
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage }</span>
        <button 
          disabled ={currentPage === maxPostPage}
          onClick={() => {
            setCurrentPage(prev=> prev + 1)
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

export default Posts