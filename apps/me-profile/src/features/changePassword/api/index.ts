import { useApi } from "@config-runtime";
import { ChangePassword, ChangePasswordProps } from "../models";

type ApiError = { message?: string; code?: string };

export function useChangePassword({ onError, onSuccess }: ChangePasswordProps) {
  const api = useApi().useAuthedMutation<
    unknown,
    ChangePassword,
    unknown,
    ApiError
  >("profile/change-password", "post", [], {
    onError: (error) => onError(error.message || "Неизвестная ошибка"),
    onSuccess: onSuccess,
  });
  return api;
}
