import React, { useCallback, useEffect, useState } from 'react';
import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { QuestionOption } from '@api/models/survey';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

interface ExtendedOption extends QuestionOption {
  selected?: boolean;
}

interface MultiChoiceProps {
  /**
   * options to render
   */
  options: QuestionOption[];
}

type StringOrNumber = string | number;

export const MultiChoice = (props: MultiChoiceProps) => {
  const [values, setValues] = useState<StringOrNumber[]>([]);
  const [options, setOptions] = useState<ExtendedOption[]>([]);

  const handleSelection = useCallback((option: ExtendedOption) => {
    const { id } = option;

    setOptions((prev) =>
      prev.map((item) => {
        const itemCopy = { ...item };

        if (itemCopy.id === id) {
          itemCopy.selected = !itemCopy.selected;
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
    const someSelected = options.some((opt) => opt.selected);

    if (someSelected) {
      const filteredValues = options
        .filter((opt) => opt.selected)
        .map((opt) => opt.id);

      setValues(filteredValues);
    } else {
      setValues([]);
    }
  }, [options]);

  useEffect(() => {
    console.log('values :>> ', values);
  }, [values]);

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
