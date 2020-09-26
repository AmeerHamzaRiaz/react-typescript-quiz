import React from 'react'
import { Stack, Flex, Heading, Text, Button, useColorMode } from "@chakra-ui/core";

type ResultProp = {
    correctAnswers: number,
    totalQuestions: number,
    onTryAgain: () => void
}

const ResultComponent = (props: ResultProp) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = { light: "white", dark: "gray.200" };
    const color = { light: "gray.800", dark: "gray.800" };

    return (
        <Stack spacing={3}>
            <Heading>Quiz</Heading>
            <Heading as="h3" size="lg">Result</Heading>
            <Flex justifyContent="center" align="center">
                <Flex bg={bgColor[colorMode]} color={color[colorMode]} width="80vw" height="30vh" align="center" justify="center" flexDirection="column">
                    <Text textAlign="center" fontSize="lg">
                        You Answered {props.correctAnswers} questions correctly
                        </Text>
                    <Text textAlign="center" fontSize="3xl">
                        Your Score is {Math.round((props.correctAnswers / props.totalQuestions) * 100) || 0} %
                        </Text>
                </Flex>
            </Flex>
            <Button variantColor="teal" size="md" onClick={props.onTryAgain}>
                Try Again
                </Button>
        </Stack>
    )
}

export default ResultComponent
