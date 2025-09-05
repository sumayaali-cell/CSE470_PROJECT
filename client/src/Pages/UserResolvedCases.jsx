import { getResolvedCasesById } from "@/Api/postApi";
import { UserContext } from "@/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserResolvedCases = () => {
  const { userId } = useContext(UserContext);
  const [resolvedItems, setResolvedItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await getResolvedCasesById(userId);
      if (response?.data?.data) {
        setResolvedItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6 h-screen">
      <h2 className="text-xl font-semibold mb-4">Resolved Cases</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resolvedItems.length > 0 ? (
            resolvedItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-green-600 font-semibold">
                  Resolved
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No resolved cases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserResolvedCases;
