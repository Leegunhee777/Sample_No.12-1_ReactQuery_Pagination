import { useQuery, useMutation } from 'react-query';
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

const PostDetail = ({ post }) => {
  // replace with useQuery
  // const data = [];
  console.log(post.id)
  const { data, isLoading, isError, error } = useQuery(['comments', post.id],() => fetchComments(post.id),{
    staleTime:3000
  })


  const deleteMutation = useMutation((postId) => deletePost(postId))
  const updateMutation = useMutation((postId) => updatePost(postId))
  if (isLoading) return <div >...로딩중</div> 
  
  if (isError) return <div>...Oops, something went wrong {error.toString()}</div>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=> deleteMutation.mutate(post.id)}>Delete</button> 
      {deleteMutation.isError && (
        <p style={{color:'red'}}> Error deleting the post</p>
      )}
      
      {deleteMutation.isLoading && (
        <p style={{color:'purple'}}>Deleting the post</p>
      )}

      {deleteMutation.isSuccess && (
        <p style={{color: 'green'}}>Post has (not) been deleted</p>
      )}
      
      
      {updateMutation.isError && (
        <p style={{color:'red'}}> Error update the post</p>
      )}
      
      {updateMutation.isLoading && (
        <p style={{color:'purple'}}>updating the post</p>
      )}

      {updateMutation.isSuccess && (
        <p style={{color: 'green'}}>Post has (not) been updated</p>
      )}
      
      <button onClick={()=> updateMutation.mutate(post.id)}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}

export default PostDetail