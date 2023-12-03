import React, { useState, useEffect } from "react";
import "./admin.css";
import apiEndpoints from "../../Api";
import Graph from "../Components/Graph";

function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState("");
  const [adminDetails, setAdminDetails] = useState("");
  const [customSongAmount, setCustomSongAmount] = useState(99);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Added readOnly logic
    setAdminDetails({
      ...adminDetails,
      charge_customers: event.target.value === "yes",
    });
    
  };

  const handleCustomSongAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10);
    if (amount < 99) {
      setCustomSongAmount(99); // Reset to minimum if user goes below
      return; // Prevent further processing if value is invalid
    }
    setCustomSongAmount(amount);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedAmount = {
      ...adminDetails.amount,
      [name]: parseInt(value, 10),
    };

    setAdminDetails({
      ...adminDetails,
      amount: updatedAmount,
    });
  };

  useEffect(() => {
    const adminId = 4;

    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(apiEndpoints.getAdminDetails(adminId));

        if (response.ok) {
          const Data = await response.json();
          setAdminDetails(Data.data);
          const updatedAdminDetails = {
            ...Data.data,
            amount: Data.data.amount || {}, 
          };
          setAdminDetails(updatedAdminDetails);
          setSelectedOption(
            updatedAdminDetails.charge_customers ? "yes" : "no"
          );
          setCustomSongAmount(updatedAdminDetails.amount.category_6 || 99);
        } else {
          console.error("Error fetching admin details:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleSaveButtonClick = async () => {
    try {
      if (!adminDetails.charge_customers) {
        if (customSongAmount < 99) {
          alert(
            "Custom song amount must be at least 99 when charging is disabled."
          );
          return;
        }
      }
      const response = await fetch(apiEndpoints.updateAdminPrice(4), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          charge_customers: adminDetails.charge_customers,
          amount: {
            category_6: customSongAmount,
            category_7: adminDetails.amount
              ? adminDetails.amount.category_7
              : 0,
            category_8: adminDetails.amount
              ? adminDetails.amount.category_8
              : 0,
            category_9: adminDetails.amount
              ? adminDetails.amount.category_9
              : 0,
            category_10: adminDetails.amount
              ? adminDetails.amount.category_10
              : 0,
          },
        }),
      });
      if (response.ok) {
        const detailsResponse = await fetch(apiEndpoints.getAdminDetails(4));

        if (detailsResponse.ok) {
          const updatedData = await detailsResponse.json();
          setAdminDetails(updatedData.data);
        } else {
          console.error(
            "Error fetching updated admin details:",
            detailsResponse.statusText
          );
        }
      } else {
        console.error("Error updating admin prices:", response.statusText);
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
    setIsSaveClicked(true);
  };

  return (
    <div className="dashboard">
      <h1>{`${adminDetails.name}, ${adminDetails.location} on DhunJam`}</h1>
      <div className="radiobutton">
        <p>Do you want to charge your customers for requesting songs?</p>
        <label>
          <input
            className="radio"
            type="radio"
            value="yes"
            checked={selectedOption === "yes"}
            onChange={handleOptionChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            className="radio"
            value="no"
            checked={selectedOption === "no"}
            onChange={handleOptionChange}
          />
          No
        </label>
      </div>
      <div className="customsongs">
      <p>Custom song request amount </p>
      <input
        type="number"
        value={customSongAmount}
        onChange={handleCustomSongAmountChange}
        // Updated logic for custom amount
        disabled={!adminDetails.charge_customers || customSongAmount < 99}
        readOnly={!adminDetails.charge_customers}
        min={99}
        required={true}
      />
    </div>
      <div className="regularsongs">
        <p>Regular song request amount from high to low </p>
        <div className="regularsongs-inputContainer">
        <input
            type="number"
            value={
              adminDetails.amount ? adminDetails.amount.category_7 || 59 : 59
            }
            onChange={handleInputChange}
            name="category_"
            min={59}
            required
            disabled={!adminDetails.charge_customers}
            readOnly={!adminDetails.charge_customers}
            
          />
          <input
            type="number"
            value={
              adminDetails.amount ? adminDetails.amount.category_8 || 59 : 59
            }
            onChange={handleInputChange}
            name="category_8"
            min={59}
            required
            disabled={!adminDetails.charge_customers}
            readOnly={!adminDetails.charge_customers}
          />
          <input
            type="number"
            value={
              adminDetails.amount ? adminDetails.amount.category_9 || 39 : 39
            }
            onChange={handleInputChange}
            name="category_9"
            min={39}
            required
            disabled={!adminDetails.charge_customers}
            readOnly={!adminDetails.charge_customers}
          />
          <input
            type="number"
            value={
              adminDetails.amount ? adminDetails.amount.category_10 || 19 : 19
            }
            onChange={handleInputChange}
            name="category_10"
            min={19}
            required
            disabled={!adminDetails.charge_customers}
            readOnly={!adminDetails.charge_customers}
          />
        </div>
      </div>
      <div className="graph">
        <Graph isSaveClicked={isSaveClicked}   disabled={!adminDetails.charge_customers?true:false}/>
      </div>
      <button
        disabled={!adminDetails.charge_customers}
        onClick={handleSaveButtonClick}
        className="save"
      >
        Save
      </button>
    </div>
  );
}

export default AdminDashboard;
