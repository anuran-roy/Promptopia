"use client";

import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            console.log("User ID = ", session?.user.id);
            console.log("Data to send = ");
            const body = JSON.stringify({
                prompt: post.prompt,
                creator: session?.user.id,
                tag: post.tag
            });

            console.log(body);

            const response = await fetch("/api/prompt/new", {
                method: 'POST',
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        ></Form>
    )
}

export default CreatePrompt;