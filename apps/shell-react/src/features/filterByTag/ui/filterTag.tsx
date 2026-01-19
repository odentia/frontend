import React from "react";
import { useNavigate } from "react-router";

import { Tag } from "../../../entities/tag/ui";
import { useQueryParams } from "../../../shared/lib/searchParams";
import styles from "./filterTag.module.scss";

export const FilterTag = ({
  label,
  mode = "toggle",
  className,
}: TagFilterChipProps) => {
  const params = useQueryParams();
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    let nextTags = "";

    if (mode === "replace") {
      nextTags = label;
    } else if (mode === "add") {
      const cur = params.getParam("tags");
      const list = cur ? cur.split(",").filter(Boolean) : [];
      if (!list.includes(label)) list.push(label);
      nextTags = list.join(",");
    } else {
      const cur = params.getParam("tags");
      const list = cur ? cur.split(",").filter(Boolean) : [];
      const set = new Set(list);

      if (set.has(label)) set.delete(label);
      else set.add(label);

      nextTags = Array.from(set).join(",");
    }

    const qs = nextTags ? `?tags=${encodeURIComponent(nextTags)}` : "";
    navigate(`/publications${qs}`);
  };

  const selected = params.getAll("tags").includes(label);

  return (
    <span
      className={`${styles.container} ${selected ? styles.containerActive : ""}`}
      onClick={onClick}
      role="button"
    >
      <Tag label={label} className={className} />
    </span>
  );
};
