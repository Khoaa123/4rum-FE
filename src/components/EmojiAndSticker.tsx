import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmojisAndStickers } from "@/utils/api";

const EmojiAndSticker = ({ onSelect, style }: any) => {
  const [isActive, setIsActive] = useState("Voz-Bựa");

  const {
    data: urls,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["emojisAndStickers", isActive],
    queryFn: () => fetchEmojisAndStickers(isActive),
  });

  return (
    <>
      <div style={style} className="mt-5 h-40 overflow-hidden overflow-y-auto">
        <div className="flex flex-wrap justify-around gap-3" tabIndex={0}>
          <button
            className={`${
              isActive === "Voz-Bựa" &&
              "bg-gray-200 text-[#3a86ff] dark:bg-gray-800"
            } transition rounded-sm p-2`}
            onClick={() => setIsActive("Voz-Bựa")}
          >
            Voz Bựa
          </button>
          <button
            className={`${
              isActive === "Pepe" &&
              "bg-gray-200 dark:bg-gray-800 text-[#3a86ff]"
            } transition rounded-sm p-2`}
            onClick={() => setIsActive("Pepe")}
          >
            Ếch Xanh
          </button>
          <button
            className={`${
              isActive === "Pepe-Gif" &&
              "bg-gray-200 dark:bg-gray-800 text-[#3a86ff]"
            } transition rounded-sm p-2`}
            onClick={() => setIsActive("Pepe-Gif")}
          >
            Ếch Xanh Gif
          </button>
          <button
            className={`${
              isActive === "Mèo-mập" &&
              "bg-gray-200 dark:bg-gray-800 text-[#3a86ff]"
            } transition rounded-sm p-2`}
            onClick={() => setIsActive("Mèo-mập")}
          >
            Mèo mập bụng bự
          </button>
          <button
            className={`${
              isActive === "Qoobee" &&
              "bg-gray-200 dark:bg-gray-800 text-[#3a86ff]"
            } transition rounded-sm p-2`}
            onClick={() => setIsActive("Qoobee")}
          >
            Qoobee
          </button>
        </div>
        <div className="grid grid-cols-4 py-1 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading emojis and stickers</p>
          ) : (
            urls?.map((url: string) => (
              <img
                key={url}
                src={url}
                alt=""
                width={40}
                height={40}
                onClick={() => onSelect(url)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default EmojiAndSticker;
