'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowRight,
  Info,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { RoomUploadResponse } from '../../types';
import { uploadRoom, validateRoomImage } from '../../lib/api/rooms';
import { resolveImageUrl } from '../../lib/api/config';

interface NewDesignCardProps {
  onSampleRoomSelected?: (roomName: string) => void;
  onUploadInitiated?: () => void;
  onRoomUploaded?: (
    room: RoomUploadResponse,
    file: File,
    meta?: { name?: string; room_type?: string }
  ) => void;
  onUploadError?: (error: string) => void;
}

export const NewDesignCard: React.FC<NewDesignCardProps> = ({
  onSampleRoomSelected,
  onUploadInitiated,
  onRoomUploaded,
  onUploadError
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedRoom, setUploadedRoom] = useState<RoomUploadResponse | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatRoomName = (filename: string): string => {
    const base = filename.replace(/\.[^/.]+$/, '');
    return base
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  };

  const processFileUpload = async (file: File) => {
    const validation = validateRoomImage(file);
    if (!validation.valid) {
      const err = validation.error || 'Selected file is invalid.';
      setErrorMessage(err);
      if (onUploadError) onUploadError(err);
      return;
    }

    setErrorMessage(null);
    setSelectedFileName(file.name);
    setIsUploading(true);

    // Create local object URL for preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    if (onUploadInitiated) onUploadInitiated();

    const roomName = formatRoomName(file.name) || 'Uploaded Room';

    try {
      const response = await uploadRoom(file, {
        name: roomName,
        room_type: 'Living Room'
      });

      setUploadedRoom(response);
      const serverUrl = resolveImageUrl(response.image_url);
      setPreviewUrl(serverUrl || localUrl);

      if (onRoomUploaded) {
        onRoomUploaded(response, file, {
          name: roomName,
          room_type: 'Living Room'
        });
      }
    } catch (err: unknown) {
      const friendlyError =
        (err as Error)?.message ||
        'Unable to complete upload. Please check your backend connection.';
      setErrorMessage(friendlyError);
      setUploadedRoom(null);
      if (onUploadError) onUploadError(friendlyError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0 || isUploading) return;
    const file = files[0];
    processFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleSampleClick = () => {
    if (isUploading) return;
    setErrorMessage(null);
    setUploadedRoom(null);
    setSelectedFileName('sample-scandinavian-living-room.jpg');
    setPreviewUrl('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80');
    if (onSampleRoomSelected) {
      onSampleRoomSelected('Scandinavian Living Room Sample');
    }
  };

  const handleResetUpload = () => {
    setUploadedRoom(null);
    setSelectedFileName(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-[#FCFBF9] border border-[#DED8CB]/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(24,23,22,0.04)] relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        {/* Left Side: Information & Actions */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${
                errorMessage
                  ? 'bg-[#C27453]'
                  : uploadedRoom
                  ? 'bg-[#B88746]'
                  : 'bg-[#C27453]'
              }`}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
              {uploadedRoom
                ? 'Room Ingested • Stored'
                : errorMessage
                ? 'Upload Notice'
                : 'Room Ingestion'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#181716] tracking-tight mb-2">
            {uploadedRoom
              ? 'Room uploaded successfully.'
              : errorMessage
              ? 'Room upload needs attention.'
              : 'Start with your room.'}
          </h3>

          <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-6">
            {uploadedRoom
              ? 'Your room photograph is securely stored in the studio database and ready for future spatial scan & Computer Vision analysis.'
              : errorMessage
              ? errorMessage
              : 'Upload a photo or multiple views of your space and let AI understand the room before you redesign it.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={isUploading}
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = '';
              }}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-[#181716] hover:bg-[#2A2725] disabled:bg-[#78716C] disabled:cursor-not-allowed text-[#FCFBF9] text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#C27453] animate-spin" />
                  <span>Uploading to Backend...</span>
                </>
              ) : uploadedRoom ? (
                <>
                  <RefreshCw className="w-4 h-4 text-[#C27453]" />
                  <span>Upload Another Photo</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-[#C27453]" />
                  <span>Upload Room</span>
                </>
              )}
            </button>

            <button
              onClick={handleSampleClick}
              type="button"
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-[#F5F1E9] hover:bg-[#EAE5DC] disabled:opacity-50 disabled:cursor-not-allowed text-[#181716] border border-[#DED8CB] text-xs sm:text-sm font-medium px-4 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Try Sample Room</span>
            </button>
          </div>

          {/* Supported Formats Note */}
          <div className="mt-4 flex items-center gap-2 text-[11px] text-[#A8A29E]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Accepts JPG, PNG, or WEBP • Up to 15 MB • Multiple views supported</span>
          </div>
        </div>

        {/* Right Side: Interactive Drag & Drop Area / Uploaded State */}
        <div className="w-full lg:w-80 shrink-0">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition-all duration-200 ${
              isUploading
                ? 'border-[#C27453] bg-[#F5F1E9]/80 cursor-wait'
                : isDragging
                ? 'border-[#C27453] bg-[#F5F1E9]/90 scale-[1.01] cursor-copy'
                : errorMessage
                ? 'border-[#C27453]/60 bg-[#FAF8F5] hover:border-[#C27453] cursor-pointer'
                : uploadedRoom
                ? 'border-[#DED8CB] bg-[#FAF8F5] hover:border-[#78716C] cursor-pointer'
                : 'border-[#DED8CB] bg-[#FAF8F5] hover:bg-[#F5F1E9]/50 hover:border-[#78716C] cursor-pointer'
            }`}
          >
            {isUploading ? (
              <div className="py-5 flex flex-col items-center justify-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-[#FCFBF9] border border-[#DED8CB] flex items-center justify-center shadow-2xs">
                  <Loader2 className="w-5 h-5 text-[#C27453] animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#181716]">
                    Uploading room photo...
                  </p>
                  <p className="text-[10px] text-[#78716C] mt-0.5 font-mono">
                    POST /api/rooms/upload
                  </p>
                </div>
              </div>
            ) : uploadedRoom && previewUrl ? (
              <div className="flex flex-col items-center gap-3">
                {/* Image Preview with Badges */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#181716] border border-[#DED8CB]">
                  <img
                    src={previewUrl}
                    alt={selectedFileName || 'Uploaded room'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#FCFBF9]/90 text-[#181716] border border-[#DED8CB] shadow-2xs backdrop-blur-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B88746]" />
                      Uploaded
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#FCFBF9] bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      ID: {uploadedRoom.room_id.slice(0, 8)}
                    </span>
                  </div>

                  {/* Bottom Note */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] text-[#FCFBF9]/90 font-light truncate max-w-[180px]">
                      {selectedFileName}
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#FCFBF9] text-[#181716] flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#B88746]" />
                    </span>
                  </div>
                </div>

                {/* Subtext and Change Action */}
                <div className="w-full text-center">
                  <p className="text-[11px] text-[#78716C] font-light">
                    Awaiting spatial analysis & Computer Vision scan
                  </p>
                  <div className="mt-1 pt-1.5 border-t border-[#DED8CB]/60 flex items-center justify-center gap-1 text-[11px] font-medium text-[#C27453]">
                    <span>Click to change photo</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="py-3 flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-10 h-10 rounded-2xl bg-[#FDF2ED] border border-[#F5C7B3] flex items-center justify-center text-[#C27453]">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#181716]">
                    Upload Failed
                  </p>
                  <p className="text-[11px] text-[#78716C] mt-0.5 line-clamp-2 px-2 font-light">
                    {errorMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetUpload();
                    fileInputRef.current?.click();
                  }}
                  className="mt-1 text-[11px] font-medium text-[#C27453] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Try again with another file</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2.5 py-2">
                <div className="w-11 h-11 rounded-2xl bg-[#FCFBF9] border border-[#DED8CB] flex items-center justify-center text-[#57534E] shadow-2xs">
                  <Camera className="w-5 h-5 text-[#78716C]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#181716]">
                    Drop photo of your room here
                  </p>
                  <p className="text-[11px] text-[#78716C] mt-0.5 font-light">
                    or click to browse from device (JPG, PNG, WEBP)
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
