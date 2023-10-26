import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { creator, prompt, tag } = await req.json();

    try {
        await connectToDB();

        let newPrompt = new Prompt({
            creator,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create prompt.", { status: 500 });
    }
}