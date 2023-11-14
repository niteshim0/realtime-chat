'use client';

/* "use client" is used to declare a boundary between a Server and Client Component modules.
   This means that by defining a "use client" in a file, all other modules imported into it,
   including child components, are considered part of the client bundle.
   By default, the components are rendered on the server */

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const[drawerOpen,setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active'; // It will be done dynamically in the future
  }, [conversation]);

  return (
    <>
    <ProfileDrawer
      data = {conversation}
      isOpen = {drawerOpen}
      onClose = {()=>setDrawerOpen(false)}
      />
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" href="/conversation">
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />{/*there seems to be some problem regarding user*/}
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {setDrawerOpen(true)}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
    </>
  );
};

export default Header;
