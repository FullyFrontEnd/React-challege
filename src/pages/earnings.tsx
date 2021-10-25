import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import {
  Chip,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RangePicker } from "./components/calendar";
import { EarningsTable } from "./components/earnings-table";
import { filterTableData, TableRows, Tickers } from "./earnings-data";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { Earning } from "../types/earnings-table-types";
import { Range } from "react-date-range";

const Container = styled(Grid).attrs({ container: true, spacing: 4 })`
  padding: 20px;
  background: #f8f9fb;
`;
const Item = styled(Paper)`
  box-shadow: none;
  border-radius: 10px;
  padding: 10px;
`;
const Heading = styled(Typography).attrs({
  variant: "h5",
})`
  font-weight: bold;
`;
const MuiSelect = styled(Select)`
  display: flex;
  background: #f0f3f8;
  border-radius: 4px;
  margin-top: 35px;
  border-radius: 12px;
  fieldset {
    border: none;
  }
  .MuiSelect-select {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
const MuiChip = styled(Chip)`
  margin-top: 10px;
  margin-right: 10px;
  background: #cff7ee;
  border-radius: 7px;
  span {
    padding-left: 8px;
    padding-right: 15px;
  }
  svg {
    color: initial;
    width: 17px;
    height: 17px;
    opacity: 0.8;
    color: initial !important;
  }
`;
const MuiButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const MuiButton = styled.button<{ color: string }>`
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${(p) => p.color};
  font-weight: 500;
  flex: 1;
  margin: 10px 5px;
`;
const MuiLabel = styled.label`
  font-weight: bold;
  font-size: large;
  padding-left: 8px;
`;
const MuiSlider = styled(Slider)`
  padding: 5px 0px;
  .MuiSlider-track,
  .MuiSlider-thumb {
    color: #74e8c9;
  }
  .MuiSlider-rail {
    color: #b9b8bf;
  }
`;
const MuiSliderRangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
  span {
    font-size: small;
  }
`;
const MuiRadiGroup = styled(RadioGroup)`
  margin-top: 5px;
  .MuiRadio-root {
    padding: 2px 10px 2px 16px;
    color: #e5e5e7;
    &.Mui-checked {
      color: #74e8c9;
    }
  }
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;
const MuiSelectOption = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #ddd;
  > span.Mui-checked {
    color: #74e8c9;
  }
`;
export function Earnings(): JSX.Element {
  const [tickers, setTickers] = useState<string[]>([]);
  const [tableRows, setTableRows] = useState<Earning[]>(TableRows);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [showFavs, setShowFavs] = useState(false);
  const [slideValue, setSlideValue] = useState(2.75);
  const [eventType, setEventType] = useState("annual");
  const [callTime, setCallTime] = useState("before-open");
  const onTickersSelect = (ticker: string) => {
    const isRemoveTicker = tickers.indexOf(ticker) > -1;
    if (isRemoveTicker) {
      setTickers(tickers.filter((t) => t !== ticker));
    } else {
      setTickers((t) => [...t, ticker]);
    }
  };
  useEffect(() => {
    setTableRows(
      filterTableData(
        tickers,
        dateRange,
        showFavs,
        slideValue,
        eventType,
        callTime
      )
    );
  }, [tickers, dateRange, showFavs, slideValue, eventType, callTime]);
  return (
    <>
      <Container>
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Item>
            <Heading>Earnings</Heading>
            <MuiSelect
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={() => "Tickers"}
              IconComponent={KeyboardArrowDownIcon}
              value={tickers}
              multiple
            >
              {Tickers.map((tick: string) => (
                <MenuItem value={tick} key={tick}>
                  <MuiSelectOption onClick={() => onTickersSelect(tick)}>
                    <Checkbox checked={tickers.indexOf(tick) > -1} />
                    {tick}
                  </MuiSelectOption>
                </MenuItem>
              ))}
            </MuiSelect>
            {tickers.map((tick) => (
              <MuiChip
                key={tick}
                label={tick}
                deleteIcon={<ClearIcon />}
                onDelete={() => onTickersSelect(tick)}
              />
            ))}
            <RangePicker
              selectedRange={dateRange}
              onRangeSelect={(r) => setDateRange(r)}
            />
            <MuiButtonContainer>
              <MuiButton
                color={showFavs ? "#f8f9fb" : "#74e8c9"}
                onClick={() => setShowFavs(false)}
              >
                All Companies
              </MuiButton>
              <MuiButton
                color={showFavs ? "#74e8c9" : "#f8f9fb"}
                onClick={() => setShowFavs(true)}
              >
                Favorites
              </MuiButton>
            </MuiButtonContainer>
            <MuiLabel>Market Caps</MuiLabel>
            <MuiSlider
              size="small"
              onChange={(ev, val) => setSlideValue(val as number)}
              value={slideValue}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={0}
              max={3}
              step={0.25}
            />
            <MuiSliderRangeLabels>
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </MuiSliderRangeLabels>
            <Grid container spacing={2} margin="20px 0 10px" maxWidth="100%">
              <Grid item xs={6} padding="0px !important">
                <Item style={{ padding: "0px" }}>
                  <FormControl component="fieldset">
                    <MuiLabel>Event Type</MuiLabel>
                    <MuiRadiGroup
                      aria-label="event-type"
                      value={eventType}
                      onChange={(ev) => setEventType(ev.target.value)}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="annual"
                        control={<Radio />}
                        label="Annual"
                      />
                      <FormControlLabel
                        value="quarterly"
                        control={<Radio />}
                        label="Quarterly"
                      />
                    </MuiRadiGroup>
                  </FormControl>
                </Item>
              </Grid>
              <Grid item xs={6} padding="0px !important">
                <Item style={{ padding: "0px" }}>
                  <FormControl component="fieldset">
                    <MuiLabel>Call Time</MuiLabel>
                    <MuiRadiGroup
                      value={callTime}
                      aria-label="call-time"
                      onChange={(ev) => setCallTime(ev.target.value)}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="before-open"
                        control={<Radio />}
                        label="Before Open"
                      />
                      <FormControlLabel
                        value="after-close"
                        control={<Radio />}
                        label="After Close"
                      />
                    </MuiRadiGroup>
                  </FormControl>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <Item>
            <EarningsTable tableRows={tableRows} />
          </Item>
        </Grid>
      </Container>
    </>
  );
}
