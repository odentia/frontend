import type { GalleryBlock as GalleryBlockProps } from "../../models/types";
import { isValidUrl } from "../create/utils";

export const GalleryBlock = ({ block }: { block: GalleryBlockProps }) => {
  const { images, styles, layout = "grid" } = block;

  if (!images?.length) return null;

  if (layout === "carousel") {
    return (
      <div
        style={{
          ...styles,
          overflowX: "auto",
          display: "flex",
          gap: 8,
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={isValidUrl(img.url) ? img.url : ""}
            alt={img.alt ?? ""}
            style={{
              height: 180,
              flex: "0 0 auto",
              borderRadius: 8,
            }}
          />
        ))}
      </div>
    );
  }

  const columns = Math.min(images.length, 3);

  return (
    <div
      style={{
        ...styles,
        display: "grid",
        gap: 8,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.alt ?? ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ))}
    </div>
  );
};
