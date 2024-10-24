"use client";

import React, {useState} from 'react';
import {MdDelete, MdModeEdit} from "react-icons/md";
import {MemoryType} from "@/app/(after-auth)/chat/setting/[id]/page";
import {Modal} from "antd";
import {useSession} from "next-auth/react";
import {showToast} from "@/utils/show-toast";

const {confirm} = Modal;

type Props = {
  memories: MemoryType[]
}


const title = {
  'things_to_do': '한 일',
  'things_done': '했던 일',
  'things_to_do_later': '할 일',
  'age': '나이',
  "favorite_color": '좋아하는 것',
  "favorite_food": '좋아하는 것',
  "hobby": '좋아하는 것',
}

function MemoryList({
                      memories
                    }: Props) {
  const [memoryList, setMemoryList] = useState(memories);
  const [isShowModal, setIsShowModal] = useState(false);
  const session = useSession();

  const closeModal = () => {
    setIsShowModal(false);
  }

  const deleteMemory = async (memoryId: string) => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL||''}/api/v1/memory/${memoryId}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data?.user?.accessToken}`,
        },
        credentials: 'include',
      });
      if(!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      console.log(data);
      if(data.success) {
        setMemoryList(data.memories);
      }
    } catch (error) {
      console.error("error", error);
      showToast("error", "삭제가 실패했습니다.");
      setMemoryList(memoryList);
    }

  }

  const showEditConfirm = () => {
    confirm({
      title: "수정하시겠습니까?",
      content: <>

      </>,
      onOk: ()=>{console.log("OK")},
      onCancel: closeModal
    });
  }

  const showDeleteConfirm = (memoryId: string) => () => {
    confirm({
      title: "삭제하시겠습니까?",
      content: <>
        삭제한 후에는 변경할 수 없습니다.
      </>,
      onOk: async ()=>{
        const memories = await deleteMemory(memoryId);
        // setMemoryList(memories);
      },
      onCancel: closeModal
    });
  }

  return (
      <>
        <div className="overflow-scroll h-[80dvh] bg-gray-100 rounded-md text-black flex-1 px-4 py-4">
          {memoryList.map((memory) => <div key={memory.id} className="flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <span className="w-[50px] font-semibold text-[16px]">{title[memory.type]}</span>
              <span>{memory.description}</span>
            </div>
            <div className="flex text-[16px] gap-x-1 items-center">
            <span className="text-gray-500 cursor-pointer" onClick={showEditConfirm}>
              <MdModeEdit/>
            </span>
              <span className="text-gray-500 cursor-pointer" onClick={showDeleteConfirm(memory.id)}>
              <MdDelete/>
            </span>
            </div>
          </div>)}
        </div>

      </>
  );
}


export default MemoryList;