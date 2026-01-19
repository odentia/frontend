import React, { useEffect, useMemo, useRef, useState } from "react";

type AvatarUser = {
  id: string;
  name: string;
  avatar: string;
  description?: string;
};

type AvatarProps = {
  userId: string;

  src: string;
  alt?: string;
  size?: number;

  loadUser: (userId: string) => Promise<AvatarUser>;

  onOpen?: (userId: string) => void;
  onClose?: () => void;
  onUserClick?: (user: AvatarUser) => void;

  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
};

export const Avatar = ({
  userId,
  src,
  alt,
  size = 36,
  loadUser,
  onOpen,
  onClose,
  onUserClick,
  placement = "bottom-right",
}: AvatarProps) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AvatarUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const placementStyle = useMemo(() => {
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: 1000,
      minWidth: 280,
    };

    switch (placement) {
      case "bottom-left":
        return { ...base, top: "calc(100% + 8px)", left: 0 };
      case "top-right":
        return { ...base, bottom: "calc(100% + 8px)", right: 0 };
      case "top-left":
        return { ...base, bottom: "calc(100% + 8px)", left: 0 };
      case "bottom-right":
      default:
        return { ...base, top: "calc(100% + 8px)", right: 0 };
    }
  }, [placement]);

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  const openPopup = async () => {
    setOpen(true);
    onOpen?.(userId);

    if (user || loading) return;

    setLoading(true);
    setError(null);

    try {
      const u = await loadUser(userId);
      setUser(u);
    } catch (e: any) {
      setError("Непредвиденная ошибка");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) close();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", onDocMouseDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const buttonStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    overflow: "hidden",
    border: "1px solid var(--border)",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const popupStyle: React.CSSProperties = {
    ...placementStyle,
    background: "var(--cards)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  const popupHeaderStyle: React.CSSProperties = {
    padding: 12,
    display: "flex",
    gap: 12,
    alignItems: "center",
    borderBottom: "1px solid var(--border)",
    background: "rgba(0,0,0,0.12)",
  };

  const popupAvatarStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid var(--border)",
    flexShrink: 0,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    color: "var(--text)",
    lineHeight: "18px",
  };

  const descStyle: React.CSSProperties = {
    marginTop: 6,
    fontSize: 13,
    color: "var(--subtext)",
    lineHeight: "18px",
    opacity: 0.9,
  };

  const bodyStyle: React.CSSProperties = {
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const hintStyle: React.CSSProperties = {
    fontSize: 13,
    color: "var(--subtext)",
    lineHeight: "18px",
  };

  const retryStyle: React.CSSProperties = {
    width: "100%",
    height: 32,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text)",
    cursor: "pointer",
  };

  return (
    <div ref={rootRef} style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => (open ? close() : openPopup())}
        aria-label={alt ?? "avatar"}
      >
        <img src={src} alt={alt ?? "avatar"} style={imgStyle} />
      </button>

      {open && (
        <div style={popupStyle}>
          <div style={popupHeaderStyle}>
            <img
              src={user?.avatar ?? src}
              alt={user?.name ?? alt ?? "avatar"}
              style={popupAvatarStyle}
            />
            <div style={{ minWidth: 0 }}>
              <div style={nameStyle}>
                {loading ? "Загрузка..." : user?.name ?? "Пользователь"}
              </div>
              {user?.description && <div style={descStyle}>{user.description}</div>}
            </div>
          </div>

          <div style={bodyStyle}>
            {error && (
              <>
                <div style={hintStyle}>{error}</div>
                <button
                  type="button"
                  style={retryStyle}
                  onClick={() => {
                    setUser(null);
                    setError(null);
                    openPopup();
                  }}
                >
                  Повторить
                </button>
              </>
            )}

            {!error && !loading && user && (
              <button
                type="button"
                style={{
                  ...retryStyle,
                  borderRadius: 10,
                  height: 34,
                  background: "rgba(255,255,255,0.04)",
                }}
                onClick={() => onUserClick?.(user)}
              >
                Открыть профиль
              </button>
            )}

            {!error && loading && <div style={hintStyle}>Тянем данные профиля…</div>}
            {!error && !loading && !user && (
              <div style={hintStyle}>Не удалось загрузить профиль</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
