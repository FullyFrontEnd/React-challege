import { Earning } from "../types/earnings-table-types";
import { Range } from "react-date-range";
import moment from "moment";
import _ from "lodash";

export const TableRows: Earning[] = [
  {
    id: 1,
    date: new Date(2021, 11, 11),
    details: [
      {
        id: 1,
        company: { shortName: "AAPL", fullName: "Apple Inc." },
        favorite: true,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: true,
        callType: "after-close",
        epsEst: 1.85,
        eps: 1.05,
        surprise: 10.8,
      },
      {
        id: 2,
        company: { shortName: "TSLA", fullName: "Apple Inc." },
        favorite: false,
        event: { type: "annual", name: "A1 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: false,
        callType: "before-open",
        epsEst: 1.85,
        eps: 1.3,
        surprise: 10.8,
      },
      {
        id: 3,
        company: { shortName: "BVP", fullName: "Apple Inc." },
        favorite: false,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: false,
        callType: "before-open",
        epsEst: 1.85,
        eps: 1.45,
        surprise: 10.8,
      },
      {
        id: 4,
        company: { shortName: "AA", fullName: "Apple Inc." },
        favorite: true,
        event: { type: "annual", name: "A1 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: true,
        callType: "before-open",
        epsEst: 1.85,
        eps: 2.3,
        surprise: 10.8,
      },
      {
        id: 5,
        company: { shortName: "AAPL", fullName: "Apple Inc." },
        favorite: false,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Berish" },
        call: false,
        callType: "before-open",
        epsEst: 1.85,
        eps: 2.05,
        surprise: -1.8,
      },
    ],
  },
  {
    id: 2,
    date: new Date(2021, 11, 12),
    details: [
      {
        id: 1,
        company: { shortName: "AAPL", fullName: "Apple Inc." },
        favorite: true,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: true,
        callType: "after-close",
        epsEst: 1.85,
        eps: 2.05,
        surprise: 10.8,
      },
      {
        id: 2,
        company: { shortName: "BVP", fullName: "Apple Inc." },
        favorite: false,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: false,
        callType: "before-open",
        epsEst: 1.85,
        eps: 2.05,
        surprise: 10.8,
      },
      {
        id: 3,
        company: { shortName: "TSLA", fullName: "Apple Inc." },
        favorite: false,
        event: { type: "quarterly", name: "Q3 2021 Earnings" },
        sentiment: { ats: "Bullish", option: "Bullish" },
        call: false,
        callType: "after-close",
        epsEst: 1.85,
        eps: 2.05,
        surprise: 10.8,
      },
    ],
  },
];
export const Tickers: string[] = ["TSLA", "AA", "BVB", "AAPL"];

export const filterTableData = (
  tickers: string[],
  dateRange: Range,
  showFavs: boolean,
  slideValue: number,
  eventType: string,
  callTime: string
): Earning[] => {
  let tableRows = _.cloneDeep(TableRows);
  const mStartDate = moment(dateRange.startDate);
  const mEndDate = moment(dateRange.endDate);
  if (dateRange && mEndDate.diff(mStartDate, "days") > 1) {
    tableRows = tableRows.filter((row) =>
      moment(row.date).isBetween(mStartDate, mEndDate, undefined, "[]")
    );
  }
  tableRows = tableRows.map((row) => {
    row.details = row.details.filter((d) => {
      let res = true;
      if (tickers && tickers.length) {
        res = tickers.indexOf(d.company.shortName) > -1;
      }
      res =
        (showFavs ? d.favorite : res) &&
        d.eps < slideValue &&
        d.event.type === eventType &&
        d.callType === callTime;
      return res;
    });

    return row;
  });
  return tableRows.filter((t) => t.details.length);
};
