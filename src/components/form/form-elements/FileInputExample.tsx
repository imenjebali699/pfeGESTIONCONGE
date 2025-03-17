"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import TextArea from "../input/TextArea";
import { useState } from "react";

export default function FileInputExample() {
    const [message, setMessage] = useState("");
    
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };
   

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />

      </div>

   
          <div className="space-y-6">
           
            <div>
              <Label>Description</Label>
              <TextArea
                value={message}
                onChange={(value) => setMessage(value)}
                rows={6}
              />
            </div>
          </div>
        </ComponentCard>
     
  );
}


