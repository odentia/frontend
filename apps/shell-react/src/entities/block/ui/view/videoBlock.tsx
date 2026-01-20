import type { VideoBlock as VideoBlockProps } from "../../models/types";
import { isValidUrl } from "../create/utils";

export const VideoBlock = ({ block }: { block: VideoBlockProps }) => {
  const {
    url,
    autoplay = false,
    loop = false,
    muted = false,
    borderRadius = 0,
    styles,
  } = block;

  return (
    <div style={styles}>
      <video
        src={isValidUrl(url) ? url : ""}
        controls
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: borderRadius,
        }}
      />
    </div>
  );
};
