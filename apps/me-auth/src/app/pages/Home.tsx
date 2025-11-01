import { useThemeHandle } from "@ui";

export const Home = () => {
  const { setVar } = useThemeHandle();

  return (
    <div onClick={() => setVar("background-color", "#000000")}>
      It`s auth module
    </div>
  );
};
