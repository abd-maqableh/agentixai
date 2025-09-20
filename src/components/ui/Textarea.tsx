/**
 * MUI Textarea Component
 * Auto-resizing textarea component using Material-UI TextField
 */

import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export interface TextareaProps extends Omit<TextFieldProps, 'multiline' | 'minRows' | 'maxRows'> {
  autoResize?: boolean;
  maxRows?: number;
  minRows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  autoResize = true,
  maxRows = 10,
  minRows = 2,
  variant = 'outlined',
  ...props
}) => {
  return (
    <TextField
      multiline
      minRows={minRows}
      maxRows={autoResize ? maxRows : minRows}
      variant={variant}
      {...props}
    />
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
export { Textarea };
