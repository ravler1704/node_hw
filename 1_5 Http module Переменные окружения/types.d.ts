type TLocation = Record<"name" | "region" | "country", string>;
type TCondition = Record<"text", string>;
type TCurrent = {
  last_updated: string;
  last_updated_epoch: number;
  temp_c: number;
} & TCondition;

export type TResponse = {
  location:TLocation;
  current:TCurrent
}
