import { useGetSessionPayload } from "./use-get-session-payload"

export function useGetAccessToken() {
  const sessionPayloadQuery = useGetSessionPayload()
  const payload = sessionPayloadQuery?.data?.payload
  const accessToken = payload?.access_token
  return String(accessToken)
}