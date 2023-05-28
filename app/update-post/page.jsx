"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const UpdatePost = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    text: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        text: data.text,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Post Id is missing");

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: post.text,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  //
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default UpdatePost;
