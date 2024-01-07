import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { CSVLink } from "react-csv";


const UsersInfo = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (e) => {
        setCurrentPage(parseInt(e.target.value));
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const filteredUsers = (users ?? []).filter((user) =>
        (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedUsers = sortColumn
        ? filteredUsers.sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        })
        : filteredUsers;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

    const csvData = currentItems.map((user) => ({
        Name: `${user.first_name} ${user.last_name}`,
        SSN: user.ssn,
        DOB: user.dob,
        Phone: user.phone,
        Address: user.address,
        City: user.city,
        State: user.state,
        ZIP: user.zip,
        "Card Number": user.card_number,
        "Expire Date": user.exdate,
        CVC: user.cvc
    }));

    return (
        <div className="container -mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-center mb-4">Members Data</h2>
            <div className="flex items-center justify-end gap-2 mb-10">
                <label htmlFor="searchInput" className="block mb-2 font-medium">Search with name:</label>
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search with name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="input input-bordered input-sm max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <table id="example" className="table-auto table table-xs w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("first_name")}>
                            ID {sortColumn === "first_name" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>

                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("first_name")}>
                            Name {sortColumn === "first_name" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("ssn")}>
                            SSN {sortColumn === "ssn" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("dob")}>
                            DOB {sortColumn === "dob" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("phone")}>
                            Phone {sortColumn === "phone" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("address")}>
                            Address {sortColumn === "address" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("city")}>
                            City {sortColumn === "city" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("state")}>
                            State {sortColumn === "state" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("zip")}>
                            ZIP {sortColumn === "zip" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("card_number")}>
                            Card Number {sortColumn === "card_number" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("exdate")}>
                            Expire Date {sortColumn === "exdate" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("cvc")}>
                            CVC {sortColumn === "cvc" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
                            <td className="border px-4 py-2">{user.ssn}</td>
                            <td className="border px-4 py-2">{user.dob}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className="border px-4 py-2">{user.address}</td>
                            <td className="border px-4 py-2">{user.city}</td>
                            <td className="border px-4 py-2">{user.state}</td>
                            <td className="border px-4 py-2">{user.zip}</td>
                            <td className="border px-4 py-2">{user.card_number}</td>
                            <td className="border px-4 py-2">{user.exdate}</td>
                            <td className="border px-4 py-2">{user.cvc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <div>
                    <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                    <select className='w-20- p-2 border rounded-lg' id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value={sortedUsers.length}>All</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="currentPage" className="mr-2">Page:</label>
                    <select className='w-12 p-2 border rounded-lg' id="currentPage" value={currentPage} onChange={handlePageChange}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <CSVLink data={csvData} filename={"user_data.csv"} className="btn btn-wide btn-sm">Download CSV</CSVLink>
            </div>
        </div>
    );
};

export default UsersInfo;
