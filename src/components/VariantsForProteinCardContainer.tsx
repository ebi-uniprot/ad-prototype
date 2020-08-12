import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import VariantCard, { VariantData, VariationData } from "./cards/VariantCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { variantsForProteinUrl } from "../urls";

const VariantsForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<VariationData>(
    variantsForProteinUrl(proteinid)
  );
  let filteredData;
  if (data) {
    filteredData = {
      sequence: data.sequence,
      features: data.features.filter(
        (d: VariantData) =>
          d.sourceType.includes("uniprot") || d.sourceType.includes("mixed")
      ),
    };
  }

  return (
    <PageTemplate
      context={Context.VARIANT}
      id={proteinid}
      length={filteredData?.features.length}
      isLoading={isLoading}
    >
      {filteredData && (
        <VariantCard data={filteredData} accession={proteinid} />
      )}
    </PageTemplate>
  );
};

export default VariantsForProteinCardContainer;
