import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    bedrooms: 0,
    bathrooms: 0,
    living_area: 0,
    lot_area: 0,
    floors: 0,
    waterfront: 0,
    views: 0,
    area_without_basement: 0,
    basement_area: 0,
    renovation_year: 0,
    living_area_renov: 0,
    lot_area_renov: 0,
    schools_nearby: 0,
    airport_distance: 0,
    old: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        features: formData
      })
    });

    const data = await response.json();
    alert(`Predicted Price: ${data.prediction}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 bg-[url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)] bg-cover">
        <form onSubmit={handleSubmit} className="bg-white/85 shadow-lg rounded-xl p-8 w-full max-w-4xl">
          
          <h1 className="text-2xl font-bold text-center mb-6">
            House Price Prediction Form
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label>Number of Bedrooms</label>
              <input type="number" name="bedrooms" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Number of Bathrooms</label>
              <input type="number" name="bathrooms" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Living Area</label>
              <input type="number" name="living_area" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Lot Area</label>
              <input type="number" name="lot_area" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Number of Floors</label>
              <input type="number" name="floors" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Waterfront Present</label>
              <select name="waterfront" onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label>Number of Views</label>
              <input type="number" name="views" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Area of the House (excluding basement)</label>
              <input type="number" name="area_without_basement" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Area of the Basement</label>
              <input type="number" name="basement_area" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Renovation Year</label>
              <input type="number" name="renovation_year" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Living Area Renovated</label>
              <input type="number" name="living_area_renov" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Lot Area Renovated</label>
              <input type="number" name="lot_area_renov" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Number of Schools Nearby</label>
              <input type="number" name="schools_nearby" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Distance from Airport</label>
              <input type="number" name="airport_distance" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
              <label>Age of the House (Old)</label>
              <input type="number" name="old" onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>

        </form>
      </div>
    </>
  );
}

export default App;