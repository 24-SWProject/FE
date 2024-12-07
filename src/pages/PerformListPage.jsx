import React, { useEffect, useRef, useState } from "react";
import * as S from "../styles/pages/Perfom.style";
import { PropagateLoader } from "react-spinners";
import { useDebounce } from "../hooks/useDebounce";
import { getGroupProfile, getGroupCode } from "../api/group"; // 그룹 API 사용

export default function PerformListPage() {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
    const [isSearching, setIsSearching] = useState(false); // 검색 로딩 상태

    const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 디바운스된 검색어

    // 검색 디바운스가 변경될 때 API 호출
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]); // 검색어가 비어있으면 초기화
                return;
            }

            setIsSearching(true); // 로딩 시작
            try {
                // 그룹 프로필 API를 사용하여 검색 구현 (예시)
                const result = await getGroupProfile();
                const filteredResults = result.filter((group) =>
                    group.nickName.includes(debouncedSearchTerm)
                );
                setSearchResults(filteredResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsSearching(false); // 로딩 종료
            }
        };

        fetchSearchResults();
    }, [debouncedSearchTerm]);

    return (
        <S.PerformContainer>
            {/* 검색 입력 필드 */}
            <S.SearchContainer>
                <S.Input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </S.SearchContainer>
            {/* 검색 결과 렌더링 */}
            {isSearching ? (
                <PropagateLoader color="#E6A4B4" />
            ) : searchResults.length > 0 ? (
                <S.EventContainer>
                    {searchResults.map((result, index) => (
                        <div key={index}>
                            <h3>{result.nickName}</h3>
                            <p>기념일: {result.anniversary}</p>
                        </div>
                    ))}
                </S.EventContainer>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </S.PerformContainer>
    );
}
