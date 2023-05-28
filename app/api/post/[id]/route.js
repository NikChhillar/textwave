import { connectToDb } from "@utils/database";
import Text from "@models/text";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const post = await Text.findById(params.id).populate("creator");

    if (!post) return new Response("Post not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { text, tag } = await req.json();

  try {
    await connectToDb();

    const existingPost = await Text.findById(params.id);

    if (!existingPost) return new Response("Post not found", { status: 404 });

    existingPost.text = text;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response("Updated Successfully", { status: 200 });
  } catch (e) {
    return new Response("Error while Updating", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();

    await Text.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error while deleting", { status: 500 });
  }
};
