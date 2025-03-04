import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    Date: "",
    Description:""
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     const id = params.id?.toString() || undefined;
  //     if(!id) return;
  //     setIsNew(false);
  //     const response = await fetch(
  //       `http://localhost:5050/record/${params.id.toString()}`
  //     );
  //     if (!response.ok) {
  //       const message = `An error has occurred: ${response.statusText}`;
  //       console.error(message);
  //       return;
  //     }
  //     const record = await response.json();
  //     if (!record) {
  //       console.warn(`Record with id ${id} not found`);
  //       navigate("/");
  //       return;
  //     }
  //     setForm(record);
  //   }
  //   fetchData();
  //   return;
  // }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    console.log(form);
    const details = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:3000/api/v1/expanses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
      } 
    }catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({  amount: "",
        category: "",
        Date: "",
        Description:"" });
      navigate("/");
    }
  }
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create Expanse Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className=" gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Expanse Info
            </h2>
          </div>

          <div className="grid max-w-2xl  grid-cols-2 gap-x-6 gap-y-8 ">
            <div className="">
              <label
                htmlFor="amount"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Amount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the amount"
                    value={form.amount}
                    onChange={(e) => updateForm({ amount: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the Category"
                    value={form.category}
                    onChange={(e) => updateForm({ category: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 px-2"
                    value={form.Date}
                    onChange={(e) => updateForm({ Date: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="enter the description"
                    value={form.Description}
                    onChange={(e) => updateForm({ Description: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
            
            </div>
          </div>

          
        </div>
        <input
          type="submit"
          value="Save Expanses Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}