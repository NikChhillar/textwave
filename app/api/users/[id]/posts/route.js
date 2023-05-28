import { connectToDb } from "@utils/database";
import Text from "@models/text";

export const GET = async (req, { params }) => {
    try {
        await connectToDb()
        const posts = await Text.find({ creator: params.id }).populate('creator')

        return new Response(JSON.stringify(posts), { status: 200 })

    } catch (error) {
        return new Response('Failed to get posts', { status: 500 })
    }
}