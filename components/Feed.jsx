"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => {
                console.log(post);
                return (<PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={(_) => handleTagClick(post.tag)}
                />);
            }
            )}
        </div>
    )
}


const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchPosts = async (searchQuery) => {
        const queryString = new URLSearchParams({ query: searchQuery });
        let queryUrl = `/api/prompt?${queryString}`;

        console.log("Query URL = ", queryUrl);
        const response = await fetch(queryUrl, { method: "GET" });

        const json_response = await response.json();

        // return json_response;

        try {
            setPosts(json_response);
        } catch (error) {
            console.log(error);
        }
    }

    const triggerSearchByTag = (tagName) => {
        setSearchText(tagName);
    }

    useEffect(
        () => {
            // const fetchPosts = async () => {
            //     const response = await fetch("/api/prompt");
            //     const data = await response.json();

            //     setPosts(data);
            // }
            console.log("Receiving posts...");
            fetchPosts("");
            console.log("Received posts, setting data...")
        }, []);

    useEffect(
        () => {
            // const fetchPosts = async () => {
            //     const response = await fetch("/api/prompt");
            //     const data = await response.json();

            //     setPosts(data);
            // }
            console.log("Receiving posts...");
            fetchPosts(searchText);
            console.log("Received posts, setting data...")
        }, [searchText]);


    const handleSearchChange = (e) => {
        console.log("Setting s")
        setSearchText(e.target.value);
    }

    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center">
                <input
                    type="text"
                    value={searchText}
                    placeholder="Search for a prompt, tag or username here"
                    className="search_input peer"
                    onChange={handleSearchChange}
                />
            </form>

            <PromptCardList data={posts} handleTagClick={triggerSearchByTag} />
        </section>
    )
}

export default Feed