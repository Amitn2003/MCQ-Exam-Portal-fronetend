import React, { useEffect, useState } from 'react';
import { getSubcategoryAnalytics } from '../../api/analyticsApi';
import { useAuth } from '../../hooks/useAuth';
import { Bar } from 'react-chartjs-2';


// Define the subcategories data
const categorySubcategories = {
    Aptitude: ['Average', 'Algebra', 'Profit and Loss', "LCM and HCF", "Work and Wages", "Pipes and Cisterns", "Time Speed Distance", "Trains, Boats and Streams", "Percentages", "Ratio", "Age", 'All'],
    Reasoning: ['Logical', 'Verbal', 'Non-Verbal', "English", "Puzzles", "Fill in the Blanks", "Comprehension Passages", "Series: Missing Numbers", "Odd One Out", 'All'],
    'Campus Placement': ['All'],
    JECA: ['DSA', 'C', 'C++', 'OOPS', 'Networking', 'OS', 'Machine Learning', 'DBMS', 'Software Engineering', 'UNIX', "All"],
};



const SubcategoryAnalytics = () => {
    const { user } = useAuth();
    const [analytics, setAnalytics] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
     // State to keep track of the selected category and subcategories
     const [selectedCategory, setSelectedCategory] = useState('JECA');
     const [subcategories, setSubcategories] = useState(categorySubcategories['JECA']);
    

     // Handle category change
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSubcategories(categorySubcategories[category]);
        setPage(0); // Reset to the first page when category changes
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSubcategoryAnalytics(user.token, selectedCategory, page);
                console.log(data)
                const { analytics: fetchedAnalytics, 
                    totalPages: total, 
                    startDate: start, 
                    endDate: end } = data;
                // Filter out entries with percentage <= 0
                const filteredData = fetchedAnalytics.filter(a => a.percentage > 0 && subcategories.includes(a.subcategory));
                console.log(filteredData)

                // Update state with fetched data
                setAnalytics(filteredData);
                setTotalPages(total);
                setStartDate(new Date(start));
                setEndDate(new Date(end));


                // if (filteredData.length === 0 && page > 0) {
                //     // If no data returned and not on the first page, reset to previous page
                //     setPage(page - 1);
                //     return;
                // }
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
            }
        };

        fetchData();
    }, [user.token, page , selectedCategory, subcategories]);

    const chartData = {
        labels: analytics.map(a => a.subcategory),
        datasets: [
            {
                label: 'Performance (%)',
                data: analytics.map(a => a.percentage),
                backgroundColor: '#5cb85c',
            },
        ],
    };

    // <div>
    //     <h2>Subcategory Performance</h2>
    //     <div style={{ height: '400px', overflowY: 'auto' }}>
    //     <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }}  className="relative h-80 mb-4" />
    //     </div>
    //     <div className="flex justify-between mt-4">
    //         <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
    //         <button onClick={() => setPage(page + 1)}>Next</button>
    //     </div>
    // </div>








    //     <div className="p-4 bg-white text-black">
    //     <div className="mb-4">
    //         <label htmlFor="category" className="block text-lg font-medium text-gray-700">Select Category:</label>
    //         <select
    //             id="category"
    //             value={selectedCategory}
    //             onChange={handleCategoryChange}
    //             className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         >
    //             {Object.keys(categorySubcategories).map(category => (
    //                 <option key={category} value={category}>
    //                     {category}
    //                 </option>
    //             ))}
    //         </select>
    //     </div>
        
    //     <div className="relative h-80 mb-4">
    //         <div style={{ height: '400px', overflowY: 'auto' }}>
    //             <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    //         </div>
    //     </div>
    //     <br/>
    //     <br/>
    //     <br/>
        
    //     <div className="flex justify-between mt-4">
    //         <button
    //             onClick={() => setPage(page - 1)}
    //             disabled={page === 0}
    //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
    //         >
    //             Previous
    //         </button>
    //         <button
    //             onClick={() => setPage(page + 1)}
    //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //         >
    //             Next
    //         </button>
    //     </div>
    // </div>
    return (
        <div className="p-4 bg-white text-black dark:bg-gray-800 dark:text-white">
        <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-medium text-gray-800 dark:text-white">Subject specific analysis:</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            >
                {Object.keys(categorySubcategories).map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
        <div className="mt-4 text-sm text-gray-600 m-auto flex justify-center dark:text-white">
            <p>Date Range: {startDate.toDateString()} - {endDate.toDateString()}</p>
        </div>
        
        <div className="relative h-80 mb-4 cursor-help">
            <div style={{ height: '400px', overflowY: 'auto' }}>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
        <br />
        <br />


        <div className="flex justify-between items-center mt-4 ">
        <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${page === 0 ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-400' : ''}`}
                >
                    Previous
                </button>
            <span className="px-4 py-2">
                Page {page + 1} of {totalPages}
            </span>
            <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${page >= totalPages - 1 ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-400 ' : ''}`}
                >
                    Next
                </button>
        </div>

        
    </div>
    );
};

export default SubcategoryAnalytics;
