import { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../component/presentation/Title.component";
import PageLayout from "../../component/presentation/Layout.component";
import { IServiceResult, IVisulInfo } from "../../general/interface";
import { columns } from "./History.grid";
import {
  defaultHeader,
  DeleteHistoryAddress,
  HistoryAddress,
} from "../../general/serviceAddress";
import UserAlert from "../../component/presentation/UserAlert.component";

export default function History() {
  const { data: serviceResult } = useQuery<IServiceResult<IVisulInfo[]>>({
    queryKey: ["history"],
    queryFn: () => fetch(HistoryAddress).then((res) => res.json()),
  });

  return (
    <PageLayout>
      <Header text={"Visual Info History"} />
      <Body>{serviceResult && <Content rows={serviceResult.data} />}</Body>
    </PageLayout>
  );
}

const Content = ({ rows }: { rows: IVisulInfo[] }) => {  
  const [open, setOpen] = useState<boolean>(false);
  const [lrows, setlrows] = useState<IVisulInfo[]>([]);

  useEffect(() => {
    if (rows) setlrows(rows);
  }, [rows]);

  const handleDelete = () => {
    deleteHsitory.mutate();
  };

  const deleteHsitory = useMutation({
    mutationFn: () =>
      fetch(DeleteHistoryAddress, {
        method: "delete",
        headers: defaultHeader,
      }).then(() => {
        setlrows([]);
        setOpen(true);
      }),
  });

  return (
    <HistoryContent>
      {lrows && lrows.length > 0 ? (
        <>
          <DataGrid
            rows={lrows}
            columns={columns}
            getRowId={(e) => e.timeStamp}
          />
          <Box>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete All History
            </Button>
          </Box>
        </>
      ) : (
        <Alert severity="info">No history to Display</Alert>
      )}
      <UserAlert
        open={open}
        setOpen={setOpen}
        text={" All history deleted successfully!"}
      />
    </HistoryContent>
  );
};

const HistoryContent = styled.div`
  height: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Body = styled.div`
  padding-top: 30px;
`;
