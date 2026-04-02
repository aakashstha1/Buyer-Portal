import React, { useEffect, useState } from "react";
import { Heart, MapPin, X } from "lucide-react";

function PropertyCard({
  title,
  price,
  location,
  image,
  description,
  variant = "default",
  onRemove,
  isLiked = false,
  onLike,
}) {
  const [liked, setLiked] = useState(isLiked);

  // update liked state
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLike = async (e) => {
    e.stopPropagation();
    setLiked(!liked);
    await onLike?.(!liked);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex hover:scale-[1.02] transition-transform hover:cursor-pointer">
      <div className="w-48 shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin size={14} className="text-amber-600" />
              {location}
            </p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-end self-stretch shrink-0">
            {variant === "favourite" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className="p-1 rounded-full hover:bg-red-50 transition"
              >
                <X size={18} className="text-red-400 hover:text-red-600" />
              </button>
            ) : (
              <button
                onClick={handleLike}
                className="p-1 rounded-full hover:bg-gray-50 transition"
              >
                <Heart
                  size={18}
                  className={
                    liked ? "fill-red-500 text-red-500" : "text-gray-300"
                  }
                />
              </button>
            )}
            <p className="text-indigo-600 font-semibold mt-auto">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
