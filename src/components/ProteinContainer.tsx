import React from "react";
import useApi from "./hooks/UseApi";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";
import { useParams } from "react-router";

const ProteinContainer = () => {
  const { proteinid } = useParams();

  const { data } = useApi<{ result: ProteinData }>(
    `${baseUrl}/proteins/${proteinid}`
  );

  if (!data) {
    return null;
  }

  return <ProteinCard data={data?.result} id={proteinid} />;
};

export default ProteinContainer;
