// 3 methods:
// 1. GET - read
// 2. PATCH - edit
// 3. DELETE - delete

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        const processedUrl = new URL(req.url);
        await connectToDB();

        console.log("Received query = ", processedUrl);
        let prompt_search_res = await Prompt.findById(params.promptid).populate("creator");

        console.log("Raw result = ", prompt_search_res);

        if (!prompt_search_res) {
            return new Response("Prompt not found.", { status: 404 })
        }
        prompt_search_res = JSON.stringify(prompt_search_res);

        console.log("\nSearch results = \n");
        console.log(prompt_search_res);

        return new Response(prompt_search_res, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return new Response("Internal server error occured", { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        let existingPrompt = await Prompt.findById(params.promptid);

        if (!existingPrompt) {
            return new Response("No prompt found.", { status: 404 });
        }

        existingPrompt.tag = tag;
        existingPrompt.prompt = prompt;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        console.log(error);
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.promptid);

        return new Response("Prompt Deleted successfully", { status: 200 });

    } catch (error) {
        console.log(error);

        return new Response("Internal error", { status: 500 });
    }
}