"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSession } from "next-auth/react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Button, Spinner } from "flowbite-react";

import {
  LiaPlusCircleSolid,
  LiaTrashAltSolid,
  LiaFileCode,
} from "react-icons/lia";
import { ProjectItem } from "@/types/api";
import { getProjects, deleteProject } from "@/app/actions/projects";

export default function ProjectsPage() {
  const router = useRouter();
  const gridRef = useRef<AgGridReact<ProjectItem>>(null);
  const { data: session } = useSession();
  const [apiData, setApiData] = useState<ProjectItem[]>([]);
  const dateFilterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var dateAsString = cellValue?.includes("T")
        ? cellValue.split("T")[0]
        : cellValue;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
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
        field: "title",
        pinned: "left",
        width: 230,
        filter: "agTextColumnFilter",
        cellRenderer: (params) => {
          return (
            <Link
              href={`/admin/projects/${params?.data?.slug}`}
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {params?.data?.title}
            </Link>
          );
        },
      },
      
      {
        field: "createdOn",
        filter: "agDateColumnFilter",
        valueGetter: (params) => {
          return moment(params.data.createdOn).format("DD/MM/YYYY");
        },
        filterParams: dateFilterParams,
      },
      {
        field: "modifiedOn",
        filter: "agDateColumnFilter",
        valueGetter: (params) => {
          return moment(params.data.modifiedOn).format("DD/MM/YYYY");
        },
        filterParams: dateFilterParams,
      },
      {
        field: "github",
        filter: "agTextColumnFilter",
      },
      {
        field: "demo",
        filter: "agTextColumnFilter",
      },
      { field: "isPublished", width: 100, filter: "agNumberColumnFilter" },
      {
        field: "Action",
        pinned: "right",
        filter: false,
        width: 100,
        cellRenderer: (params) => {
          return (
            <div className="flex flex-wrap gap-1">
              <Button
                size="xs"
                pill
                color="failure"
                onClick={() => {
                  deleteProjectsEntries(params.data.slug);
                }}
              >
                <LiaTrashAltSolid className=" h-5 w-5" />
              </Button>
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
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    fetchProjectsEntries();
  }, []);

  const onGridReady = useCallback(() => {
    gridRef?.current?.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);
  const fetchProjectsEntries = async () => {
    try {
      const response = await getProjects(session?.accessToken);
      setProjectsLoading(false);
      setApiData(response);
    } catch (error) {
      console.error("Error fetching Projects entries:", error);
    }
  };
  const deleteProjectsEntries = async (slug) => {
    try {
      const response = await deleteProject(slug, session?.accessToken);

      fetchProjectsEntries();
    } catch (error) {
      console.error("Error fetching Project entries:", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      {projectsLoading && (
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
                  <LiaFileCode className="mr-2 h-8 w-8 text-gray-900 dark:text-white" />
                  <h1 className="text-xl  text-gray-900 sm:text-2xl dark:text-white">
                    Projects
                  </h1>
                </div>
              </div>
            </div>
            <Button
              color="blue"
              pill
              onClick={() => router.push("/admin/projects/new")}
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
          rowHeight={60}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          pagination={true}
          enableCellTextSelection={true}
        ></AgGridReact>
      </div>
    </div>
  );
}
