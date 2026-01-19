import { Button } from "@ui/dist";
import { usePostCreate } from "../api";
import { usePageEditor } from "../../../shared/store/postCreate/postCreate";
import { useNavigate } from "react-router";

export const CreatePostButton = ({ tags }: { tags: string[] }) => {
  const create = usePostCreate();

  const title = usePageEditor((state) => state.title);
  const description = usePageEditor((state) => state.description);

  const navigate = useNavigate();

  const pageStyles = usePageEditor((state) => state.styles);
  const blocks = usePageEditor((state) => state.blocks);
  const containers = usePageEditor((state) => state.containers);
  const rootContainer = usePageEditor((state) => state.rootContainerId);

  const isValid = title.trim().length > 0 && description.trim().length > 0;
  const isDisabled = !isValid || create.isPending;

  const handleClick = () => {
    if (!isValid) return;

    create.mutate({
      title: title.trim(),
      description: description.trim(),
      tags,
      pageStyles,
      blocksId: blocks,
      containers,
      rootContainerId: rootContainer,
    });

    if (create.data) navigate(`/publications/${create.data.id}`);
  };

  return (
    <Button
      text={"Создать"}
      onClick={handleClick}
      width="150px"
      height="30px"
      loading={create.isPending}
      disabled={isDisabled}
    />
  );
};
