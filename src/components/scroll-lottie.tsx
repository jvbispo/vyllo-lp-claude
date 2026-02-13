"use client"

import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import Lottie from "lottie-react"
import type { LottieRefCurrentProps } from "lottie-react"

import calendarCheck from "../../public/animations/calendar-check.json"
import toothDraw from "../../public/animations/tooth-draw.json"
import chartGrow from "../../public/animations/chart-grow.json"
import chatConfirm from "../../public/animations/chat-confirm.json"

const animations = {
  "calendar-check": calendarCheck,
  "tooth-draw": toothDraw,
  "chart-grow": chartGrow,
  "chat-confirm": chatConfirm,
} as const

type AnimationName = keyof typeof animations

export function ScrollLottie({
  name,
  className,
}: {
  name: AnimationName
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })

  useEffect(() => {
    if (isInView) {
      lottieRef.current?.goToAndPlay(0, true)
    }
  }, [isInView])

  return (
    <div ref={containerRef} className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animations[name]}
        autoplay={false}
        loop={false}
        className="h-full w-full"
      />
    </div>
  )
}
