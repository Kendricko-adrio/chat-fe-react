import { FC, useEffect, useRef, useState } from "react";
import { User } from "./../entity/User";
import { ChatDetail, ChatSend } from "./../entity/ChatDetail";
import { getChatsByGrop } from "./../services/ChatService";
import { Group } from "./../entity/Group";
import { GroupDetailResponse } from "./../entity/GroupDetail";
import { CurrUser } from "../util/currUser";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ChatBubble } from './chatbubble';

interface ChatRoomProps {
  user: GroupDetailResponse;
}

export const ChatRoom: FC<ChatRoomProps> = (props: ChatRoomProps) => {
  const [message, setMessage] = useState<ChatDetail[]>();
  const [newMessage, setNewMessage] = useState<string>("");
  const scrollContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrollContainer.current) return;
    scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
  }, [message]);
  const onMessageReceived = (event: WebSocketEventMap["message"]) => {
    console.log(event.data);
    const chatReceived: ChatDetail = JSON.parse(event.data) as ChatDetail;
    setMessage((prev) => {
      if (prev) {
        return [...prev, chatReceived];
      } else {
        return [chatReceived];
      }
    });
  };

  const { sendJsonMessage, getWebSocket } = useWebSocket(
    `ws://localhost:8080/ws?username=${CurrUser.getInstance().getUser()?.Username}`,
    {
      onOpen: () => console.log("WebSocket connection opened."),
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event: WebSocketEventMap["message"]) => {
        onMessageReceived(event);
      },
    }
  );
  useEffect(() => {
    const chatlist = getChatsByGrop(props.user.GroupID).then((res) => {
      setMessage(res);
    });
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = {message: newMessage, to: props.user.GroupID};
    
    sendJsonMessage( message);
    console.log("send message", message);
    

    setNewMessage("");
    const chatSend : ChatDetail = {
        ID: 0,
        Message: newMessage,
        UserFromID: CurrUser.getInstance().getUser()?.Id as number,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        GroupID: props.user.GroupID,

    };
    console.log("chat send ", chatSend);
    
    setMessage((prev) => {
        if (prev) {
          return [...prev, chatSend];
        } else {
          return [chatSend];
        }
      });
  };

  return (
    <div className="w-full pb-10 pt-10 pr-2 flex flex-col justify-between">
      <div className="h-1/6 flex flex-row justify-start items-center p-3 shadow-md rounded-2xl bg-tertiary border-[1px] border-secondary">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
          className="rounded-full h-full"
        />
        <div className="ml-10">{props.user.User.Username}</div>
      </div>

      <div ref={scrollContainer} className="h-4/6 flex flex-col overflow-y-scroll p-3 rounded-2xl shadow-xl border-[1px] border-secondary  scrollbar-thin scrollbar-thumb-tertiary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {message &&
          message.map((item, _) => {
            return <ChatBubble key={crypto.randomUUID()} chat={item} isSender={item.UserFromID === CurrUser.getInstance().getUser()?.Id}/>
          })}
      </div>
      <div className="h-[50px] shadow-xl rounded-3xl ">
        <form action="" className="flex flex-row h-full" onSubmit={onSubmit}>
          <input type="text" className="w-full h-full form-input-text" placeholder="hai" value={newMessage} onChange={(e) => {
                setNewMessage(e.target.value)
          }} />
          <input type="submit" value="submit" className="btn" />
        </form>
      </div>
    </div>
  );
};
