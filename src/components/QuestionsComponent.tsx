import React from 'react'
import { Stack, Button, Heading, RadioButtonGroup, Flex } from "@chakra-ui/core";
import { Questions } from '../services/Api';
import CustomRadio from './CustomRadio';

type QuestionsProps = {
    currQuestionIndex: number,
    questions: Questions[],
    selectedAnswer: string,
    setSelectedAnswer: (newVal: any) => void
    nextQuestion: () => void,
    calculateResults: () => void
};

const QuestionsComponent = (props: QuestionsProps) => {
    return (
        <Stack spacing={3} width="70vw">
            <Heading>Quiz</Heading>
            <Heading as="h3" size="lg">Question {props.currQuestionIndex + 1} of {props.questions.length}</Heading>
            <p>{unescape(props.questions[props.currQuestionIndex].question)}</p>

            <Flex>
                <RadioButtonGroup
                    marginTop="16px"
                    onChange={(val: any) => props.setSelectedAnswer(val)}
                    isInline
                    margin="auto"
                >
                    {
                        props.questions[props.currQuestionIndex].answers.map(i =>
                            <CustomRadio value={i} key={i}>{unescape(i)}</CustomRadio>
                        )
                    }
                </RadioButtonGroup>
            </Flex>


            {
                props.currQuestionIndex < props.questions.length - 1 ?
                    (<Button
                        variantColor="teal"
                        size="md"
                        onClick={() => props.nextQuestion()}
                        isDisabled={!props.selectedAnswer}
                    >
                        Next Question
                    </Button>)
                    :
                    (<Button
                        variantColor="teal"
                        size="md"
                        onClick={() => props.calculateResults()}
                        isDisabled={!props.selectedAnswer}
                    >
                        Show Results
                    </Button>)
            }
        </Stack>
    )
}

export default QuestionsComponent
