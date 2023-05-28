import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Ride the wave of words
        <br />
        <span className="orange_gradient text-center">
          Share your thoughts through captivating text
        </span>
      </h1>
      <p className="desc text-center">
        TextWave where words flow like waves, allows users to share any kind of
        text-based content, from quotes to stories to poetry.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
