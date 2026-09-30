import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";

const API_URL = "http://192.168.100.22:3000";

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

    const getToken = async () => {
        const token = await AsyncStorage.getItem("@ABCapy:token");

        console.log("🔑 TOKEN RECUPERADO:", token);

        return token;
    };

    const loadStory = async () => {
        try {
            setLoading(true);

            const id = Number(storyId);

            console.log("📖 STORY ID:", id);

            if (!id) return;

            // ==========================================
            // BUSCAR DADOS DA HISTÓRIA
            // ==========================================

            const storyUrl = `${API_URL}/stories/${id}`;

            console.log("📡 BUSCANDO HISTÓRIA:", storyUrl);

            const storyResponse = await fetch(storyUrl);

            console.log(
                "📡 STATUS HISTÓRIA:",
                storyResponse.status
            );

            if (storyResponse.ok) {
                const storyData = await storyResponse.json();

                console.log("📖 HISTÓRIA:", storyData);
                console.log("📖 TÍTULO:", storyData.title);

                setStoryTitle(storyData.title || "");
            } else {
                console.log(
                    "❌ ERRO AO BUSCAR HISTÓRIA:",
                    await storyResponse.text()
                );
            }

            // ==========================================
            // BUSCAR PÁGINAS DA HISTÓRIA
            // ==========================================

            const pagesUrl = `${API_URL}/stories/${id}/pages`;

            console.log("📡 BUSCANDO PÁGINAS:", pagesUrl);

            const pagesResponse = await fetch(pagesUrl);

            console.log(
                "📡 STATUS PÁGINAS:",
                pagesResponse.status
            );

            if (!pagesResponse.ok) {
                const errorText = await pagesResponse.text();

                console.log(
                    "❌ ERRO AO BUSCAR PÁGINAS:",
                    errorText
                );

                throw new Error("Erro ao buscar páginas");
            }

            const pagesData: StoryPageData[] =
                await pagesResponse.json();

            const orderedPages = pagesData.sort(
                (a, b) => a.pageNumber - b.pageNumber
            );

            setPages(orderedPages);

            console.log(
                "📚 PÁGINAS:",
                orderedPages
            );

            // ==========================================
            // BUSCAR TOKEN
            // ==========================================

            const token = await getToken();

            if (!token) {
                console.log("⚠️ TOKEN NÃO ENCONTRADO");

                setCurrentPageNumber(1);

                return;
            }

            // ==========================================
            // BUSCAR HISTÓRICO
            // ==========================================

            const progressUrl =
                `${API_URL}/stories/progress/me`;

            console.log(
                "📡 BUSCANDO HISTÓRICO:",
                progressUrl
            );

            const historyResponse = await fetch(
                progressUrl,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "📡 STATUS HISTÓRICO:",
                historyResponse.status
            );

            const historyText =
                await historyResponse.text();

            console.log(
                "📡 RESPOSTA HISTÓRICO:",
                historyText
            );

            if (!historyResponse.ok) {
                console.log(
                    "❌ ERRO AO BUSCAR HISTÓRICO"
                );

                setCurrentPageNumber(1);

                return;
            }

            const historiesList =
                JSON.parse(historyText);

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
        } catch (error) {
            console.log(
                "❌ ERRO AO CARREGAR HISTÓRIA:",
                error
            );
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

            const token = await getToken();

            if (!token) {
                console.log(
                    "❌ Usuário não autenticado."
                );

                return;
            }

            const wasAlreadyCompleted =
                history?.completed ?? false;

            const starsToEarn =
                wasAlreadyCompleted ? 0 : 5;

            const url =
                `${API_URL}/stories/progress`;

            console.log(
                "📡 SALVANDO HISTÓRICO:",
                url
            );

            const body = {
                storyId: Number(storyId),
                currentPage: currentPageNumber,
                completed: true,
                starsEarned: starsToEarn,
            };

            console.log(
                "📦 DADOS DO HISTÓRICO:",
                body
            );

            const response = await fetch(
                url,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Accept:
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify(body),
                }
            );

            console.log(
                "📡 STATUS CONCLUSÃO:",
                response.status
            );

            const responseText =
                await response.text();

            console.log(
                "📡 RESPOSTA CONCLUSÃO:",
                responseText
            );

            if (!response.ok) {
                console.log(
                    "❌ ERRO AO SALVAR HISTÓRICO"
                );

                return;
            }

            const updatedHistory =
                JSON.parse(responseText);

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
        } catch (error) {
            console.log(
                "❌ ERRO AO CONCLUIR HISTÓRIA:",
                error
            );
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