import { TimeDisplay } from 'types/time';

interface CurrentTimeIndicatorProps {
  currentTime: TimeDisplay;
}
export default function CurrentTimeIndicator({
  currentTime,
}: CurrentTimeIndicatorProps) {
  return <span className="text-[10em]">{currentTime.time}</span>;
}
