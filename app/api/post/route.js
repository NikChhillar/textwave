import { connectToDb } from "@utils/database";
import Text from "@models/text";

export const GET = async (req) => {
    try {
        await connectToDb()
        const posts = await Text.find({}).populate('creator')

        return new Response(JSON.stringify(posts), { status: 200 })

    } catch (error) {
        return new Response('Failed to get posts', { status: 500 })
    }
}