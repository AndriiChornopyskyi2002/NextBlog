'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Post } from '@/types/post';

const PostDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'posts', id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() } as Post);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPost().then(() => {});
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!post) return <p>Post not found</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <button
                onClick={() => router.back()}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700">{post.content}</p>
        </div>
    );
};

export default PostDetailPage;