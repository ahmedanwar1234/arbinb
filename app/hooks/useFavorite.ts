import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLogin";
import React, { useCallback, useMemo } from "react";

interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const { toast } = useToast();
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);



  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast({
          title: " Success Action",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Somthing went wrong",
        });
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router, toast]
  );
  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
