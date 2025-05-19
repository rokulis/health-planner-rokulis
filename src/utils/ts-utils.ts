export type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type NextSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type NextServerComponentProps = {
  params: Promise<Record<string, string>>;
  searchParams: NextSearchParams;
};
