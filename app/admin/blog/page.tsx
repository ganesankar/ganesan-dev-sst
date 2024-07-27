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
  LiaFileAlt,
} from "react-icons/lia";
import { PostItem } from "@/types/api";
import { getPosts, deletePost } from "@/app/actions/posts";

export default function BlogPage() {
  const router = useRouter();
  const gridRef = useRef<AgGridReact<PostItem>>(null);
  const { data: session } = useSession();
  const [apiData, setApiData] = useState<PostItem[]>([]);
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
              href={`/admin/blog/${params?.data?.slug}`}
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {params?.data?.title}
            </Link>
          );
        },
      },
      {
        field: "slug",
        pinned: "left",
        width: 230,
        filter: "agTextColumnFilter",
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
        field: "publishedOn",
        filter: "agDateColumnFilter",
        valueGetter: (params) => {
          return moment(params.data.publishedOn).format("DD/MM/YYYY");
        },
        filterParams: dateFilterParams,
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
                  deleteBlogPostEntries(params.data.slug);
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
  const [blogPostsLoading, setBlogPostsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPostEntries();
  }, []);

  const onGridReady = useCallback(() => {
    gridRef?.current?.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);
  const fetchBlogPostEntries = async () => {
    try {
      const response = await getPosts(session?.accessToken);
      setBlogPostsLoading(false);
      setApiData(response);
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  const deleteBlogPostEntries = async (slug) => {
    try {
      const response = await deletePost(slug, session?.accessToken);

      fetchBlogPostEntries();
    } catch (error) {
      console.error("Error fetching BlogPost entries:", error);
    }
  };
  return (
    <div id="home" className="text-base-content">
      {blogPostsLoading && (
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
                  <LiaFileAlt className="mr-2 h-8 w-8 text-gray-900 dark:text-white" />
                  <h1 className="text-xl  text-gray-900 sm:text-2xl dark:text-white">
                    Blog
                  </h1>
                </div>
              </div>
            </div>
            <Button
              color="blue"
              pill
              onClick={() => router.push("/admin/blog/new")}
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
