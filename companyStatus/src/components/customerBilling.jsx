import React, { useState, useEffect } from 'react';

export const CustomerBilling = ({ companies }) => {
    const [totalCost, setTotalCost] = useState(0);
    const [totalSubmissions, setTotalSubmissions] = useState(0);
    const [companyName, setCompanyName] = useState('');
    const [toDate, setToDate] = useState("2024-09-09");
    const [fromDate, setFromDate] = useState("2024-10-26");
    const [filteredData, setFilteredData] = useState(companies);
    const [toggleDetailIndex, setToggleDetailIndex] = useState(null); 

    useEffect(() => {
        if (companies.length > 0) {
            const totalCost = companies.reduce((acc, val) => acc + (Number(val.totalCost) || 0), 0);
            const totalSubmissions = companies.reduce((acc, val) => acc + (Number(val.totalSubmission) || 0), 0);

            setTotalCost(totalCost);
            setTotalSubmissions(totalSubmissions);
            setFilteredData(companies); // Set initial filtered data to all companies
        }
    }, [companies]); 

    const handleSearch = (e) => {
        e.preventDefault();
        // If companyName is empty, reset filteredData to show all companies
        if (companyName === '') {
            setFilteredData(companies);
            return;
        }
        
        // Filter companies based on selected company name
        const filtered = companies.filter(company => {
            return company.name.toLowerCase() === companyName.toLowerCase();
        });
        
        setFilteredData(filtered);
    }

    return (
        <div className="p-6 bg-white">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Customer Billing</h2>
                
                {/* Search filters */}
                <div className="flex gap-4 mb-6">   
                    <div className="flex-1">
                        <select 
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Company</option>
                            {companies.map((company, index) => (
                                <option key={index} value={company.name}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <input 
                        type="date" 
                        className="p-2 border rounded"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                    <input 
                        type="date" 
                        className="p-2 border rounded"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>

                {/* Total stats */}
                <div className="text-sm mb-6">
                    Total Cost of <span className="text-blue-600">All</span> Company is{' '}
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">
                        {totalCost}
                    </span>{' '}
                    and total Submission is{' '}
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">
                        {totalSubmissions}
                    </span>
                </div>
            </div>

            {/* Company listings */}
            {filteredData.map((company, index) => (
                <div key={index} className="mb-4">
                    {/* Company header */}
                    <div
                        onClick={() => setToggleDetailIndex(toggleDetailIndex === index ? null : index)} // Toggle only the clicked company's details
                        className="bg-blue-100 p-3 rounded-t"
                    >
                        <div className="flex items-center justify-between">
                            <div className="bg-gray-800 text-white px-4 py-1 rounded">
                                {company.name}
                            </div>
                            <div className="flex gap-4">
                                <span>Total Cost: <span className="bg-cyan-500 text-white px-2 py-1 rounded">{company.totalCost}</span></span>
                                <span>Total Submission: <span className="bg-cyan-500 text-white px-2 py-1 rounded">{company.totalSubmission}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Country details */}
                    {toggleDetailIndex === index && company.countries.map((country, countryIndex) => (
                        <div key={countryIndex} className="mt-4">
                            <div className="text-gray-600 mb-2">{country.name} ({country.code})</div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-blue-50">
                                        <th className="border p-2 text-left">TOTAL COST</th>
                                        <th className="border p-2 text-left">SMS COST</th>
                                        <th className="border p-2 text-left">DELIVERED</th>
                                        <th className="border p-2 text-left">FAILED</th>
                                        <th className="border p-2 text-left">OTHER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2">{country.stats.totalCost}</td>
                                        <td className="border p-2">{country.stats.smsCost}</td>
                                        <td className="border p-2">{country.stats.delivered}</td>
                                        <td className="border p-2">{country.stats.failed}</td>
                                        <td className="border p-2">{country.stats.other}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) }
                </div>
            ))}
        </div>
    );
};

export default CustomerBilling;
