import React, { ReactNode } from 'react'
import { Button, IButton } from '@chakra-ui/core';

interface IProps extends IButton {
    isChecked?: boolean,
    isDisabled?: boolean,
    value: string | number,
}

const CustomRadio: React.FC<IProps> = (props: IProps) => {
    const { isChecked, isDisabled, value, ...rest } = props;
    return (
        <Button
            width="70vw"
            alignSelf="center"
            marginTop="16px"
            size="md"
            variantColor={isChecked ? "pink" : "gray"}
            aria-checked={isChecked}
            role="radio"
            isDisabled={isDisabled}
            {...rest}
        />
    )
};

export default CustomRadio;