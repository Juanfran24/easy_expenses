import React from "react";
import { View } from "react-native";
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";
import Typography from "../Typography";
import colors from "@/src/constants/colors";

interface StackedBarChartProps extends BarChartPropsType {
  legend: Array<{ label: string; color: string }>;
  data: Array<{
    stacks: Array<{ value: number; color: string }>;
    label: string;
  }>;
}

const StackedBarChart = ({ data, legend, ...props }: StackedBarChartProps) => {
  return (
    <View style={{ width: "100%" }}>
      <BarChart
        stackData={data}
        {...props}
        xAxisLabelTextStyle={{
          color: colors.textsAndIcons.dark,
          fontSize: 10,
          fontFamily: "Sora_Regular",
        }}
        yAxisTextStyle={{
          color: colors.textsAndIcons.dark,
          fontSize: 10,
          fontFamily: "Sora_Regular",
        }}
        yAxisLabelContainerStyle={{
          marginRight: 10,
        }}
      />
      {legend && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            gap: 10,
          }}
        >
          {legend.map((item: any, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  borderRadius: 5,
                }}
              />
              <Typography.P3.Light>{item.label}</Typography.P3.Light>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default StackedBarChart;
