import blogPicture from "../../../public/images/blog-image.avif";

export const parseContent = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // extract the first image
  const firstImage = doc.querySelector("img");
  let coverImageSrc = blogPicture.src; // set the first image as the default image

  if (firstImage) {
    coverImageSrc = firstImage.src;
  }

  const images = doc.querySelectorAll("img");
  images.forEach((img) => img.remove());

  // get only the written content without the images
  const remainingContent = doc.body.innerHTML;

  return { coverImageSrc, remainingContent };
};