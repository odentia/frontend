import {
  ContainerBlock as ContainerBlockProps,
  ContainerBlockComponentProps,
} from "../../models/types";

export const ContainerBlock = ({
  block,
  blocksById,
  renderBlock,
}: ContainerBlockComponentProps) => {
  const { direction, children, styles, sizes } = block;

  return (
    <div
      style={{
        ...styles,
        display: "flex",
        flexDirection: direction,
        gap: 16,
      }}
    >
      {children.map((childId, index) => {
        const child = blocksById[childId];
        if (!child) return null;

        const flex = sizes?.[index] ?? 1;

        return (
          <div key={childId} style={{ flex }}>
            {renderBlock(child)}
          </div>
        );
      })}
    </div>
  );
};
