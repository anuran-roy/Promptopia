"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
    // const router = useRouter();


    const params = useParams();
    const userId = params.profileid;
    const searchParams = useSearchParams();

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            setUserPosts(data);
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    console.log("Profile name = ", searchParams.get("name"));
    return (
        <Profile
            name={searchParams.get("name")}
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={userPosts}
            handleEdit={() => { }}
            handleDelete={() => { }}
        />
    );
};

export default UserProfile;