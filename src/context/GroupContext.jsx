import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [isGroupJoined, setIsGroupJoined] = useState(false); // 초기 상태

    const joinGroupHandler = () => {
        setIsGroupJoined(true); // 그룹 참여 상태 업데이트
    };

    return (
        <GroupContext.Provider value={{ isGroupJoined, joinGroupHandler }}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroup = () => useContext(GroupContext);
