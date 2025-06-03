'use client';
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deletePost } from '@/redux/slices/postsSlice';
import {Post} from "@/types/post";
import {deleteDoc} from "@firebase/firestore";
import {doc} from "firebase/firestore";
import {db} from "@/firebaseConfig";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            dispatch(deletePost(id));

            router.refresh();
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded">
                    <Link href={`/posts/${post.id}`}>
                        <h3 className="text-xl font-semibold hover:underline cursor-pointer">{post.title}</h3>
                    </Link>
                    <p>{post.content.slice(0, 100)}...</p>
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="mt-2 text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </div>
    );
};

export default PostList;