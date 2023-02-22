

export interface ChatListProps {
    name: string;
    lastMessage?: string;
    isSelected?: boolean;
}

const ChatList :React.FC<ChatListProps> = (props: ChatListProps)  => {

    const css = props.isSelected ? "bg-tertiary": "bg-primary" ;
    const divClass = "flex flex-col justify-center items-center shadow-md rounded-3xl ";
    return(
        <div className={divClass + css} >
          <div className="w-full h-24 flex p-2">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className="rounded-full"
            />
            <div className="flex flex-col ml-1">
              <div className="h-1/2 flex flex-col justify-center">{props.name}</div>
              <div className="h-1/2 flex flex-col justify-center">{props.lastMessage}</div>
            </div>
          </div>

        </div>
    );
}

export default ChatList;
