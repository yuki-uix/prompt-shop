"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${
                i === selected
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
