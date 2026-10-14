import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState([]);
  const [image, setImage] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const newPost = {
      title,
      description,
      image,
    };

    setPost((prev) => [...prev, newPost]);

    setTitle("");
    setDescription("");
    setImage("");
  }

  function delHandler(index) {
    setPost((prev) => prev.filter((_, i) => i !== index));
  }

  function editHandler(index) {
    const selectedPost = post[index];

    setTitle(selectedPost.title);
    setDescription(selectedPost.description);
    setImage(selectedPost.image || "");

    setPost((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="relative min-h-screen w-full p-6 text-[#5A3E36] selection:bg-[#FFD1DC] font-sans">
      {/* Background Image with Controlled Opacity */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/94/74/58/9474588499f690a868a7fd252fe09fb9.jpg')",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 w-full max-w-[1600px] mx-auto">
        {/* Fixed Form Section */}

        <form
          onSubmit={submitHandler}
          className="group relative flex w-full md:w-[320px] lg:w-[360px] flex-col gap-4 p-6 rounded-sm shadow-xl border border-[#F3B0C3]/60 backdrop-blur-md md:fixed md:top-6 md:left-6 md:z-20 md:h-[calc(100vh-3rem)] overflow-y-auto overscroll-contain bg-gradient-to-br from-[#FFF5F6]/95 via-[#FFEBF0]/95 to-[#FFD8E4]/95 transition-all duration-500"
        >
          {/* Hover Background Image Layer */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none "
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/94/74/58/9474588499f690a868a7fd252fe09fb9.jpg')",
            }}
          />

          {/* Form Content (z-10 layer taakay inputs/text image ke upar rahein) */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#F3B0C3]/50 pb-3">
              <h2 className="text-xl font-bold text-[#6D4236]">
                ✨ Create Task
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[#8A5A4D]">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[#8A5A4D]">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Enter post description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-[#8A5A4D]">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
                className="w-full px-3 py-2 bg-white/80 border border-[#F3B0C3] rounded-sm focus:ring-2 focus:ring-[#FFB6C1] focus:outline-none text-sm"
              />

              {image && (
                <div className="relative mt-2">
                  <img
                    src={image}
                    alt="Task preview"
                    className="w-full h-32 object-cover rounded-sm border border-[#F3B0C3]/70"
                  />

                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="mt-2 text-xs font-bold text-[#8A5A4D] hover:text-red-500 cursor-pointer"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="relative overflow-hidden flex-1 bg-gradient-to-r from-[#FFB6C1] to-[#FF94A8] text-white font-bold py-1.5 px-3 rounded-sm transition-all text-xs cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-white/30 before:transition-transform before:duration-500"
            >
              Add To List
            </button>
          </div>
        </form>

        {/* Dynamic Cards Layout (3 columns on desktop) */}
        <div className="w-full md:ml-[340px] lg:ml-[380px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-start">
          {post.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-5 rounded-sm border border-[#F3B0C3]/70 shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.2 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FFB6C1]/30 hover:border-[#FF85A1]"
            >
              {/* Background Image Layer (With Controlled Opacity) */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 z-0 pointer-events-none group-hover:scale-110 transition-all duration-500"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/736x/81/b0/cb/81b0cb1fc1d8d5b7bd8a33950d9ecc71.jpg')",
                }}
              />

              {/* Light Color Tint Overlay for Contrast */}
              {/* <div className="absolute inset-0 bg-white/30 z-0 pointer-events-none" /> */}

              {/* Card Content (z-10 layer for maximum sharpness) */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-sm mb-3 border border-[#F3B0C3]/50"
                    />
                  )}

                  <h1 className="text-lg font-bold text-[#5B372C] break-words line-clamp-2 leading-snug">
                    {item.title}
                  </h1>
                  <p className="text-sm text-[#7D5347] mt-2 whitespace-pre-wrap break-words leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F3B0C3]/50">
                  <button
                    className="relative overflow-hidden flex-1 bg-gradient-to-r from-[#FFB6C1] to-[#FF94A8] text-white font-bold py-1.5 px-3 rounded-sm transition-all text-xs cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-white/30 before:transition-transform before:duration-500"
                    onClick={(e) => editHandler(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="relative overflow-hidden flex-1 bg-gradient-to-r from-[#FFB6C1] to-[#FF94A8] text-white font-bold py-1.5 px-3 rounded-sm transition-all text-xs cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-white/30 before:transition-transform before:duration-500"
                    onClick={(e) => delHandler(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
