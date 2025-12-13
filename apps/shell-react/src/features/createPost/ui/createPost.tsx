import { Button } from "@ui/dist";
import { usePostCreate } from "../api";
import { usePageEditor } from "../../../shared/store/postCreate/postCreate";

export const CreatePostButton = ({ tags }: { tags: string[] }) => {
  const create = usePostCreate();

  const title = usePageEditor((state) => state.title);
  const pageStyles = usePageEditor((state) => state.styles);
  const blocks = usePageEditor((state) => state.blocks);
  const containers = usePageEditor((state) => state.containers);
  const rootContainer = usePageEditor((state) => state.rootContainerId);

  const handleClick = () => {
    create.mutate({
      title: title,
      tags: tags,
      pageStyles: pageStyles,
      blocksId: blocks,
      containers: containers,
      rootContainerId: rootContainer,
    });
  };

  return (
    <Button text="Создать" onClick={handleClick} width="150px" height="30px" />
  );
};
