import Text from "@models/text";
import { connectToDb } from "@utils/database";

export const POST = async (request) => {
  const { userId, text, tag } = await request.json();

  try {
    await connectToDb();
    const newPost = new Text({ creator: userId, text, tag });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
