import { FC } from "react";
import { ChatDetail } from "./../entity/ChatDetail";

interface ChatBubbleProps {
  chat: ChatDetail;
  isSender: boolean;
}

export const ChatBubble: FC<ChatBubbleProps> = (props: ChatBubbleProps) => {
  const css: string = !props.isSender ? "self-start" : "self-end";

  return (
    <div className={css + " rounded-xl bg-secondary p-4"} key={props.chat.ID}>
      {props.chat.Message}
    </div>
  );
};
