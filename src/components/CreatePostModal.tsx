'use client';

import React from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addPost } from "@/redux/slices/postsSlice";
import { Post } from "@/types/post";

const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

const CreatePostModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const openPostModal = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create New Post',
            html:
            `<div class="flex justify-center flex-col">
               <input id="swal-title" class="swal2-input" placeholder="Title">` +
              `<textarea id="swal-content" class="swal2-textarea" placeholder="Content"></textarea>,
            </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Post',
            preConfirm: () => {
                const title = (document.getElementById('swal-title') as HTMLInputElement).value;
                const content = (document.getElementById('swal-content') as HTMLTextAreaElement).value;

                try {
                    postSchema.parse({ title, content });
                    return { title, content };
                } catch (err) {
                    if (err instanceof z.ZodError) {
                        Swal.showValidationMessage(err.errors[0].message);
                    } else {
                        Swal.showValidationMessage("Unknown validation error.");
                    }
                    return false;
                }
            }
        });

        if (formValues) {
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    title: formValues.title,
                    content: formValues.content,
                    comments: [],
                });

                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const newPost = {
                        id: docSnap.id,
                        ...docSnap.data(),
                    };

                    dispatch(addPost(newPost as Post));
                }

                router.refresh();
                Swal.fire("Success!", "Your post has been added.", "success");
            } catch (error) {
                console.error("Error adding post:", error);
                Swal.fire("Error", "Failed to add post.", "error");
            }
        }
    };

    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
            <button
                onClick={openPostModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Open Post Form
            </button>
        </section>
    );
};

export default CreatePostModal;
