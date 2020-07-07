import React, { FunctionComponent, useEffect } from "react";
import ProtvistaDatatable from "protvista-datatable";
import { Context, ContextObj } from "../../types/context";
import { DrugsData } from "../cards/DrugsCard";
import { loadWebComponent, ProtvistaDatatableType } from "../cards/VariantCard";
import { html } from "lit-html";

loadWebComponent("protvista-datatable", ProtvistaDatatable);

const columns = (diseaseId: string) => ({
  name: {
    label: "Name",
    resolver: (drug: DrugsData) => drug.name,
  },
  phase: {
    label: "Clinical trial",
    resolver: (drug: DrugsData) => html`
      <a
        href="${drug.clinicalTrialLink}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Phase ${drug.clinicalTrialPhase}
      </a>
    `,
  },
  type: {
    label: "Type",
    resolver: (drug: DrugsData) => drug.moleculeType,
  },
  mechanism: {
    label: "Mechanism of action",
    resolver: (drug: DrugsData) => drug.mechanismOfAction,
  },
  source: {
    label: "Source",
    resolver: (drug: DrugsData) => html`
      <a
        href="//www.ebi.ac.uk/chembl/compound_report_card/${drug.sourceId}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${drug.sourceId}
      </a>
    `,
  },
  evidences: {
    label: "Evidence",
    resolver: (drug: DrugsData) =>
      drug.evidences.map(
        (evidence) => html`
          <div>
            <a href="${evidence}" target="_blank" rel="noopener noreferrer">
              EuropePMC
            </a>
          </div>
        `
      ),
  },
  diseases: {
    label: "Diseases",
    resolver: (drug: DrugsData) =>
      drug.diseases &&
      drug.diseases.map(
        (disease) =>
          html`<p>
            <a
              href="/${ContextObj[Context.DISEASE]
                .id}/${disease.diseaseId}/${ContextObj[Context.PROTEIN].id}"
              >${disease.diseaseName}</a
            >
          </p>`
      ),
  },
  proteins: {
    label: "Proteins",
    resolver: (drug: DrugsData) =>
      drug.proteins &&
      drug.proteins.map(
        (protein) =>
          html`<p>
            <a
              href="/${ContextObj[Context.DISEASE]
                .id}/${diseaseId}/${ContextObj[Context.PROTEIN]
                .id}/${protein}/${ContextObj[Context.PROTEIN].id}"
              >${protein}</a
            >
          </p>`
      ),
  },
});

const DrugsTable: FunctionComponent<{
  data: DrugsData[];
  diseaseId: string;
}> = ({ data, diseaseId }) => {
  useEffect(() => {
    const protvistaDatatable = document.querySelector<ProtvistaDatatableType>(
      `[data-uuid='${diseaseId}_table']`
    );
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns(diseaseId);
      protvistaDatatable.data = data;
    }
  }, [data, diseaseId]);

  console.log(data);

  return (
    <section className="full-width">
      <protvista-datatable height="100%" data-uuid={`${diseaseId}_table`} />
    </section>
  );
};

export default DrugsTable;
