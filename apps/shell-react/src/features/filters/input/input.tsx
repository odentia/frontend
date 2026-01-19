import React, { useEffect, useRef, useState } from "react";
import { Input } from "@ui";
import { useQueryParams } from "../../../shared/lib/searchParams";

type FilterInputProps = {
  param: string;
  placeholder: string;
  debounceMs?: number;
};

export const FilterInput = React.memo(function FilterInput({
  param,
  placeholder,
  debounceMs = 300,
}: FilterInputProps) {
  const params = useQueryParams();

  const externalValue = params.getParam(param) ?? "";
  const [value, setValue] = useState(externalValue);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  const applyParam = (nextValue: string) => {
    if (!nextValue) {
      params.removeParam(param);
    } else {
      params.setParam(param, nextValue);
    }
  };

  const handleChange = (nextValue: string) => {
    setValue(nextValue);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      applyParam(nextValue);
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
