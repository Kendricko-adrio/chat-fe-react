import { FC, useEffect, useState } from "react";
import { CurrUser } from "./../util/currUser";
import ChatList, { ChatListProps } from "./../component/chatlist";
import { GetAllGroups } from "./../services/UserService";
import { GroupDetailResponse } from "./../entity/GroupDetail";
import { ChatRoom } from "./../component/chatroom";
import { User } from "./../entity/User";

interface ChatProps {
  name: string;
}

const dummy: ChatListProps[] = [
  {
    name: "test1",
    lastMessage: "test",
  },
  {
    name: "test2",
    lastMessage: "test",
  },
  {
    name: "test3",
    lastMessage: "test",
  },
];

const Chat: FC = () => {
  const [name, setName] = useState<User>(
    CurrUser.getInstance().getUser() as User
  );
  const [chatList, setChatList] = useState<GroupDetailResponse[]>();

  const [chatRoom, setChatRoom] = useState<GroupDetailResponse | null>(null);
  const onChatListClick = (response: GroupDetailResponse) => {
    setChatRoom(response);
  };

  useEffect(() => {
    const chatlist = GetAllGroups(name.Username).then((res) => {
      console.log(res);
      setChatList(res);
    });
  }, []);

  return (
    <div className="flex flex-row justify-self-center w-100 w-screen h-screen relative">
      <div className="w-96 min-w-[300px] relative p-4">
        <div className=" flex flex-col justify-center h-[10%] shadow-2xl items-center bg-primary rounded-3xl mb-3 border-[1px] border-secondary">
          {/* Hello {name.Username} */}
          <div>
            ➕
          </div>
        </div>
        <div className="overflow-y-auto h-[85%] bg-primary rounded-3xl shadow-2xl p-3 border-[1px] border-secondary">
          {chatList &&
            chatList.map((item, _) => {
              return (
                <div onClick={() => onChatListClick(item)} key={crypto.randomUUID()}>
                  <ChatList
                    key={ crypto.randomUUID()}
                    name={
                      item.Group.GroupType == "Personal"
                        ? item.User.Username
                        : item.Group.GroupName
                    }
                    isSelected={chatRoom?.GroupID === item.GroupID}
                    // lastMessage={"test"}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {!chatRoom && (<div key={crypto.randomUUID()} className="w-full">Click on a chat to start chatting</div>)}
      {chatRoom && <ChatRoom key={crypto.randomUUID()} user={chatRoom} />}
    </div>
  );
};

export default Chat;
