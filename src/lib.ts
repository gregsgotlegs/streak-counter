// Used when storing in localStorage
export const KEY = "streak";

export interface Streak {
    currentCount: number;
    startDate: string;
    lastLoginDate: string;
}

export function shouldIncrementOrResetStreakCount(
    currentDate: Date,
    lastLoginDate: string
): "increment" | "reset" | undefined {
    // We get 11/5/2021
    // so to get 5, we split on / and get the second item
    const difference =
        currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
    // This means they logged in the day after the currentDate
    if (difference === 1) {
        return "increment";
    }
    else if (difference !== 0){
        return "reset";
    }
    // Otherwise they logged in after a day, which would
    // break the streak
    return undefined;
}

export function buildStreak(date: Date, partialStreak: Partial<Streak>): Streak {
    let streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
        ...partialStreak
    }

    return streak;
}

export function formattedDate(date: Date): string {
    return date.toLocaleDateString("en-US");
}