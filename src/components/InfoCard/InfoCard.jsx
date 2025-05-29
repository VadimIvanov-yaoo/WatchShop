import React from "react";
import styles from "./InfoCard.module.scss";
import FlexBox from "../FlexBox/FlexBox";
import Title from "../Title/Title";
import Description from "../Description/Description";

export default function InfoCard({ infoTitle, infoDescription }) {
  return (
    <>
      <FlexBox>
        <div className={styles.infoCard}>
          <Title
            style={{
              textTransform: "uppercase",
              maxWidth: "150px",
            }}
            size="s18"
            weight="bold"
          >
            {infoTitle}
          </Title>
          <Description
            style={{ maxWidth: "310px" }}
            size="small-medium"
            weight="normal"
          >
            {infoDescription}
          </Description>
        </div>
      </FlexBox>
    </>
  );
}
