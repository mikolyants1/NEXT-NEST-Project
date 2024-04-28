"use client"

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { memo } from "react"

function BackLinkCard():JSX.Element {
  const router = useRouter();

  return (
    <Box fontSize={20} ml={10}
     onClick={router.back.bind(router)}
     textDecor="underline" mt={5}
     color="blueviolet">
      back home
    </Box>
  )
}

export default memo(BackLinkCard);
