
import React from 'react'
import { Button } from "flowbite-react";


export default function PostPreview({ post, refetch }: { post: any, refetch: () => any }): JSX.Element {
//  const [deletePost, { loading, called, error }] = useMutation<DeletePostMutation>(DELETE_POST)

  const handleDelete = async () => {
    try {
      // do something
    } catch (error) {
      console.error('error:', error)
    }
  }

  return (
    <div className="flex items-center justify-between gap-x-2 w-full p-4 border border-gray-200 rounded-md">
      <div>
        <h2 className="text-xl font-bold">{post?.title}</h2>
        <p className="text-stone-400 line-clamp-3">{post?.content}</p>
      </div>
      <div className="flex flex-row gap-x-3">
        {/* <Link href={`/admin/edit/${post?.id}`}> */}
        <Button color="primary" size="sm" >
          Edit
        </Button>
        <Button color="danger" size="sm" onClick={handleDelete} >
          Delete
        </Button>
      </div>
    </div>
  )
}
