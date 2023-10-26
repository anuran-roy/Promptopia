import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

const processSearch = async (searchString) => {

    const creatorId = await User.findOne({ username: searchString })._id;

    console.log("Found creator", creatorId);
    if (searchString.trim() === "") {
        return {};
    }
    return {
        $or: [
            {
                prompt: {
                    $regex: searchString,
                    $options: 'i'
                }
            },
            {
                tag: {
                    $regex: searchString,
                    $options: 'i'
                }
            },
            {
                "creator.username": {
                    $regex: searchString,
                    $options: 'i'
                }
            },
        ]
    }
}

export const GET = async (req) => {
    try {
        const processedUrl = new URL(req.url);
        await connectToDB();

        console.log("Received query = ", processedUrl);

        const searchQuery = processedUrl.searchParams.get("query");
        let prompt_search_res = await Prompt.find(await processSearch(searchQuery)).populate("creator");

        console.log("Raw result = ", prompt_search_res);

        prompt_search_res = prompt_search_res ? JSON.stringify(prompt_search_res) : JSON.stringify([])
        console.log("\nSearch results = \n");
        console.log(prompt_search_res);

        return new Response(prompt_search_res, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
}