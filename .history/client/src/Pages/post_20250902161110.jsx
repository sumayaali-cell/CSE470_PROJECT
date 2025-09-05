import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { uploadPost } from "@/Api/postApi";
import { UserContext } from "@/Context/UserContext";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const PostForm = () => {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([
    "Electronics",
    "Wallet",
    "Keys",
    "Documents",
    "Others",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  
  const [location, setLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDl409IJsG4lVc1XtSxlUZHxKUIKi9pNyw',
  });

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setSelectedCategory(trimmed);
      setNewCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("category", selectedCategory);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("date", date);
    formData.append("user", userId);

    if (location) {
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
    }

    if (image) formData.append("image", image);

    try {
      for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}

      await uploadPost(formData);
      alert("Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen px-4 py-12 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-2xl backdrop-blur-md  p-10 "
      >
        <h2 className="text-4xl text-black font-bold mb-10 text-center tracking-tight">
          📍 Report Lost or Found Item
        </h2>

        <div className="space-y-6">
          {/* Item Name */}
          <Input
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="  text-black placeholder-zinc-400"
          />

          {/* Category Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className=" border border-zinc-600 text-black">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className=" border-zinc-700 text-black">
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                placeholder="Add New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1  border border-zinc-600 text-black"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCategory}
                className="text-black"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Date */}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" text-black"
          />

          {/* Image Upload */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className='text-white'
          />

          {/* Google Map */}
          <div className="h-72 w-full rounded-xl overflow-hidden ">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={location || { lat: 23.8103, lng: 90.4125 }} // Dhaka default
                zoom={12}
                onClick={(e) =>
                  setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                }
              >
                {location && <Marker position={location} />}
              </GoogleMap>
            ) : (
              <p>Loading Map...</p>
            )}
          </div>

          {/* Status */}
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="flex gap-6"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="lost" id="lost" />
              <span className="text-sm text-black">Lost</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="found" id="found" />
              <span className="text-sm text-black">Found</span>
            </label>
          </RadioGroup>

          {/* Description */}
          <Textarea
            placeholder="Describe the item and location"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" text-black"
          />

          {/* Submit */}
          <Button
            variant="outline"
            type="submit"
            className="w-full text-black text-lg font-semibold py-3"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
