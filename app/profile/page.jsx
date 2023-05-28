"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  //
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, []);

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (p) => {
    router.push(`/update-post?id=${p._id}`);
  };

  const handleDelete = async (p) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${p._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = myPosts.filter((i) => i._id !== p._id);

        setMyPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //
  return (
    <Profile
      name="My"
      desc="Unveil your identity and showcase your journey on your profile page, where words become a gateway to share your thoughts, engage with others, and leave a lasting impression in the realm of Textwave"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
