import React,{useState,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js/auto';
import apiEndpoints from "../../Api";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const CategoryChart = ({ isSaveClicked }) => {
    const [adminDetails, setAdminDetails] = useState("");

  useEffect(() => {
    // Assuming you have the admin ID, replace '4' with the actual admin ID
    const adminId = 4;

    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(apiEndpoints.getAdminDetails(adminId));

        if (response.ok) {
          const Data = await response.json();
          setAdminDetails(Data.data);
                    console.log(Data.data);

        } else {
          console.error("Error fetching admin details:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchAdminDetails();
    if (isSaveClicked) {
      fetchAdminDetails();
    }
  }, [isSaveClicked]);
  const amounts = adminDetails.amount ? Object.values(adminDetails.amount).map((value) => value) : [];
  console.log(amounts);
  
  const chartData = {
    labels: ['Category_6', 'Category_7', 'Category_8', 'Category_9', 'Category_10'],
    datasets: [
      {
        label: 'Price Levels',
        data:amounts,
        barPercentage: 0.5,
     backgroundColor: ['#F0C3F1', '#F0C3F1', '#F0C3F1', '#F0C3F1', '#F0C3F1'],
      },
    ],
  };

  const chartOptions = {
    scales: {
 
        y: {
            
          beginAtZero: true,
          max: 250,
          min: 0,
          stepSize: 50,
          callback: function (value) {
            if (value >= 200) {
              return 'Above 200';
            } else if (value >= 150) {
              return '150-200';
            } else if (value >= 100) {
              return '100-150';
            } else if (value >= 50) {
              return '50-100';
            } else {
              return 'Below 50';
            }
            
          },
     
        
          
        },
        
      },
      plugins: {
        legend: {
          display: false, 
        }
    },
    
    layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    };
    

  return (
    <div style={{ width: '500px',marginTop:"50px",height:"300px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CategoryChart;
