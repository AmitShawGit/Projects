import axios from "axios";
import ChartComp from "../components/ChartComp";
import { useEffect, useState } from "react";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  let [apiData, setApiData] = useState([])
  let fetchData = async () => {
    try {
      let data = await axios.get('https://dummyjson.com/c/036e-35a9-47e3-937f')
      let response = setApiData(data)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => { fetchData() }, [])


  return (
    <>
      <div>Dashboard</div>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {/* line graph  */}
              <ChartComp chartData={apiData?.data?.monthlySales} />
            </div>

          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <PieChart categories={apiData?.data?.salesByCategory} />
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Dashboard;
