import React from 'react'
import { Select, FormControl, FormLabel, Slider, SliderThumb, SliderFilledTrack, Stack, Button, SliderTrack, Heading } from "@chakra-ui/core";
import { TriviaCategories } from '../services/Api';

type SettingProps = {
    triviaCategories: TriviaCategories[],
    difficultyArr: string[],
    isLoading: boolean,
    amount: number,
    onQuestionCountChange: (newValue: number) => void,
    onDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onStartQuiz: (event: React.MouseEvent<any, MouseEvent>) => void
};


const SettingsComponent = (props: SettingProps) => {
    return (
        <Stack spacing={3} width="70vw">
            <Heading>Quiz</Heading>
            <Heading as="h3" size="lg">Settings</Heading>
            <FormControl>
                <FormLabel htmlFor="category">Set Category</FormLabel>
                <Select id="category" onChange={props.onCategoryChange} >
                    <option key="any" value={undefined}>Any</option>
                    {
                        props.triviaCategories.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="difficulty">Set Difficulty</FormLabel>
                <Select id="difficulty" onChange={props.onDifficultyChange}>
                    <option key="any" value={undefined}>Any</option>
                    {
                        props.difficultyArr.map((item) => <option key={item} value={item.toLocaleLowerCase()}>{item}</option>)
                    }
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="number">Set Questions</FormLabel>
                <Slider color="teal" flex="1" value={props.amount} min={1} max={50} onChange={props.onQuestionCountChange}>
                    <SliderTrack />
                    <SliderFilledTrack />
                    <SliderThumb
                        fontSize="sm"
                        width="32px"
                        height="20px"
                        children={props.amount}
                    />
                </Slider>
            </FormControl>
            <Button variantColor="teal" size="md" onClick={props.onStartQuiz} isLoading={props.isLoading}>
                Start Quiz
                </Button>
        </Stack >
    )
}

export default SettingsComponent
