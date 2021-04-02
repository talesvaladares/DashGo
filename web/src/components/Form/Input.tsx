import { forwardRef, ForwardRefRenderFunction } from 'react';
import {FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage} from '@chakra-ui/react';
import {FieldError} from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  label?: string;
  name: string;
  error?: FieldError;
};


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({label, name, error = null, ...rest}, ref) => {
    return (
        <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput 
          id={name}
          name={name} 
          borderLeftColor="pink.500"
          backgroundColor="gray.900"
          variant="filled"
          _hover= {{
            background: "gray.900"
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    )
}

export const Input = forwardRef(InputBase);