"use client";

import React, {useRef, useState} from 'react';
import {MdDelete, MdModeEdit} from "react-icons/md";

import {Modal} from "antd";
import {useSession} from "next-auth/react";
import {showToast} from "@/utils/show-toast";
import type { MemoryType, ProfileDetailKey} from "@/models/memory/memory.model";
import {AssistantType} from "@/models/chat/chat-room.dto";

const {confirm} = Modal;

type Props = {
  type: AssistantType;
  memories: MemoryType[],
  // memoryListByGroup: Partial<GroupMemoryType>
}


function MemoryList({
                      type,
                      memories,
                      // memoryListByGroup,
                    }: Props) {
  const [memoryList, setMemoryList] = useState(memories);
  const [isShowModal, setIsShowModal] = useState(false);
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeModal = () => {
    if (isShowModal) {
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
      console.log(data);
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
          type,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();

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
        if (inputRef.current) {
          await editMemory(memory.id, inputRef.current.value);
        } else {
          showToast("error", <>값을 입력하시지 않으셨습니다.</>);
        }

        // console.logs("OK", inputRef.current.value);
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
          {/*{*/}
          {/*  memoryEntries.map(([key, value]) => {*/}
          {/*    return <div key={key} className='flex'>*/}
          {/*      <div className="font-semibold text-[16px]">{categorizePrefix(key)}</div>*/}
          {/*      <div>*/}
          {/*        {Object.entries(value).map(([title, value]) => {*/}
          {/*          return <div key={title} className='ml-2'>*/}
          {/*            <div className="font-semibold text-[14px]">{translateProfileDetailKey(title as ProfileDetailKey)}</div>*/}
          {/*            <div className='ml-2'>{value.map(item => <div key={item.id}>*/}
          {/*              {item.description}*/}
          {/*            </div>)}</div>*/}
          {/*          </div>*/}
          {/*        })}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  })*/}
          {/*}*/}
          {memoryList.map((memory) => <div key={memory.id} className="flex items-center justify-between mb-4 gap-x-2">
            <div className="flex gap-x-2 items-center">
              <span className="min-w-[80px] font-semibold text-[13px]">{translateProfileDetailKey(memory.type)}</span>
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



// function categorizePrefix(input: string) {
//   if (input.startsWith("personal_info")) {
//     return "개인정보";
//   } else if (input.startsWith("dislike")) {
//     return "싫어하는 것";
//   } else if (input.startsWith("like")) {
//     return "좋아하는 것";
//   } else if (input.startsWith("recent_updates")) {
//     return "근황";
//   } else if (input.startsWith("activities")) {
//     return "활동";
//   } else {
//     return "알 수 없음"; // 정의되지 않은 접두사에 대한 기본 값
//   }
// }
export function translateProfileDetailKey(key: ProfileDetailKey): string {
  const translations: Record<ProfileDetailKey, string> = {
    personal_info_age: '나이',
    personal_info_gender: '성별',
    personal_info_job: '직업',
    personal_info_personality: '성격',
    personal_info_living_arrangement: '거주 형태',
    personal_info_family_relationship: '가족 관계',
    personal_info_interpersonal_relationship: '대인 관계',
    like_people: '좋아하는 사람',
    like_celebrities: '좋아하는 연예인',
    like_colors: '좋아하는 색상',
    like_places: '좋아하는 장소',
    like_foods: '좋아하는 음식',
    like_activities: '좋아하는 활동',
    like_hobbies: '취미',
    dislike_foods: '싫어하는 음식',
    dislike_people: '싫어하는 사람',
    dislike_behaviors: '싫어하는 행동',
    dislike_celebrities: '싫어하는 연예인',
    recent_updates_interest: '최근 관심사',
    recent_updates_concern: '최근 걱정거리',
    recent_updates_daily_life: '일상 생활',
    recent_updates_relationship_update: '관계 변화',
    recent_updates_future_plans: '미래 계획',
    recent_updates_anxieties: '불안 요소',
    recent_updates_goals: '목표',
    activities_past_activity: '과거 활동',
    activities_current_activity: '현재 활동',
    activities_future_activity: '미래 활동'
  };

  return translations[key] || '그 외';
}

export default MemoryList;