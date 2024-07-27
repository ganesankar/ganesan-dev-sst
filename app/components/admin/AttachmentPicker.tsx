"use client";
import { Button, Drawer, Label, Radio, Spinner } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

import { useSession } from "next-auth/react";
import { UploadItem } from "@/types/api";
import { getUploads } from "@/app/actions/uploads";
import { imageFormats } from "@/app/util/adminContent";
export function AttachmentPicker({ updateImage, selectedImg }) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(selectedImg);
  const { data: session } = useSession();
  const handleClose = () => setIsOpen(false);
  const [apiData, setApiData] = useState<UploadItem[]>([]);
  const [uploadListLoading, setUploadListLoading] = useState(true);

  useEffect(() => {
    fetchUploadEntries();
  }, []);
  const fetchUploadEntries = async () => {
    try {
      const response = await getUploads(session?.accessToken);
      const imagesonly = response.filter((i) =>
        imageFormats.includes(i.fileType)
      );
      setUploadListLoading(false);
      setApiData(imagesonly);
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  const handleRadioChange = (value) => {
    setSelectedFile(value);
  };
  return (
    <>
      <div>
        <Button color="blue" className="w-full" onClick={() => setIsOpen(true)}>
          Select <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className=" min-w-[600px]"
      >
        <Drawer.Header title="Select Image" />
        <Drawer.Items>
          {uploadListLoading && (
            <div className="flex h-screen w-full absolute  z-50 left-0 top-0 ">
              <div className="m-auto">
                <Spinner aria-label="Loading" size="xl" />
              </div>
            </div>
          )}
          {apiData.length > 0 ? (
            <div
              className="grid gap-4 grid-cols-3 admin-image-picker mb-3 0"
              style={{
                minHeight: `calc(100vh - 130px)`,
                overflowY: `scroll`,
              }}
            >
              {apiData.map(({ name, url }: any, index: any) => (
                <Label key={`homeblog${index}`}>
                  <Radio
                    name={name}
                    value={url}
                    checked={selectedFile === url}
                    onChange={() => handleRadioChange(url)}
                  />
                  <Image
                    src={url}
                    width="300"
                    height="300"
                    alt={name}
                    className="rounded-lg"
                  />
                </Label>
              ))}
            </div>
          ) : (
            <section className="py-32">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-4 text-1xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                  No Images Available
                </h1>
                <p className="text-gray-600 dark:text-gray-200">
                  We may have files in other format uploaded, but unfortunately
                  no images available
                </p>
              </div>
            </section>
          )}

          <Button
            disabled={apiData?.length === 0}
            color="blue"
            className="w-full"
            onClick={() => {
              updateImage(selectedFile);
              setIsOpen(false);
            }}
          >
            Update <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
