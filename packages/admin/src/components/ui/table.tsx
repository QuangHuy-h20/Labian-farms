import { ComponentProps, useState } from "react";

const Table = (props: ComponentProps<any>) => {
  const initDataShow =
    props?.limit && props?.bodyData
      ? props?.bodyData?.slice(0, Number(props?.limit))
      : props?.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);
  const [currPage, setCurrPage] = useState(0);

  let pages = 1;

  let range: number[] = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props?.bodyData?.length / Number(props.limit));
    pages = props?.bodyData?.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array.from(Array(pages).keys())];
  }

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div>
      <div className="overflow-y-auto">
        <table className="w-full min-w-[400px]">
          {props.headData && props.renderHead ? (
            <thead className="bg-gray-200 ease-out">
              <tr className="w-full">
                {props.headData.map((item: any) => props.renderHead(item))}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody className="bg-white">
              {dataShow.map((item: any) => props.renderBody(item))}
            </tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="flex w-full justify-end items-center mt-5">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
