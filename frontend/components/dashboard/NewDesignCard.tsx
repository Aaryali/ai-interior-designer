'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

interface NewDesignCardProps {
  onSampleRoomSelected?: (roomName: string) => void;
  onUploadInitiated?: () => void;
}

export const NewDesignCard: React.FC<NewDesignCardProps> = ({
  onSampleRoomSelected,
  onUploadInitiated
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Future Integration Hook:
   * Will dispatch multipart/form-data payload to FastAPI backend endpoint `/api/rooms/upload`
   */
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFileName(file.name);
    setIsSimulatingUpload(true);
    setUploadComplete(false);

    if (onUploadInitiated) onUploadInitiated();

    // UI-only mock upload transition to demonstrate workflow
    setTimeout(() => {
      setIsSimulatingUpload(false);
      setUploadComplete(true);
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSampleClick = () => {
    if (onSampleRoomSelected) {
      onSampleRoomSelected('Scandinavian Living Room Sample');
    }
    setSelectedFileName('sample-scandinavian-living-room.jpg');
    setUploadComplete(true);
  };

  return (
    <div className="bg-[#FCFBF9] border border-[#DED8CB]/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(24,23,22,0.04)] relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        {/* Left Side: Information & Actions */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C27453]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
              Room Ingestion
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#181716] tracking-tight mb-2">
            Start with your room.
          </h3>

          <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-6">
            Upload a photo or multiple views of your space and let AI understand the room before you redesign it.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/heic"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="inline-flex items-center gap-2 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-[#C27453]" />
              <span>Upload Room</span>
            </button>

            <button
              onClick={handleSampleClick}
              type="button"
              className="inline-flex items-center gap-2 bg-[#F5F1E9] hover:bg-[#EAE5DC] text-[#181716] border border-[#DED8CB] text-xs sm:text-sm font-medium px-4 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Try Sample Room</span>
            </button>
          </div>

          {/* Supported Formats Note */}
          <div className="mt-4 flex items-center gap-2 text-[11px] text-[#A8A29E]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Accepts JPG, PNG, or HEIC • Multiple angles supported</span>
          </div>
        </div>

        {/* Right Side: Interactive Drag & Drop Area */}
        <div className="w-full lg:w-80 shrink-0">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#C27453] bg-[#F5F1E9]/80 scale-[1.01]'
                : 'border-[#DED8CB] bg-[#FAF8F5] hover:bg-[#F5F1E9]/50 hover:border-[#78716C]'
            }`}
          >
            {isSimulatingUpload ? (
              <div className="py-4 flex flex-col items-center justify-center gap-2 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#181716]">
                  <UploadCloud className="w-5 h-5 text-[#C27453]" />
                </div>
                <p className="text-xs font-medium text-[#181716]">
                  Processing upload preview...
                </p>
                <span className="text-[10px] text-[#78716C]">
                  Simulating room ingestion
                </span>
              </div>
            ) : uploadComplete ? (
              <div className="py-2 flex flex-col items-center justify-center gap-2 text-left">
                <div className="w-10 h-10 rounded-full bg-[#E9E4DA] flex items-center justify-center text-[#181716] mx-auto">
                  <CheckCircle2 className="w-5 h-5 text-[#C27453]" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-[#181716] truncate max-w-[220px]">
                    {selectedFileName || 'Room Photo Ready'}
                  </p>
                  <span className="text-[10px] text-[#78716C]">
                    Ready for spatial scan & design
                  </span>
                </div>
                <div className="w-full mt-1 pt-2 border-t border-[#DED8CB]/60 flex items-center justify-center gap-1 text-[11px] font-medium text-[#C27453]">
                  <span>Click to change photo</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-[#FCFBF9] border border-[#DED8CB] flex items-center justify-center text-[#57534E] shadow-2xs">
                  <Camera className="w-5 h-5 text-[#78716C]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#181716]">
                    Drop photo of your room here
                  </p>
                  <p className="text-[11px] text-[#78716C] mt-0.5 font-light">
                    or click to browse from device
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
