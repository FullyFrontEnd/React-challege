import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import styled from "styled-components";
import { Earning } from "../../types/earnings-table-types";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import React from "react";
import Moment from "react-moment";

const MuiTableContainer = styled.div`
  padding: 10px;
  table {
    th,
    td {
      padding: 8px;
    }
    th {
      color: #d1d0d0;
      border: none;
    }
    td {
      border-color: #f3f3f3;
    }
  }
`;
const MuiDateTdCell = styled(TableCell)`
  color: #d1d0d0;
  font-weight: 500;
  padding: 15px 0 !important;
`;
const MuiCompanyNameContainer = styled.div`
  > div {
    display: flex;
    svg {
      font-size: 18px;
      color: #989797;
      &[data-testid="StarIcon"] {
        fill: #74e8c9;
      }
    }
    span {
      font-weight: bold;
      padding-left: 3px;
    }
  }
  > span {
    font-size: small;
    color: #d1d0d0;
    font-weight: bold;
  }
`;
const SentimentContent = styled.div<{ ats: string }>`
  line-height: 15px;
  span {
    color: ${(p) => (p.ats === "Bullish" ? "#77be77" : "#d0898b")};
    font-weight: bold;
    margin-left: 2px;
  }
`;
const NotesIcon = styled(StickyNote2OutlinedIcon)`
  transform: rotateX(180deg);
  color: #b2b2b4;
  margin-left: 10px;
`;
type EarningsTableType = {
  tableRows: Earning[];
};
export function EarningsTable({ tableRows }: EarningsTableType): JSX.Element {
  return (
    <>
      <MuiTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>COMPANY</TableCell>
              <TableCell>EVENT</TableCell>
              <TableCell>SENTIMENT</TableCell>
              <TableCell>CALL</TableCell>
              <TableCell>EPS EST.</TableCell>
              <TableCell>EPS</TableCell>
              <TableCell>SURPRISE</TableCell>
              <TableCell>NEWS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <MuiDateTdCell colSpan={8}>
                    <Moment format="dddd DD, MMMM YYYY">{row.date}</Moment>
                  </MuiDateTdCell>
                </TableRow>
                {row.details.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell>
                      <MuiCompanyNameContainer>
                        <div>
                          {detail.favorite ? <StarIcon /> : <StarBorderIcon />}
                          <span>{detail.company.shortName}</span>
                        </div>
                        <span>{detail.company.fullName}</span>
                      </MuiCompanyNameContainer>
                    </TableCell>
                    <TableCell>
                      <b>{detail.event.name}</b>
                    </TableCell>
                    <TableCell>
                      <SentimentContent ats={detail.sentiment.ats}>
                        <b>ATS:</b>
                        <span>{detail.sentiment.ats}</span>
                      </SentimentContent>
                      <SentimentContent ats={detail.sentiment.option}>
                        <b>Option:</b>
                        <span>{detail.sentiment.option}</span>
                      </SentimentContent>
                    </TableCell>
                    <TableCell>
                      {detail.call ? (
                        <RadioButtonCheckedIcon style={{ color: "#74e8c9" }} />
                      ) : (
                        <RadioButtonUncheckedIcon
                          style={{ color: "#b2b2b4" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>${detail.epsEst}</TableCell>
                    <TableCell>${detail.eps}</TableCell>
                    <TableCell>
                      <SentimentContent ats={detail.sentiment.option}>
                        <span>{detail.surprise}%</span>
                      </SentimentContent>
                    </TableCell>
                    <TableCell>
                      <NotesIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </MuiTableContainer>
    </>
  );
}
