import React, { useCallback, useEffect, useState } from 'react';
import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { QuestionOption } from '@api/models/survey';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

interface ExtendedOption extends QuestionOption {
  selected?: boolean;
}

interface SingleChoiceProps {
  /**
   * options to render
   */
  options: QuestionOption[];
}

type StringOrNumber = string | number;

export const SingleChoice = (props: SingleChoiceProps) => {
  const [value, setValue] = useState<StringOrNumber | undefined>();
  const [options, setOptions] = useState<ExtendedOption[]>([]);

  const handleSelection = useCallback((option: ExtendedOption) => {
    const { id } = option;

    setOptions((prev) =>
      prev.map((item) => {
        const itemCopy = { ...item };

        if (itemCopy.id === id) {
          itemCopy.selected = !itemCopy.selected;
        } else {
          itemCopy.selected = false;
        }

        return itemCopy;
      })
    );
  }, []);

  useEffect(() => {
    const { options: originalOptions } = props;

    setOptions(
      originalOptions.map((opt) => ({
        ...opt,
        selected: false,
      }))
    );
  }, []);

  useEffect(() => {
    const optionSelected = options.find((opt) => opt.selected);
    setValue(optionSelected?.id);
  }, [options]);

  useEffect(() => {
    console.log('values :>> ', value);
  }, [value]);

  return (
    <SimpleGrid
      alignItems="center"
      justifyContent="center"
      w="full"
      minChildWidth="300px"
      gap="10px"
    >
      {options.map((item) => (
        <Button
          onClick={() => handleSelection(item)}
          type="button"
          rounded="md"
          bg="white"
          p={4}
          key={item?.id}
          flex="1"
          minW="300px"
          boxShadow="base"
          _hover={{
            boxShadow: 'md',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Flex alignItems="center" flex="1" style={{ gap: '10px' }}>
            <Text color="black" flex="1">
              {item?.name}
            </Text>
            {item?.selected ? (
              <MdCheckBox size={20} color="#319795" />
            ) : (
              <MdCheckBoxOutlineBlank size={20} color="#333" />
            )}
          </Flex>
        </Button>
      ))}
    </SimpleGrid>
  );
};
