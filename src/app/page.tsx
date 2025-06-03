import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Post } from '@/types/post';
import PostList from '@/components/PostList';
import CreatePostModal from "@/components/CreatePostModal";

export const dynamic = 'force-dynamic'; // ⬅️ SSR (запобігає кешуванню)

const HomePage = async () => {
    let posts: Post[] = [];

    try {
        const snapshot = await getDocs(collection(db, 'posts'));
        posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Post, 'id'>),
        }));
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">React Blog</h1>

            <section className="mb-10">
                <CreatePostModal />
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">All Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts available.</p>
                ) : (
                    <PostList posts={posts} />
                )}
            </section>
        </main>
    );
};

export default HomePage;