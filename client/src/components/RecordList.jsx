import { useEffect, useState } from "react";

const Record = ({ record }) => {
  const { amount, category, Date, Description } = record;
  const dateFormat = Date.split("T")[0];
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle">{amount}</td>
      <td className="p-4 align-middle">{category}</td>
      <td className="p-4 align-middle">{dateFormat}</td>
      <td className="p-4 align-middle">{Description}</td>
    </tr>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(null);

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/expanses");
      const responseData = await res.json();
      const data = responseData.data;
      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

 

  const fetchTotalExpenses = async () => {
    if (!startDate || !endDate) return alert("Please select start and end date");
    try {
      
      const res = await fetch(`http://localhost:3000/api/v1/expanses/total?start=${startDate}&end=${endDate}`);
      const responseData = await res.json();
      setRecords(responseData.data);
      setFilteredRecords(responseData.data);
      setEndDate("");
      setStartDate("");
    totalExpanse(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  function totalExpanse(expanse){
    let total =0;
    expanse.forEach(element => {
      total += element.amount;
    });
    setTotalExpenses(total);


  }

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleFilterRecords = async ()=>{
    try {
      if(categoryFilter && dateFilter){
        let url = `http://localhost:3000/api/v1/expanses/filter?category=${categoryFilter}&Date=${dateFilter}`;
      
        const res = await fetch(url);
        const responseData = await res.json();
        setFilteredRecords(responseData.data || []);
        setEndDate("");
        setStartDate("");
        setTotalExpenses(null);
      }else{
        alert("Please select a category and date to filter records");
      }
    } catch (error) {
      console.error(error);

  }

  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Expenses Records</h3>
      <div className="p-4 flex gap-4">
        <select
          className="border rounded p-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(records.map((d) => d.category))].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button type="button" onClick={handleFilterRecords} className="border rounded-lg px-4 py-2 bg-blue-500 text-white">Filter</button>
      </div>
      <div className="p-4 flex gap-4">
        <input
          type="date"
          className="border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchTotalExpenses} className="border rounded-lg px-2 py-2 bg-blue-500 text-white">Get Total</button>
      </div>
      {totalExpenses !== null && (
        <div className="p-4 font-semibold">Total Expenses: ₹{totalExpenses}</div>
      )}
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="h-12 px-4 text-left">Amount</th>
                <th className="h-12 px-4 text-left">Category</th>
                <th className="h-12 px-4 text-left">Date</th>
                <th className="h-12 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <Record key={record._id} record={record} />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
