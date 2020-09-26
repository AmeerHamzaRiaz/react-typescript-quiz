import { shuffleArray } from "../utilities/Utils"

export const fetchTriviaCategories = async (): Promise<TriviaCategories[]> => {
    const api = 'https://opentdb.com/api_category.php'
    try {
        const response = await fetch(api)
        const { trivia_categories } = await response.json()
        return trivia_categories
    } catch (error) {
        throw error;
    }
}

export const fetchQuestions = async (data: Settings): Promise<QuestionsResponse> => {
    const searchParams = new URLSearchParams(data as any);
    const api = 'https://opentdb.com/api.php?' + searchParams.toString() + '&type=multiple&encode=url3986';
    try {
        const response = await fetch(api)
        const resp: QuestionsResponse = await response.json();
        const updatedResults =  resp.results.map((q: Questions) => ({
            ...q,
            answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
        }));
        resp.results = [...updatedResults];
        return resp;
    } catch (error) {
        throw error;
    }
}


export interface TriviaCategories {
    trivia_categories: { id: number, name: string };
}

export interface QuestionsResponse {
    response_code: number;
    results: Questions[];
}

export interface Questions {
    category: string;
    correct_answer: string;
    answers: string[];
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export interface Settings {
    amount: number;
    category?: number;
    difficulty?: string;
};