"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { createClient } from "@/utils/supabase/client";
import { LiveData } from "@/types/ArtistType";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/common/DeleteButton";

export default function ModalExample({
  isOpen,
  setIsOpen,
  date,
  userId,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  date?: Date | null;
  userId: string;
}) {
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const router = useRouter();
  const year = date?.getFullYear();
  const month =
    date?.getMonth() !== undefined ? date.getMonth() + 1 : undefined; // 月は0から始まるため、1を加算
  const day = date?.getDate();

  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const getUserLive = useCallback(async () => {
    if (!userId || !date) return;

    try {
      setLoading(true);

      const { data: liveIdsData, error: liveIdsError } = await supabase
        .from("user_live_schedules")
        .select("live_id")
        .eq("user_id", userId);

      if (liveIdsError) {
        console.error("Error fetching live IDs:", liveIdsError);
        return [];
      }

      const liveIds = liveIdsData.map((item) => item.live_id);

      //FIXME:artist不要
      const { data: liveData, error: liveDataError } = await supabase
        .from("lives")
        .select(
          `
                *,
                artists (
                    artist_name
                )
            `
        )
        .in("live_id", liveIds)
        .eq("date", `${year}-${month}-${day}`) // 日付をISO形式に変換//FIXME:一件のみ取得
        .order("date", { ascending: false });

      if (liveDataError) {
        console.error("Error fetching live data:", liveDataError);
        return [];
      }
      setLiveData(liveData);
      console.log(liveData);
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [userId, date, supabase, year, month, day]);

  useEffect(() => {
    getUserLive();
    console.log(userId);
  }, [userId, date, getUserLive]);

  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={() => setIsOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary-main sm:mx-0 sm:h-10 sm:w-10">
                      <MusicNoteIcon
                        className="h-6 w-6 text-primary-light"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {year}/{month}/{day}
                      </DialogTitle>
                      <div className="mt-2 w-full">
                        {loading ? (
                          <p>読み込み中...</p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {liveData.length > 0 ? (
                              <div className="w-full flex justify-between items-center">
                                {liveData.map((live) => (
                                  <Fragment key={live.live_id}>
                                    <p>{live.live_title}</p>
                                    <DeleteButton
                                      userId={userId}
                                      liveId={live.live_id}
                                    />
                                  </Fragment>
                                ))}
                              </div>
                            ) : (
                              <span>
                                この日に予定されているライブはありません。
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary-light px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border bg-secondary-main px-3 py-2 text-sm font-semibold text-primary-main shadow-sm hover:bg-secondary-dark sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setIsOpen(false);
                      router.push(
                        `/add?date=${year}-${month}-${day}&userId=${userId}`
                      );
                    }}
                  >
                    登録
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                    data-autofocus
                  >
                    戻る
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
