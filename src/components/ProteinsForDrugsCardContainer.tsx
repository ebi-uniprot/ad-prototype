import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";

const ProteinsForDrugsCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = () => {
  const { drugid } = useParams();
  const { data, isLoading } = useApi<{ results: ProteinData[] }>(
    `${baseUrl}/drug/${drugid}/proteins`
  );
  return (
    <Fragment>
      <PageTemplate
        context={Context.PROTEIN}
        id={drugid}
        length={data && data.results.length}
        isLoading={isLoading}
      >
        {data &&
          data.results.map((item: ProteinData) => (
            <ProteinCard data={item} id={drugid} key={v1()} />
          ))}
      </PageTemplate>
    </Fragment>
  );
};

export default withRouter(ProteinsForDrugsCardContainer);
