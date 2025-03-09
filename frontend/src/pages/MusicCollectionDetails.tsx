import { useNavigate, useParams } from "react-router-dom";
import { useCollectionDetails } from "../dao";
import { AsyncUIWrapper } from "../components";
import { Typography, Table, Row, Col } from "antd";
import { CollectionDetails, song } from "../types";
import { RightOutlined } from "@ant-design/icons";
import {
  convertDurationInSecondsToRequiredFormat,
  convertReleasedOnDateToRequiredFormat,
  convertSizeInBytesToMB,
} from "../utils";

const CollectionDetailsHeading = (props: { heading: string }) => {
  return (
    <h5
      style={{
        margin: 0,
        fontFamily: "commissioner",
        fontWeight: 500,
        color: "#2D3540",
      }}
    >
      {props.heading}
    </h5>
  );
};

const CollectionDetailsContent = (props: { content: string }) => {
  return (
    <Typography
      style={{
        fontFamily: "commissioner",
        fontWeight: 400,
        fontSize: "14px",
        color: "#2D3540",
      }}
    >
      {props.content}
    </Typography>
  );
};

function formatPerformers(items: string[]): string {
  return items.length === 1
    ? items[0]
    : `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

export const MusicCollectionDetails = () => {
  const { id } = useParams();
  const { data, isLoading, failureReason } = useCollectionDetails(id!);
  const navigate = useNavigate();

  const columns: any[] = [
    {
      title: "Song",
      dataIndex: "title",
      width: "29.6%",
      render: (_: any, record: song) => {
        return (
          <Typography style={{ color: "#29313A" }}>{record.title}</Typography>
        );
      },
    },
    {
      title: "Performers",
      dataIndex: "performers",
      width: "35.9%",
      render: (_: any, record: song) => {
        return (
          <Typography style={{ color: "#29313A" }}>
            {formatPerformers(record.performers)}
          </Typography>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "durationInSeconds",
      width: "21.6%",
      render: (_: any, record: song) => {
        return (
          <Typography style={{ color: "#29313A" }}>
            {convertDurationInSecondsToRequiredFormat(record.durationInSeconds)}
          </Typography>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "sizeInBytes",
      width: "12.9%",
      render: (_: any, record: song) => {
        return (
          <Typography style={{ color: "#29313A" }}>
            {convertSizeInBytesToMB(record.sizeInBytes)}
          </Typography>
        );
      },
    },
  ];

  return (
    <AsyncUIWrapper isLoading={isLoading} failureReason={failureReason}>
      <div>
        <div style={{ padding: "6px 24px" }}>
          <Typography.Text
            style={{ color: "#677A90", fontSize: "14px" }}
            onClick={() => {
              navigate("../");
            }}
          >
            Overview
          </Typography.Text>
          <RightOutlined
            style={{ color: "#677A90", fontSize: "14px", padding: "0px 12px" }}
          />
          <Typography.Text style={{ color: "#29313A", fontSize: "14px" }}>
            {data?.response.artist}
          </Typography.Text>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "0px 24px",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "68px",
            color: "#29313A",
          }}
        >
          {(data?.response! as CollectionDetails)?.name}
        </div>
        <div style={{ margin: "24px", background: "#fff" }}>
          <Row
            justify={"space-between"}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              height: "68px",
            }}
          >
            <Col>
              <CollectionDetailsHeading heading="Artist" />
              <CollectionDetailsContent
                content={(data?.response! as CollectionDetails)?.artist}
              />
            </Col>
            <Col>
              <CollectionDetailsHeading heading="Type" />
              <CollectionDetailsContent
                content={(data?.response! as CollectionDetails)?.type}
              />
            </Col>
            <Col>
              <CollectionDetailsHeading heading="Song Count" />
              <CollectionDetailsContent
                content={(
                  data?.response! as CollectionDetails
                )?.songCount.toString()}
              />
            </Col>
            <Col>
              <CollectionDetailsHeading heading="Total Size" />
              <CollectionDetailsContent
                content={convertSizeInBytesToMB(data?.response?.sizeInBytes)}
              />
            </Col>
            <Col>
              <CollectionDetailsHeading heading="Total Duration" />
              <CollectionDetailsContent
                content={convertDurationInSecondsToRequiredFormat(
                  data?.response?.durationInSeconds
                )}
              />
            </Col>
            <Col>
              <CollectionDetailsHeading heading="Released On" />
              <CollectionDetailsContent
                content={convertReleasedOnDateToRequiredFormat(
                  data?.response?.releasedOn
                )}
              />
            </Col>
          </Row>
        </div>
        <Table
          style={{ borderRadius: "8px", padding: "0px 24px 24px" }}
          size="large"
          bordered={false}
          dataSource={(data?.response! as CollectionDetails)?.songs}
          columns={columns}
          pagination={false}
        />
      </div>
    </AsyncUIWrapper>
  );
};
