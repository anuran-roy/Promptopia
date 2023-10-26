"use client";

import React from 'react'
import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    // const { data: session } = useSession();

    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${postId}`);

            const postData = await res.json();

            setPost({
                prompt: postData.prompt,
                tag: postData.tag
            });
        }

        if (postId) {
            getPromptDetails();
        }
    }, [postId])

    const editPrompt = async (e) => {
        e.preventDefault();

        if (!postId) {
            return alert("No post ID found!");
        }
        setSubmitting(true);

        try {
            // console.log("User ID = ", session?.user.id);
            console.log("Data to send = ");
            const body = JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            });

            console.log(body);

            const response = await fetch(`/api/prompt/${postId}`, {
                method: 'PATCH',
                body: body
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false)
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        ></Form>
    )
}

export default EditPrompt;