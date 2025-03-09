import { useCollections } from "../dao";
import { AsyncUIWrapper, FilterDropdown } from "../components";
import { MusicCollectionsType } from "../types";
import { Input, Table, Typography } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import {
  convertDurationInSecondsToRequiredFormat,
  convertReleasedOnDateToRequiredFormat,
  convertSizeInBytesToMB,
} from "../utils";
import { useState } from "react";

export const MusicCollections = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState([""]);

  const { data, isLoading, failureReason } = useCollections(search, type);

  const columns: any[] = [
    {
      title: "Collection Name",
      dataIndex: "name",
      key: "name",
      width: "30.4%",
      render: (_: any, record: MusicCollectionsType) => (
        <div>
          <p>{record.name}</p>
          <Typography.Text
            type="secondary"
            style={{ color: "#677A90", fontSize: "12px" }}
          >
            {record.artist}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "8%",
    },
    {
      title: "Song Count",
      dataIndex: "songCount",
      key: "songCount",
      width: "8%",
    },
    {
      title: "Duration",
      dataIndex: "durationInSeconds",
      key: "durationInSeconds",
      width: "8%",
      render: (_: any, record: MusicCollectionsType) => {
        return convertDurationInSecondsToRequiredFormat(
          record.durationInSeconds
        );
      },
    },
    {
      title: "Size",
      dataIndex: "sizeInBytes",
      key: "sizeInBytes",
      width: "8%",
      render: (_: any, record: MusicCollectionsType) => {
        return convertSizeInBytesToMB(record.sizeInBytes);
      },
    },
    {
      title: "Released On",
      dataIndex: "releasedOn",
      key: "releasedOn",
      width: "13.4%",
      render: (_: any, record: MusicCollectionsType) => {
        return convertReleasedOnDateToRequiredFormat(record.releasedOn);
      },
    },
    {
      title: "",
      key: "action",
      width: "8.4%",
      render: (_: any, record: MusicCollectionsType) => (
        <>
          <EyeOutlined style={{ color: "#025992" }} />
          &nbsp;
          <Link href={`/collections/${record.id}`}>View Details</Link>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          background: "#fff",
          lineHeight: "24px",
          fontWeight: 500,
          color: "#29313A",
        }}
      >
        <p
          style={{
            padding: "24px",
            margin: 0,
            fontSize: "28px",
          }}
        >
          Overview
        </p>
      </div>
      <div
        className="table_container"
        style={{
          margin: "24px",
          border: "1px solid #E6ECF0",
          background: "#fff",
        }}
      >
        <div style={{ padding: "16px" }}>
          <Input
            size="large"
            placeholder="Search & Press Enter"
            allowClear
            onPressEnter={(e) => setSearch(e.currentTarget.value)}
            suffix={<SearchOutlined />}
            style={{ width: "20.76%" }}
          />
          &emsp;
          <FilterDropdown onSelectedOption={(value) => setType(value)} />
        </div>
        <AsyncUIWrapper failureReason={failureReason} isLoading={isLoading}>
          <Table
            style={{ borderRadius: "8px" }}
            size="large"
            bordered={false}
            dataSource={data?.response}
            columns={columns}
            pagination={false}
          />
        </AsyncUIWrapper>
      </div>
    </div>
  );
};
