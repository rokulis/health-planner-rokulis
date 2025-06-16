export function formatTimeToHHMM(time: string): string {
  if (!time) return '';
  if (time.length === 5 && time.includes(':')) {
    return time;
  }
  if (time.length === 8 && time.split(':').length === 3) {
    return time.substring(0, 5);
  }
  return time;
}

export function secondsToHHMM(seconds: number): string {
  if (seconds < 0) return '00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
