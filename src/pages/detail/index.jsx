import { useParams } from "react-router-dom";
import Data from "../../data";
import { useState, useEffect } from "react";
import Charts from "../../component/chart";
import Bars from "../../component/chart/bar";

const Detail = () => {
  const [data, setData] = useState([]);
  let { sn, jenisMesin } = useParams();
  // const jm = useParams();
  // console.log(jenisMesin)
  useEffect(() => {
    const res = Data.find((item) => item.serialNumber === sn);
    if (res) {
      setData(res);
      //   console.log(data.find(item =>  item.Detail === jm))
    }
  }, [sn]);
  // console.log(data?.detail?.[jenisMesin])
  return (
    <div className="container" style={{ fontFamily: "sans-serif" }}>
      <div className="row col-12 col-sm-12 col-md-12  mt-5 d-flex justify-content-center">
        <div className="col-lg-4 col-md-5 col-sm-6 col-sm-8 col-10">
          <Charts data={data?.detail?.[jenisMesin]} />
        </div>
        <div className="col-lg-6 col-md-7 col-sm-12 col-12">
          <Bars data={data?.detail?.[jenisMesin]} />
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <table
          class="table table-borderless mt-2 col-12 "
          style={{ borderCollapse: "separate", borderSpacing: "0 20px" }}
        >
          <thead>
            <tr className="text-primary border-0" style={{ border: "none" }}>
              <th scope="col">Nama Sparepart</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Teknisi</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.detail?.[jenisMesin].map((el) => {
              return (
                <tr
                  className="p-2"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "1px 2px 3px 4px rgba(12,12,12,0.2)",
                  }}
                >
                  <td className="col-6">{el.namaSparepart}</td>
                  <td>{el.tanggal}</td>
                  <td>{el.Teknisi}</td>
                  <td>{el.jumlah}</td>
                  <td>
                    {el.status === "proses" ? (
                      <span className="text-warning">{el.status} </span>
                    ) : (
                      <span className="text-success">{el.status} </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
