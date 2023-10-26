import User from "@models/user";

export const GET = async (request, { params }) => {
    try {
        if (!params.userId) {
            return new Response("Profile Id is required", { status: 404 });
        }

        const data = await User.findById(params.userId);

        if (!data) {
            return new Response("No such profile with given ID found", { status: 404 })
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 500 })
    }
}