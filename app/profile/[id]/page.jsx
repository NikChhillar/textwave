"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import React from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();

  const userName = searchParams.get("name");
  const [userposts, setUserposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserposts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page, a canvas that reflects ${userName}'s unique story, passions, and connections within the vibrant community of Textwave`}
      data={userposts}
    />
  );
};

export default UserProfile;
