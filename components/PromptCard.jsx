"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
    usePathname, useRouter
} from 'next/navigation';

import React from 'react'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    console.log("Received prompt data = ");
    console.log(post);

    const handleCopy = (_) => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }

    const { data: session } = useSession();
    const pathName = usePathname();
    const [copied, setCopied] = useState("");
    return (
        <div className='prompt_card'>
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        className="rounded-full object-contain"
                        alt="creator_image"
                        height={40}
                        width={40}
                    />
                    <a className="flex flex-col" href={`/profile/${post.creator?._id}?name=${post.creator?.username}`}>
                        <h3 className="font-satoshi font-semibold text-gray-900">{post.creator?.username}</h3>
                        <p className="font-inter text-sm text-gray-500">{post.creator?.email}</p>
                    </a>
                </div>
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        width={12}
                        height={12}
                        alt="Copy prompt"
                    ></Image>
                </div>
            </div>
            <p
                className="my-4 text-sm font-satoshi text-gray-700"
            >
                {post.prompt}
            </p>
            <p
                className="font-inter blue_gradient cursor-pointer text-sm"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>
            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default PromptCard;