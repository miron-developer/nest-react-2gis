import { useCallback, useEffect, useState } from "react";
import { Table, Input, Select, Pagination, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import axios from "axios";

import { sorterDates, sorterLocaleCompare } from "@/utils/sorter";
import { mockAvailableDates } from "@/utils/mock";

import "./style.scss";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

enum SearchColumn {
  "name" = "name",
  "location" = "location",
  "description" = "description",
}

interface SearchParams {
  q: string;
  column: SearchColumn;
  page: number;
  startDate?: string;
  endDate?: string;
}

// about sorts. 2gis doesnt have sorts by fields, so just sort what we get right now
const columns = [
  { title: "Name", dataIndex: "name", sorter: sorterLocaleCompare },
  { title: "Description", dataIndex: "full_name", sorter: sorterLocaleCompare },
  { title: "Location", dataIndex: "address_name", sorter: sorterLocaleCompare },
  {
    title: "Available Dates (start)",
    dataIndex: "available_date_start",
    sorter: sorterDates,
  },
  {
    title: "Available Dates (end)",
    dataIndex: "available_date_end",
    sorter: sorterDates,
  },
];

const HotelTable = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsTotal, setHotelsTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState(SearchColumn.name);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>();

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) setDateRange(dates);
  };

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      setSearchError("");

      const params: SearchParams = {
        q: searchQuery,
        column: searchColumn, // 2gis doenst have searching by column. it always search by all, just mocking and sending
        page: currentPage,
      };

      if (dateRange?.[0]) {
        params.startDate = dateRange[0]
          ? dateRange[0].format("YYYY-MM-DD")
          : undefined;
      }
      if (dateRange?.[1]) {
        params.endDate = dateRange[1]
          ? dateRange[1].format("YYYY-MM-DD")
          : undefined;
      }

      const response = await axios.get<SearchResponse>(
        "http://localhost:3000/hotels/search/",
        { params },
      );
      if (response.status >= 300) {
        throw new Error("error of getting data");
      }
      if (response.data.meta.error) {
        throw new Error(response.data.meta.error.message);
      }

      setHotels(mockAvailableDates(response.data.result.items));
      setHotelsTotal(response.data.result.total);
    } catch (error) {
      console.error("Error fetching hotels", error);

      if (error instanceof Error) {
        setSearchError(`Error getting items: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchColumn, currentPage, dateRange]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <div className="table--container">
      <div className="table--searches">
        <RangePicker onChange={handleDateChange} />
        <Select defaultValue={searchColumn} onChange={setSearchColumn}>
          <Option value={SearchColumn.name}>Name</Option>
          <Option value={SearchColumn.description}>Description</Option>
          <Option value={SearchColumn.location}>Location</Option>
        </Select>
        <Search
          className="table--search-input"
          placeholder="Search hotels (pls type full name, 2gis dont recognize)"
          onSearch={(value) => setSearchQuery(value)}
          enterButton
        />
      </div>
      {searchError ? (
        <p className="table--error">{searchError}</p>
      ) : (
        <Table
          className="table--body"
          dataSource={hotels}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      )}

      <Pagination
        current={currentPage}
        pageSize={10}
        total={hotelsTotal}
        showSizeChanger={false}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HotelTable;
