
import { buildStreak, formattedDate, KEY, shouldIncrementOrResetStreakCount, Streak } from "./lib";

export function streakCounter(storage: Storage, date: Date): Streak {
    const streakInLocalStorage = storage.getItem(KEY);
    if (streakInLocalStorage) {
        try {
            const streak = JSON.parse(streakInLocalStorage);
            const state = shouldIncrementOrResetStreakCount(
                date,
                streak.lastLoginDate
            );
            const SHOULD_INCREMENT = state === "increment";
            const SHOULD_RESET = state === "reset";

            if (SHOULD_INCREMENT) {
                const updatedStreak = {
                    ...streak,
                    currentCount: streak.currentCount + 1,
                    lastLoginDate: formattedDate(date),
                };
                // store in localStorage
                storage.setItem(KEY, JSON.stringify(updatedStreak));

                return updatedStreak;
            }
            if (SHOULD_RESET) {
                const resetStreak = {
                    ...streak,
                    currentCount: 1,
                    lastLoginDate: formattedDate(date),
                }
                // store in localStorage
                storage.setItem(KEY, JSON.stringify(resetStreak));

                return resetStreak;
            }
            return streak;
        } catch (error) {
            console.error("Failed to parse streak from localStorage");
            console.error("12345");
        }
    }
    const streak = buildStreak(date, {});
    
    // store in localStorage
    storage.setItem(KEY, JSON.stringify(streak));
    return streak;
}