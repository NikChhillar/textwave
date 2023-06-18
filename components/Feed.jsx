"use client";

import { useState, useEffect } from "react";
import TextCard from "./TextCard";

//

const TextCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p) => (
        <TextCard key={p._id} post={p} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

//
const Feed = () => {
  //

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post", {
        next: {
          revalidate: 10,
          cache: "no-store",
        },
      });
      const data = await response.json();

      console.log("data" + data);
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPosts = (searchText) => {
    const regularExp = new RegExp(searchText, "i");

    return allPosts.filter(
      (item) =>
        regularExp.test(item.creator.username) ||
        regularExp.test(item.text) ||
        regularExp.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(() => {
      const searchRes = filterPosts(e.target.value);
      setSearchedResults(searchRes);
    }, 500);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchRes = filterPosts(tagName);
    setSearchedResults(searchRes);
  };
  //
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search here...."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <TextCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <TextCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
