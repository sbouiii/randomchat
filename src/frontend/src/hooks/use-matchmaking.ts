import { useCallback, useEffect, useRef, useState } from "react";
import type { MatchResult, SessionId, UserId } from "../types";
import { useBackend } from "./use-backend";

export type MatchmakingState =
  | { status: "idle" }
  | { status: "waiting"; position: number }
  | { status: "matched"; sessionId: SessionId; peerId: UserId };

const POLL_INTERVAL_MS = 2000;

export function useMatchmaking() {
  const backend = useBackend();
  const [state, setState] = useState<MatchmakingState>({ status: "idle" });
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isActiveRef = useRef(false);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current !== null) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const poll = useCallback(async () => {
    if (!isActiveRef.current) return;
    try {
      const result: MatchResult = await backend.checkMatch();
      if (!isActiveRef.current) return;

      if (result.kind === "matched") {
        stopPolling();
        setState({
          status: "matched",
          sessionId: result.sessionId,
          peerId: result.peerId,
        });
      } else {
        setState({ status: "waiting", position: result.position });
      }
    } catch {
      // Network hiccup — keep polling
    }
  }, [backend, stopPolling]);

  const enterQueue = useCallback(async () => {
    if (state.status === "waiting") return;
    try {
      await backend.enterQueue();
      isActiveRef.current = true;
      setState({ status: "waiting", position: 0 });

      // Immediate first poll
      await poll();

      pollTimerRef.current = setInterval(poll, POLL_INTERVAL_MS);
    } catch (err) {
      console.error("enterQueue error:", err);
      setState({ status: "idle" });
    }
  }, [state.status, backend, poll]);

  const leaveQueue = useCallback(async () => {
    stopPolling();
    try {
      await backend.leaveQueue();
    } catch {
      // Best-effort
    }
    setState({ status: "idle" });
  }, [backend, stopPolling]);

  // Clean up on unmount
  useEffect(() => () => stopPolling(), [stopPolling]);

  return { state, enterQueue, leaveQueue };
}
