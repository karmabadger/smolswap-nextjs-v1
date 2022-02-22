/**
 * // useEventListener.tsx
 * * This hook can be used to listen to events on a target
 */

import { useEffect } from "react";

const useEventListener = (
  target: EventTarget,
  event: string,
  listener: EventListenerOrEventListenerObject,
  trigger = true
): void => {
  useEffect(() => {
    const t = target || window;
    t.addEventListener(event, listener);
    trigger && t.dispatchEvent(new Event(event));
    return () => t.removeEventListener(event, listener);
  });
};
export default useEventListener;

// const useScrollListener = () => {
//     return useEventListener(undefined, 'scroll', () => {...});
// };

// export {
//     useScrollListener
// }
