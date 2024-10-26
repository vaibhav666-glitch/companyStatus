// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomerBilling } from "./components/customerBilling";

function App() {
    const [data, setData] = useState({});
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://napi.authkey.io/api/react_test?from_date=2024-04-01&to_date=2024-06-30"
                );
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const companiesArray = [];

        // Traverse the input data object and populate companies array
        for (const company in data) {
            for (const key in data[company]) {
                for (const subKey in data[company][key]) {
                    const stats = data[company][key][subKey];

                    // Create an object with the desired structure
                    const obj = {
                        name: company,
                        totalCost: stats.totalcost || 0,
                        totalSubmission: parseInt(stats.delivered || 0) + parseInt(stats.failed || 0),
                        countries: [
                            {
                                name: "India",
                                code: key,
                                stats: {
                                    totalCost: stats.totalcost || 0,
                                    smsCost: stats.smscost || 0,
                                    delivered: stats.delivered || 0,
                                    failed: stats.failed || 0,
                                    other: stats.other || 0
                                }
                            }
                        ]
                    };

                    companiesArray.push(obj);
                }
            }
        }
        setCompanies(companiesArray);
    }, [data]); // Run only when `data` changes

    return (
        <>
            <CustomerBilling companies={companies} />
        </>
    );
}

export default App;
