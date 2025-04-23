import React from 'react'
import {SessionResult} from "@/utils/interface";


interface LeaderboardProps {
    leaderboard: SessionResult[];
    leaderboardRef: React.Ref<HTMLDivElement>;
    handleSmallOnClick: () => void;
}

const Leaderboard= ({ leaderboard, leaderboardRef, handleSmallOnClick }: LeaderboardProps) => {
    return (
        <div ref={leaderboardRef} onClick={handleSmallOnClick} className="w-full h-dvh scale-30 origin-bottom-right mt-8 bg-black absolute z-10 bottom-0 right-0 transition-all duration-200 ease-out flex flex-col items-center justify-start cursor-pointer border-2 border-white rounded-4xl overflow-y-auto no-scrollbar font-ds">
            <h2 className="text-9xl text-orange-400 font-semibold mb-2">Leaderboard</h2>
            <ul className="text-white shadow divide-y flex-col flex items-center">
                {leaderboard.map((entry, idx) => (
                    <li key={idx} className="p-4 text-8xl">
                        <div className="flex justify-between">
                            <span>{entry.wpm} WPM | {entry.accuracy}%</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Leaderboard
