import React, { useEffect } from "react";
import { Input } from "@ui";
import { useQueryParams } from "../../../shared/lib/searchParams";

type FilterInputProps = {
  param: string;
  placeholder: string;
};

export const FilterInput = React.memo(function FilterInput({
  param,
  placeholder,
}: FilterInputProps) {
  const params = useQueryParams();

  const value = params.getParam(param) ?? "";

  const handleChange = (value: string) => {
    if (!value) {
      params.removeParam(param);
    } else {
      params.setParam(param, value);
    }
  };

  return (
    <Input
      value={value}
      onValueChange={handleChange}
      borderRadius="5px"
      placeholder={placeholder}
      width="100%"
      height="30px"
      color="var(--border)"
    />
  );
});
