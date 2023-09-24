import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

import React, { useEffect, useRef } from "react";
import {
  getAverage,
  getChartVisualIndicators,
  getJumpToOptions,
  getTodayOrYesterdayDate,
  onJumpTo,
  pageSpinnerStyle,
  stringToDate,
} from "../../utils";
import { JumpToDropdown } from "../../components/JumpToDropdown";
import { Spinner } from "../../components/Spinner";
import { TeamFunctionIcon } from "../../components/TeamFunctionIcon";
import { NoDataProgress } from "../../components/NoDataPlaceholders/NoDataProgress";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ProgressChart } from "../../components/Charts/ProgressChart";
import { useDailyProgress } from "../../hooks/useDailyProgress";
import ToggleChartButton from "../../components/ToggleChartButton";
import { useSelector } from "react-redux";
import { ChatMeassge } from "../../components/Store/Slice/UserSlice";
import { ToastContainer, toast } from "react-toastify";

export const DashboardProgress = () => {
  const ref = useRef(null);

  const {
    summary,
    isLoading,
    onTabChange,
    currTab,
    error,
    tabs,
    chartVisible,
    setChartVisible,
  } = useDailyProgress(ref);

  if (summary?.summary.length < 1) {
    return <NoDataProgress />;
  }



  return (
    <>
      <ToastContainer />
      {error && <ErrorMessage message={error.message} />}
      {isLoading ? (
        <Spinner style={pageSpinnerStyle} />
      ) : (
        <div className=" dashboard-progress flow" data-spacing="small">
          <span className="container flex justify-center mb">
            <ToggleChartButton
              color={
                getChartVisualIndicators(getAverage(currTab?.data)).color.item
              }
              setChartVisible={setChartVisible}
              chartVisible={chartVisible}
            />
          </span>
          {chartVisible && (
            <ProgressChart
              ref={ref}
              currTab={currTab}
              tabs={tabs}
              onTabChange={onTabChange}
            />
          )}
          {summary?.summary
            .map((i) => ({
              ...i,
              created_at: stringToDate(i.date),
            }))
            .map((item, idx) => (
              <React.Fragment key={idx}>
                <JumpToDropdown
                  onJumpTo={(timePeriod) =>
                    onJumpTo(
                      timePeriod,
                      summary?.summary.map((i) => ({
                        created_at: stringToDate(i.date),
                      }))
                    )
                  }
                  options={getJumpToOptions(
                    summary?.summary.map((i) => ({
                      created_at: stringToDate(i.date),
                    }))
                  )}
                  placeholder={getTodayOrYesterdayDate(item.created_at)}
                />
                {item.daily_summary.map((i, idx) => (
                  <Item
                    id={item.created_at.setHours(0, 0, 0, 0)}
                    i={i}
                    key={idx}
                  />
                ))}
              </React.Fragment>
            ))}
        </div>
      )}
    </>
  );
};

const Item = ({ i, id }) => {
  return (
    <div id={id} className="hover-card-wrapper">
      <div
        className={`message-card container flex`}
        style={{
          alignItems: "flex-start",
        }}
      >
        <TeamFunctionIcon
          color={i.team?.color}
          team={i.team.function ?? "Sales"}
        />
        <div className="message-card__content">
          <h3
            className="fw-600"
            style={{
              marginBottom: ".1rem",
            }}
          >
            {i.team.name}
          </h3>
          {typeof i.summary === "object" ? (
            i.summary.map((i, idx) => (
              <p key={idx} className="">
                {i}
              </p>
            ))
          ) : (
            <p>{i.summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};
