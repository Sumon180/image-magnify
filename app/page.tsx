"use client";

import { useState, useRef } from "react";
import ReactImageMagnify from "react-image-magnify";
import Image from "next/image"; // Import Next.js Image component

const images: string[] = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
];

function Page() {
  const [img, setImg] = useState<string>(images[0]);
  const refs = useRef<HTMLDivElement[]>([]);

  const hoverHandler = (image: string, i: number): void => {
    setImg(image);

    refs.current[i]?.classList.add("active");
    for (let j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j]?.classList.remove("active");
      }
    }
  };

  const addRefs = (el: HTMLDivElement | null): void => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="left_1">
          {images.map((image, i) => (
            <div
              className={i === 0 ? "img_wrap active" : "img_wrap"}
              key={i}
              onMouseOver={() => hoverHandler(image, i)}
              ref={addRefs}
            >
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <div className="left_2">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Magnified view",
                isFluidWidth: true,
                src: img,
              },
              largeImage: {
                src: img,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "150%",
              },
            }}
          />
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Page;
