import React from "react";
import { View, StyleSheet } from "react-native";
import { FlexBox } from "../FlexBox";
import { PieChart } from "react-native-gifted-charts";
import { FlexBetween } from "../FlexBox/FlexBetween";
import Typography from "../Typography";
import { transformToCurrency } from "@/src/utils";
import colors from "@/src/constants/colors";

const DonutChartHome = ({ data }: any) => {
  return (
    <>
      <FlexBox style={{ alignItems: "center", marginTop: 20 }}>
        <PieChart
          donut
          showText={false}
          radius={100}
          data={data}
          font="Sora_Regular"
          innerCircleColor={colors.backgrounds.base}
          innerRadius={70}
          initialAngle={45}
        />
      </FlexBox>
      <Legend data={data} />
    </>
  );
};

export default DonutChartHome;

const Legend = ({ data }: any) => {
  // Verificar si se trata del caso especial de "Sin datos"
  if (data.length === 1 && data[0].type === "nodata") {
    return (
      <FlexBox
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          width: "100%",
        }}
      >
        <Typography.H6.Regular styles={{ letterSpacing: 1 }}>
          No hay datos para mostrar
        </Typography.H6.Regular>
      </FlexBox>
    );
  }

  return (
    <FlexBox
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
      }}
    >
      <FlexBox style={{ gap: 10, flex: 1 }}>
        {data.map((item: any, index: number) => (
          <FlexBetween key={index}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  backgroundColor: item.color,
                }}
              />
              <Typography.H6.Regular styles={{ letterSpacing: 1 }}>
                {item.type === "income"
                  ? "Ingresos"
                  : item.type === "expense"
                  ? "Gastos"
                  : item.type}
              </Typography.H6.Regular>
            </View>
            <Typography.H6.SemiBold
              styles={{
                color:
                  item.type === "expense" ? colors.error.main : colors.success,
              }}
            >
              {`${transformToCurrency(item.mount)}`}
            </Typography.H6.SemiBold>
          </FlexBetween>
        ))}
      </FlexBox>
    </FlexBox>
  );
};