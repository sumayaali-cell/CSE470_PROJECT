import React, { useState, useEffect, useContext } from "react";
import { getAllPost, submitReport } from "@/Api/postApi";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "@/Context/UserContext";

const ItemList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [tab, setTab] = useState("found");
  const [items, setItems] = useState([]);
  const [openReport, setOpenReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportingItem, setReportingItem] = useState(null);
  const navigate = useNavigate();
  const {userId} = useContext(UserContext)
  const fetchPosts = async () => {
    try {
      const query = {
        status: tab,
        itemName: search,
        category: category || undefined,
        date: date || undefined,
      };
      const response = await getAllPost(query);
      setItems(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [tab]);

  const handleSearch = () => fetchPosts();

  const handleNavigate = (id) => {
    navigate(`/location/${id}`);
  };

  const handleReportClick = (item) => {
    setReportingItem(item);
    setOpenReport(true);
  };

  const handleSubmitReport = async() => {
    console.log("Report submitted for item:", reportingItem?._id, "Text:", reportText);
    try{
      await submitReport(reportingItem,userId,reportText)
    }catch(error){
      console.log(error)
    }
    setReportText("");
    setReportingItem(null);
    setOpenReport(false);
  };

  return (
   <div className="min-h-screen bg-white px-4 py-10 text-black">
  <div className="max-w-6xl mx-auto">
    {/* Tabs */}
    <Tabs value={tab} onValueChange={setTab} className="mb-8">
      <TabsList className="bg-gray-100/50 p-1 w-full max-w-xs mx-auto flex justify-center rounded-lg">
        <TabsTrigger
          value="found"
          className={`px-6 py-2 text-sm font-medium rounded-lg transition ${
            tab === "found" ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:text-black"
          }`}
        >
          Found
        </TabsTrigger>
        <TabsTrigger
          value="lost"
          className={`px-6 py-2 text-sm font-medium rounded-lg transition ${
            tab === "lost" ? "bg-red-600 text-white shadow" : "text-gray-600 hover:text-black"
          }`}
        >
          Lost
        </TabsTrigger>
      </TabsList>
    </Tabs>

    {/* Search Filters */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Input
        placeholder="🔍 Search by item name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-100 border border-gray-300 text-black placeholder:text-gray-400"
      />
      <Input
        placeholder="📂 Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-100 border border-gray-300 text-black placeholder:text-gray-400"
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-gray-100 border border-gray-300 text-black"
      />
    </div>

    <div className="text-center mb-12">
      <Button onClick={handleSearch} className="bg-black hover:bg-indigo-700 px-6 text-white">
        🔎 Filter
      </Button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="flex flex-col">
            <Link
              to={`/text/${item.user}`}
              className="relative group w-40 h-64 overflow-hidden shadow-md border border-gray-300 hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:8000/${item.imageUrl}`}
                alt={item.itemName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs font-semibold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                {item.itemName}
              </div>
            </Link>

            <div className="flex gap-2 mt-2">
              <Button variant="default" onClick={() => handleNavigate(item._id)}>
                View
              </Button>

              <Button variant="default" className="bg-red-600 text-white" onClick={() => handleReportClick(item)}>
                Report
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg col-span-full mt-20">No items found.</p>
      )}
    </div>

    {/* Report Modal */}
    <Dialog open={openReport} onOpenChange={setOpenReport}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report Item</DialogTitle>
          <DialogDescription>Describe the issue you want to report.</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Write your report..."
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          className="w-full mb-4 text-black"
        />
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpenReport(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitReport}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</div>

  );
};

export default ItemList;
