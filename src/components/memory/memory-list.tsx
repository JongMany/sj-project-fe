"use client";

import React, { useRef, useState} from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    if(isShowModal) {
      setIsShowModal(false);
    }
  }

  const deleteMemory = async (memoryId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memory/${memoryId}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data?.user?.accessToken}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      if (data.success) {
        setMemoryList(data.memories);
      }
    } catch (error) {
      console.error("error", error);
      showToast("error", "삭제에 실패했습니다.");
      setMemoryList(memoryList);
    }
  }

  const editMemory = async (memoryId: string, changeValue: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memory/${memoryId}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data?.user?.accessToken}`,
        },
        body: JSON.stringify({
          description: changeValue,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      console.log(response, data);
      if (data.success) {
        const {id, description} = data;
        setMemoryList(prev => prev.map((item) => item.id !== id ? item : {
          ...item,
          description,
        }));
      } else {
        showToast("error", "수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("error", error);
      showToast("error", "수정에 실패했습니다.");
      setMemoryList(memoryList);
    }
  }


  const showEditConfirm = (memory: MemoryType) => () => {
    confirm({
      title: "수정하시겠습니까?",
      content: <>
        <div>
          <label htmlFor="description"/>
          <input id="description" className="bg-white text-black border-2 px-2 py-1 rounded-md"
                 defaultValue={memory.description} ref={inputRef}/>
        </div>
      </>,
      onOk: async () => {
        await editMemory(memory.id, inputRef.current.value);
        // console.log("OK", inputRef.current.value);
      },
      onCancel: closeModal
    });
  }

  const showDeleteConfirm = (memoryId: string) => () => {

    confirm({
      title: "삭제하시겠습니까?",
      content: <>
        삭제한 후에는 변경할 수 없습니다.
      </>,
      onOk: async () => {
        await deleteMemory(memoryId);
      },
      onCancel: closeModal
    });
  }

  return (
      <>
        <div className="overflow-scroll h-[80dvh] bg-gray-100 rounded-md text-black flex-1 px-4 py-4">
          {memoryList.map((memory) => <div key={memory.id} className="flex items-center justify-between mb-4 gap-x-2">
            <div className="flex gap-x-2 items-center">
              <span className="min-w-[70px] font-semibold text-[14px]">{title[memory.type]}</span>
              <span className="text-[12px]">{memory.description}</span>
            </div>
            <div className="flex text-[15px] gap-x-1 items-center">
            <span className="text-gray-500 cursor-pointer" onClick={showEditConfirm(memory)}>
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