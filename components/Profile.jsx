import TextCard from "./TextCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {capitalizeFirstLetter(name)} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((p) => (
          <TextCard
            key={p._id}
            post={p}
            handleEdit={() => handleEdit && handleEdit(p)}
            handleDelete={() => handleDelete && handleDelete(p)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
