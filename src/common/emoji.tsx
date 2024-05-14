import React, { FC } from "react";

import "emoji-mart/css/emoji-mart.css";
import { Picker, PickerProps } from "emoji-mart";

interface EmojiProps extends PickerProps {
  showEmoji: boolean;
  addEmoji: (event: any) => void;
}

const Emoji: FC<EmojiProps> = ({ showEmoji, addEmoji, ...args }) => {
  return (
    <>
      {showEmoji ? (
        <Picker
          showPreview={false}
          emojiSize={18}
          title={""}
          {...args}
          theme="light"
          onSelect={addEmoji}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Emoji;
