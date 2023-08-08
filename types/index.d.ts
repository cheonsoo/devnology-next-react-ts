declare module '*.md';
declare module '*.scss';

export type TInputValue = string | number | ReadonlyArray<string>;
export type TInputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TInputKeyboardEvent = KeyboardEvent<HTMLInputElement>;
export type TInputMouseEvent = MouseEvent<HTMLButtonElement>;

export interface IProps {
  value?: InputValue;
  label?: string;
  onChange?: (evt: InputChangeEvent) => void;
  onEnter?: (val: string | number | ReadonlyArray<string>) => void;
  onClick?: (evt: TInputMouseEvent) => void;
}
