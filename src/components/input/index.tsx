import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, TextInput } from "react95";

export const Input = ({
  placeholder,
  maxLength,
  state,
  setState,
  multiline,
  rows,
}: any) => {
  const [hideEmoji, setHideEmoji] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setHideEmoji(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (ref.current) {
      const cursor = ref.current.selectionStart + 1;
      if (cursor) {
        const text =
          state.slice(0, cursor) + emojiObject.emoji + state.slice(cursor);
        setState(text);

        const newCursor = cursor + emojiObject.emoji.length;
        setTimeout(
          () => ref.current.setSelectionRange(newCursor, newCursor),
          10
        );
      }
    }
  };

  return (
    <div
      style={{ display: multiline ? "block" : "flex", alignItems: "center", width: "100%" }}
    >
      <TextInput
        multiline={multiline || false}
        rows={multiline ? rows : false}
        ref={ref}
        fullWidth
        value={state}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setState(e.target.value)
        }
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          marginTop: multiline ? 10 : 0,
        }}
      >
        <div ref={emojiPickerRef}>
          <Button onClick={() => setHideEmoji(!hideEmoji)}>😊</Button>

          {hideEmoji ? (
            <div style={{ position: "absolute", zIndex: 1 }}>
              <EmojiPicker
                autoFocusSearch={true}
                onEmojiClick={onEmojiClick}
                lazyLoadEmojis={true}
                emojiStyle="twitter"
                height={300}
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
