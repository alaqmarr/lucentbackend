import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Time string (e.g., "3:45 PM")
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Same day
  if (date.toDateString() === now.toDateString()) {
    return `Today at ${timeString}`;
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${timeString}`;
  }

  // Within 7 days
  if (diffInDays < 7) {
    return `${diffInDays} days ago at ${timeString}`;
  }

  // Within 30 days (approx 1 month)
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago at ${timeString}`;
  }

  // Within 365 days (approx 1 year)
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago at ${timeString}`;
  }

  // More than a year
  const years = Math.floor(diffInDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago at ${timeString}`;
}