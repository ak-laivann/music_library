import { Dropdown, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const filterOptions = ["Album", "EP", "Single"];

export const FilterDropdown = (props: {
  onSelectedOption: (values: string[]) => void;
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (checkedValues: string[]) => {
    setSelectedFilters(checkedValues);
    props.onSelectedOption(checkedValues);
  };

  const menu = (
    <div style={{ padding: "16px", background: "#fff" }}>
      {filterOptions.map((option) => (
        <div
          key={option}
          style={{ display: "flex", alignItems: "center", height: "32px" }}
        >
          <Checkbox
            checked={selectedFilters.includes(option)}
            onChange={(e) => {
              const updatedFilters = e.target.checked
                ? [...selectedFilters, option]
                : selectedFilters.filter((f) => f !== option);
              handleChange(updatedFilters);
            }}
          >
            {option}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={["click"]}
      dropdownRender={() => menu}
    >
      <Button
        style={{
          background: selectedFilters.length > 0 ? "#EBF5FF" : "#E1E4E9",
          color: selectedFilters.length > 0 ? "#084782" : "#000",
          border: selectedFilters.length > 0 ? "1px solid #084782" : undefined,
          borderRadius: "8px",
        }}
        size="large"
      >
        Type{" "}
        {selectedFilters.length > 0 && "( " + selectedFilters.length + " )"}{" "}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
