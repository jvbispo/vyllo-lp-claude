"use client"

import { useSearchParams } from "next/navigation"

const APP_URL = "https://app.vyllo.com.br"
const CALC_URL = "https://calculadora.vyllo.com.br"

export function useRefParam() {
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref")

  const registroUrl = ref
    ? `${APP_URL}/auth/registro?ref=${encodeURIComponent(ref)}`
    : `${APP_URL}/auth/registro`

  const calcUrl = ref
    ? `${CALC_URL}?ref=${encodeURIComponent(ref)}`
    : CALC_URL

  const loginUrl = ref
    ? `${APP_URL}/auth/login?ref=${encodeURIComponent(ref)}`
    : `${APP_URL}/auth/login`

  return { ref, registroUrl, calcUrl, loginUrl }
}
