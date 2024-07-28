"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSession } from "next-auth/react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Button,
  Spinner,
  FileInput,
  Label,
  Modal,
  Clipboard,
} from "flowbite-react";
import { toast } from "react-toastify";
import { getMaterialFileIcon } from "file-extension-icon-js";

import {
  LiaPlusCircleSolid,
  LiaFileUploadSolid,
  LiaTrashAltSolid,
  LiaDownloadSolid,
} from "react-icons/lia";
import { UploadItem } from "@/types/api";
import {
  getUploads,
  generateSignedUrl,
  deleteUpload,
} from "@/app/actions/uploads";
import { imageFormats } from "@/app/util/adminContent";

export default function UploadsPage() {
  const router = useRouter();
  const gridRef = useRef<AgGridReact<UploadItem>>(null);
  const { data: session } = useSession();
  const [apiData, setApiData] = useState<UploadItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [uploadListLoading, setUploadListLoading] = useState(true);

  const dateFilterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var cellDate = new Date(cellValue * 1000);
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }

      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }

      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
  };
  const columnDefs = useMemo<ColDef[]>(() => {
    return [
      {
        headerName: "Row",
        width: 100,
        pinned: "left",
        valueGetter: (params) => params.node.rowIndex + 1,
      },
      {
        field: "Image",
        pinned: "left",
        filter: false,
        width: 140,
        cellRenderer: (params) => {
          return (
            <>
              {imageFormats.includes(params.data.fileType) ? (
                <Image
                  src={params.data.url}
                  width="64"
                  height="64"
                  alt={params.data.name}
                  className="size-12 rounded-lg"
                />
              ) : (
                <Image
                  src={getMaterialFileIcon(params.data.fileType)}
                  width="64"
                  height="64"
                  alt={params.data.name}
                  className="size-12 rounded-lg"
                />
              )}
            </>
          );
        },
      },
      {
        field: "name",
        width: 530,
        filter: "agTextColumnFilter",
      },
      {
        field: "fileType",
        width: 230,
        filter: "agTextColumnFilter",
      },
      {
        field: "modified",
        filter: "agDateColumnFilter",
        valueGetter: (params) => {
          return moment(params.data.modified).format("X");
        },
        valueFormatter: (params) => {
          return moment(params.data.modified).format("DD/MM/YYYY");
        },
        filterParams: dateFilterParams,
      },
      {
        field: "Action",
        pinned: "right",
        filter: false,
        width: 250,
        cellRenderer: (params) => {
          return (
            <div className="flex flex-wrap gap-1">
              <a
                target="_blank"
                href={params?.data?.url}
                rel="noopener noreferrer"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <LiaDownloadSolid className=" h-5 w-5" />
              </a>
              <Button
                size="xs"
                pill
                color="failure"
                onClick={() => {
                  deleteEntry(params?.data?.name);
                }}
              >
                <LiaTrashAltSolid className=" h-5 w-5" />
              </Button>
              <Clipboard.WithIconText
                valueToCopy={params.data.url}
                label="Copy Link"
              />
            </div>
          );
        },
      },
    ];
  }, []);

  const [defaultColDef] = useState({
    width: 200,
    editable: false,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    resizable: true,
    sortable: true,
  });
  useEffect(() => {
    fetchUploadEntries();
  }, []);
  const fetchUploadEntries = async () => {
    try {
      const response = await getUploads(session?.accessToken);
      setUploadListLoading(false);
      setApiData(response);
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  const onGridReady = useCallback(() => {
    gridRef?.current?.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);

  const handleSubmit = async (e) => {
    const file = e.target.files[0];
    const content_type = file.type;
    const preSignedUrl = await generateSignedUrl(
      file?.name,
      session?.accessToken
    );
    const result = await fetch(preSignedUrl.body, {
      method: "PUT",
      body: file,
    });
    if (result.ok) {
      toast.success("File Uploaded successfully");
      fetchUploadEntries();
      setOpenModal(false);
    } else {
      toast.error("Unable to Upload the File");
    }
  };

  const deleteEntry = async (name) => {
    try {
      const response = await deleteUpload(name, session?.accessToken);
      if (response.status === 200) {
        fetchUploadEntries();
      }
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      {uploadListLoading && (
        <div className="flex h-screen w-screen absolute  z-50 left-0 top-0 ">
          <div className="m-auto">
            <Spinner aria-label="Loading" size="xl" />
          </div>
        </div>
      )}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200  dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex items-center w-full sm:justify-end">
                <div className="flex pl-2 space-x-1">
                  {" "}
                  <LiaFileUploadSolid className="mr-2 h-8 w-8 text-gray-900 dark:text-white" />
                  <h1 className="text-xl  text-gray-900 sm:text-2xl dark:text-white">
                    Uploads
                  </h1>
                </div>
              </div>
            </div>
            <Button
              color="blue"
              pill
              onClick={() => setOpenModal(true)}
              className="me-2"
            >
              <LiaPlusCircleSolid className="mr-2 h-5 w-5" /> Add New
            </Button>
          </div>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 145px)", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={apiData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          headerHeight={60}
          rowHeight={70}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          pagination={true}
          enableCellTextSelection={true}
        ></AgGridReact>

        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Upload The File
              </h3>
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                id="file"
                accept="*"
                onChange={handleSubmit}
                helperText="File will be uploaded shortly"
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
