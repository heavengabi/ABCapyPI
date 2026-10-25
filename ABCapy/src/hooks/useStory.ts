import { useEffect, useState } from "react";
import * as Speech from "expo-speech";

import api from "@/src/utils/api";

export type StoryPageData = {
    id: number;
    pageNumber: number;
    illustration: string | null;
    text: string;
};

export type StoryHistory = {
    id: number;
    currentPage: number;
    completed: boolean;
    starsEarned: number;
};

export const useStory = (storyId?: string) => {
    const [pages, setPages] = useState<StoryPageData[]>([]);
    const [storyTitle, setStoryTitle] = useState("");
    const [history, setHistory] = useState<StoryHistory | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingNext, setLoadingNext] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isFirstCompletion, setIsFirstCompletion] = useState(false);

    const loadStory = async () => {
        try {
            setLoading(true);

            const id = Number(storyId);

            console.log("📖 STORY ID:", id);

            if (!id) return;

            // ==========================================
            // BUSCAR DADOS DA HISTÓRIA
            // ==========================================

            const storyResponse = await api.get(
                `/stories/${id}`
            );

            console.log(
                "📡 STATUS HISTÓRIA:",
                storyResponse.status
            );

            const storyData = storyResponse.data;

            console.log("📖 HISTÓRIA:", storyData);
            console.log("📖 TÍTULO:", storyData.title);

            setStoryTitle(storyData.title || "");

            // ==========================================
            // BUSCAR PÁGINAS DA HISTÓRIA
            // ==========================================

            const pagesResponse = await api.get(
                `/stories/${id}/pages`
            );

            console.log(
                "📡 STATUS PÁGINAS:",
                pagesResponse.status
            );

            const pagesData: StoryPageData[] =
                pagesResponse.data;

            const orderedPages = pagesData.sort(
                (a, b) => a.pageNumber - b.pageNumber
            );

            setPages(orderedPages);

            console.log(
                "📚 PÁGINAS:",
                orderedPages
            );

            // ==========================================
            // BUSCAR HISTÓRICO
            // ==========================================

            const historyResponse = await api.get(
                "/stories/progress/me"
            );

            console.log(
                "📡 STATUS HISTÓRICO:",
                historyResponse.status
            );

            const historiesList =
                historyResponse.data;

            console.log(
                "📡 RESPOSTA HISTÓRICO:",
                historiesList
            );

            const currentHistory =
                historiesList.find(
                    (item: any) =>
                        item.story &&
                        Number(item.story.id) === id
                );

            if (currentHistory) {
                const storyHistory: StoryHistory = {
                    id: currentHistory.id,
                    currentPage:
                        currentHistory.currentPage || 1,
                    completed:
                        currentHistory.completed || false,
                    starsEarned:
                        currentHistory.starsEarned || 0,
                };

                setHistory(storyHistory);

                if (storyHistory.completed) {
                    setCurrentPageNumber(1);
                } else {
                    setCurrentPageNumber(
                        storyHistory.currentPage || 1
                    );
                }

                console.log(
                    "✅ HISTÓRICO ENCONTRADO:",
                    storyHistory
                );
            } else {
                console.log(
                    "ℹ️ HISTÓRIA SEM HISTÓRICO"
                );

                setHistory(null);
                setCurrentPageNumber(1);
            }
        } catch (error: any) {
            console.log(
                "❌ ERRO AO CARREGAR HISTÓRIA:",
                error
            );

            if (error.response) {
                console.log(
                    "STATUS:",
                    error.response.status
                );

                console.log(
                    "RESPOSTA:",
                    error.response.data
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!storyId) return;

        loadStory();

        return () => {
            Speech.stop();
        };
    }, [storyId]);

    // ==========================================
    // PÁGINA ATUAL
    // ==========================================

    const currentPage =
        pages[currentPageNumber - 1];

    const isLastPage =
        currentPageNumber === pages.length;

    // ==========================================
    // NARRAÇÃO
    // ==========================================

    const speakPage = async () => {
        try {
            if (!currentPage?.text) return;

            if (speaking) {
                await Speech.stop();

                setSpeaking(false);

                return;
            }

            setSpeaking(true);

            await Speech.speak(
                currentPage.text,
                {
                    language: "pt-BR",
                    rate: 0.85,
                    pitch: 1,

                    onDone: () =>
                        setSpeaking(false),

                    onStopped: () =>
                        setSpeaking(false),

                    onError: () =>
                        setSpeaking(false),
                }
            );
        } catch (error) {
            console.log(
                "❌ ERRO AO FALAR:",
                error
            );

            setSpeaking(false);
        }
    };

    // ==========================================
    // VOLTAR PÁGINA
    // ==========================================

    const previousPage = async () => {
        if (currentPageNumber <= 1) return;

        await Speech.stop();

        setSpeaking(false);

        setCurrentPageNumber(
            currentPageNumber - 1
        );
    };

    // ==========================================
    // PRÓXIMA PÁGINA
    // ==========================================

    const nextPage = async () => {
        if (
            loadingNext ||
            currentPageNumber >= pages.length
        ) {
            return;
        }

        await Speech.stop();

        setSpeaking(false);

        setCurrentPageNumber(
            currentPageNumber + 1
        );
    };

    // ==========================================
    // CONCLUIR HISTÓRIA
    // ==========================================

    const completeStory = async () => {
        if (loadingNext) return;

        try {
            setLoadingNext(true);

            await Speech.stop();

            setSpeaking(false);

            const wasAlreadyCompleted =
                history?.completed ?? false;

            const starsToEarn =
                wasAlreadyCompleted ? 0 : 5;

            const body = {
                storyId: Number(storyId),
                currentPage: currentPageNumber,
                completed: true,
                starsEarned: starsToEarn,
            };

            console.log(
                "📡 SALVANDO HISTÓRICO:"
            );

            console.log(
                "📦 DADOS DO HISTÓRICO:",
                body
            );

            const response = await api.post(
                "/stories/progress",
                body
            );

            console.log(
                "📡 STATUS CONCLUSÃO:",
                response.status
            );

            const updatedHistory =
                response.data;

            console.log(
                "📡 RESPOSTA CONCLUSÃO:",
                updatedHistory
            );

            const newHistory: StoryHistory = {
                id: updatedHistory.id,
                currentPage:
                    updatedHistory.currentPage,
                completed:
                    updatedHistory.completed,
                starsEarned:
                    updatedHistory.starsEarned,
            };

            setHistory(newHistory);

            setIsFirstCompletion(
                !wasAlreadyCompleted
            );

            setShowModal(true);

            console.log(
                "✅ HISTÓRIA CONCLUÍDA!"
            );

            console.log(
                "⭐ ESTRELAS GANHAS:",
                starsToEarn
            );
        } catch (error: any) {
            console.log(
                "❌ ERRO AO CONCLUIR HISTÓRIA:",
                error
            );

            if (error.response) {
                console.log(
                    "STATUS:",
                    error.response.status
                );

                console.log(
                    "RESPOSTA:",
                    error.response.data
                );
            }
        } finally {
            setLoadingNext(false);
        }
    };

    // ==========================================
    // LER NOVAMENTE
    // ==========================================

    const handleReadAgain = async () => {
        setShowModal(false);

        await Speech.stop();

        setSpeaking(false);

        setCurrentPageNumber(1);
    };

    // ==========================================
    // VOLTAR PARA HISTÓRIAS
    // ==========================================

    const handleGoBackToStories = () => {
        setShowModal(false);

        Speech.stop();

        setSpeaking(false);

        return true;
    };

    return {
        pages,
        storyTitle,
        history,
        currentPage,
        currentPageNumber,
        loading,
        loadingNext,
        speaking,
        showModal,
        isFirstCompletion,
        isLastPage,
        setShowModal,
        speakPage,
        previousPage,
        nextPage,
        completeStory,
        handleReadAgain,
        handleGoBackToStories,
    };
};