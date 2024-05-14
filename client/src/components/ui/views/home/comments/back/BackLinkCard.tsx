"use client"

import { Box } from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { memo } from "react"

function BackLinkCard():JSX.Element {
  const router:AppRouterInstance = useRouter();

  return (
    <div className="text-xl ml-10 underline text-violet-800 mt-5"
     onClick={router.back.bind(router)}>
      back home
    </div>
  )
}

export default memo(BackLinkCard);
