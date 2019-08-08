import { Context } from "./types/context";

export const colors: { [key in keyof typeof Context]: string } = {
  PROTEIN: "blue",
  DISEASE: "red",
  VARIANT: "orange",
  PATHWAY: "green",
  DRUG: "yellow",
  INTERACTION: "pink",
  SEARCH: ""
};