import React, { useState, useEffect } from 'react'
import { Flex, useToast } from "@chakra-ui/core";
import { fetchTriviaCategories, fetchQuestions, TriviaCategories, Settings, Questions } from '../services/Api';
import SettingsScreen from '../components/SettingsComponent';
import QuestionsComponent from '../components/QuestionsComponent';
import ResultComponent from '../components/ResultComponent';
import DarkModeButton from '../components/DarkModeButton';

const MainPage: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(10);
    const [difficulty, setDifficulty] = useState<null | string>(null);
    const [category, setCategory] = useState<null | number>(null);
    const [triviaCategories, setTriviaCategories] = useState<TriviaCategories[]>([]);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [currQuestionIndex, setCurrQuestionIndex] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const difficultyArr: string[] = ["Easy", "Medium", "Hard"];
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetchTriviaCategories();
                setTriviaCategories(res);
            } catch (error) {
                toast({
                    title: "An error occurred.",
                    description: "Something went wrong",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  })            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    const onQuestionCountChange = (newValue: number): void => { setAmount(newValue) };

    const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => setCategory(Number(event.target.value));

    const onDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>): void => setDifficulty(event.target.value);

    const onStartQuiz = async (event: React.MouseEvent<any, MouseEvent>) => {
        setIsLoading(true);

        const data: Settings = { amount };
        if (category) {
            data.category = category;
        }
        if (difficulty) {
            data.difficulty = difficulty;
        }

        let res = await fetchQuestions(data);

        if (res.response_code !== 0) {
            toast({
                title: "An error occurred.",
                description: "Category does not have enough questions",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        else {
            setQuestions([...res.results]);
        }

        setIsLoading(false);
    };

    const calculateResults = () => {
        setDisplayResult(true);
    }

    const nextQuestion = () => {
        if (questions[currQuestionIndex].correct_answer === selectedAnswer) {
            setCorrectAnswers(correctAnswers + 1);
        }
        setSelectedAnswer('');
        setCurrQuestionIndex(currQuestionIndex + 1);
    }

    const tryAgain = () => {
        setAmount(10);
        setDifficulty(null);
        setCategory(null);
        setQuestions([]);
        setCurrQuestionIndex(0);
        setCorrectAnswers(0);
        setDisplayResult(false);
        setSelectedAnswer("");
    }

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <DarkModeButton />
            {
                questions.length !== 0 ?
                    (
                        displayResult ?
                            <ResultComponent
                                onTryAgain={tryAgain}
                                correctAnswers={correctAnswers}
                                totalQuestions={questions.length}
                            />
                            :
                            <QuestionsComponent
                                questions={questions}
                                currQuestionIndex={currQuestionIndex}
                                nextQuestion={nextQuestion}
                                calculateResults={calculateResults}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                            />
                    ) :
                    (

                        <SettingsScreen
                            triviaCategories={triviaCategories}
                            amount={amount}
                            onQuestionCountChange={onQuestionCountChange}
                            onCategoryChange={onCategoryChange}
                            onDifficultyChange={onDifficultyChange}
                            onStartQuiz={onStartQuiz}
                            isLoading={isLoading}
                            difficultyArr={difficultyArr}
                        />
                    )
            }
        </Flex >
    )
}

export default MainPage
