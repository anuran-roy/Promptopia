import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        const processedUrl = new URL(req.url);
        await connectToDB();

        console.log(`
        -------------------------------------
        |                                   |
        |      Rendering Profile Posts      |
        |                                   |
        -------------------------------------
        `);
        console.log("Received user Id = ", params.userid);
        console.log("Received query = ", processedUrl);
        let prompt_search_res = await Prompt.find({
            creator: params.userid
        }).populate("creator");

        // console.log("Raw result = ", prompt_search_res);

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