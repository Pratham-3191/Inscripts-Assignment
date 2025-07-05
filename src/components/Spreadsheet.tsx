// Spreadsheet.tsx
import { useMemo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
    useTable,
    useResizeColumns,
    useFlexLayout,
} from "react-table";
import type { Column } from "react-table";

// Define the shape of your data
type Data = {
    jobRequest: string;
    submitted: string;
    status: string;
    submitter: string;
    url: string;
    assigned: string;
    priority: string;
    dueDate: string;
    estimatedValue: string;
};

// const ROW_COUNT = 1000;
const INITIAL_ROW_COUNT = 100;


const Spreadsheet = () => {
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [rowCount, setRowCount] = useState(INITIAL_ROW_COUNT);
    const [newRowsToAdd, setNewRowsToAdd] = useState<number>(0);

    const rawData: Data[] = [
        {
            jobRequest: "Logo Design",
            submitted: "2025-07-01",
            status: "complete",
            submitter: "Alice",
            url: "https://example.com/logo",
            assigned: "Bob",
            priority: "High",
            dueDate: "2025-07-10",
            estimatedValue: "620",
        },
        {
            jobRequest: "Landing Page",
            submitted: "2025-06-30",
            status: "In Progress",
            submitter: "Charlie",
            url: "https://example.com/landing",
            assigned: "Diana",
            priority: "Medium",
            dueDate: "2025-07-15",
            estimatedValue: "1,000",
        },
        {
            jobRequest: "SEO Optimization",
            submitted: "2025-06-28",
            status: "Blocked",
            submitter: "Eve",
            url: "https://example.com/seo",
            assigned: "Frank",
            priority: "High",
            dueDate: "2025-07-12",
            estimatedValue: "750",
        },
        {
            jobRequest: "Newsletter Campaign",
            submitted: "2025-07-02",
            status: "Need to start",
            submitter: "Grace",
            url: "https://example.com/newsletter",
            assigned: "Hank",
            priority: "Low",
            dueDate: "2025-07-20",
            estimatedValue: "300",
        }

    ];

    const filledData = useMemo<Data[]>(
        () => [
            ...rawData,
            ...Array(rowCount - rawData.length)
                .fill(null)
                .map(() => ({
                    jobRequest: "",
                    submitted: "",
                    status: "",
                    submitter: "",
                    url: "",
                    assigned: "",
                    priority: "",
                    dueDate: "",
                    estimatedValue: "",
                })),
        ],
        [rowCount]
    );

    const [dynamicColumns, setDynamicColumns] = useState<Column<Data>[]>([])

    const columns: Column<Data>[] = useMemo(
        () => [
            {
                Header: "#",
                id: "rowNumber",
                width: 30,
                minWidth: 35,
                maxWidth: 35,
                Cell: ({ row }) => <span className="text-gray-500 text-xs">{row.index + 1}</span>,
            },
            {
                Header: "Q3 Financial Overview",
                columns: [
                    { Header: "Job Request", accessor: "jobRequest" },
                    { Header: "Submitted", accessor: "submitted" },
                    {
                        Header: "Status",
                        accessor: "status",
                        Cell: ({ value }) => {
                            let bg = "";
                            let text = "";
                            let textColor = "";

                            switch (value?.toLowerCase()) {
                                case "in progress":
                                case "in-process":
                                    bg = "bg-yellow-100";
                                    textColor = "text-yellow-800";
                                    text = "In-process";
                                    break;
                                case "need to start":
                                    bg = "bg-blue-100";
                                    textColor = "text-blue-800";
                                    text = "Need to start";
                                    break;
                                case "complete":
                                    bg = "bg-green-100";
                                    textColor = "text-green-800";
                                    text = "Complete";
                                    break;
                                case "blocked":
                                    bg = "bg-red-100";
                                    textColor = "text-red-800";
                                    text = "Blocked";
                                    break;
                                default:
                            }

                            return (
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${bg} ${textColor}`}
                                >
                                    {text}
                                </span>
                            );
                        },
                    },

                    { Header: "Submitter", accessor: "submitter" },

                ],
            },
            {
                id: "url",
                Header: () => <span className="invisible">Hidden</span>, // or whatever JSX
                columns: [
                    { Header: "Url", accessor: "url" },
                ],
            },

            {
                Header: "ABC ...",
                columns: [
                    { Header: "Assigned", accessor: "assigned" },
                ],
            },
            {
                Header: "Answer a question ...",
                columns: [
                  {
  Header: "Priority",
  accessor: "priority",
  Cell: ({ value }: { value: string }) => {
    const normalized = value?.toLowerCase().trim();
    let textColor = "";

    switch (normalized) {
      case "high":
        textColor = "text-red-600 font-bold";
        break;
      case "medium":
        textColor = "text-yellow-700 font-bold";
        break;
      case "low":
        textColor = "text-blue-600 font-bold";
        break;
      default:
        textColor = "text-gray-500";
    }

    return (
      <span className={`text-sm ${textColor}`}>
        {value}
      </span>
    );
  },
},

                    { Header: "Due Date", accessor: "dueDate" },
                ],
            },
            {
  Header: "Extract ...",
  columns: [
    {
      Header: "Est. Value",
      accessor: "estimatedValue",
      Cell: ({ value }: { value: string }) => {
        if (!value) return "";
        const numeric = value.replace(/[^\d.]/g, ""); // Remove any existing symbols
        return <span>{numeric}₹</span>;
      },
    },
  ],
},

            ...dynamicColumns,
            {
                Header: () => (
                    <div className="flex items-center justify-center w-full">
                        <button
                            className="text-green-600 hover:text-green-800 text-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDynamicColumns((prev: any) => [
                                    ...prev,
                                    {
                                        Header: `Column ${prev.length + 1}`,
                                        accessor: `customCol${prev.length + 1}`,
                                        Cell: ({ value }: { value: string }) => value || "",

                                    },
                                ]);
                            }}
                        >
                            +
                        </button>
                    </div>
                ),
                id: "addColumn",
                accessor: () => "",
                disableResizing: true,
            },
        ],
        [dynamicColumns]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Data>({ columns, data: filledData }, useResizeColumns, useFlexLayout);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="overflow-x-auto shadow bg-white">
                <table
                    {...getTableProps()}
                    className="min-w-full text-sm text-gray-900 border-collapse"
                >
                    <thead>
                        {headerGroups.map((headerGroup, i) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={headerGroup.id}
                                className="border-b border-gray-300"
                            >
                                {headerGroup.headers.map((column: any) => {
                                    // Function to determine background color
                                    const getHeaderBgColor = () => {
                                        // First header row – top-level groups
                                        if (i === 0) {
                                            switch (column.Header) {
                                                case "Q3 Financial Overview":
                                                    return "bg-[#E2E2E2]";
                                                case "ABC ...":
                                                    return "bg-[#D2E0D4]";
                                                case "Answer a question ...":
                                                    return "bg-[#DCCFFC]";
                                                case "Extract ...":
                                                    return "bg-[#FAC2AF]";
                                                default:
                                                    return "bg-[#F8FAFC]";
                                            }
                                        }

                                        // Second header row – child columns
                                        if (i === 1) {
                                            const parentHeader = column.parent?.Header;
                                            switch (parentHeader) {
                                                case "Q3 Financial Overview":
                                                    return "bg-[#EEEEEE]";
                                                case "ABC":
                                                    return "bg-[#E8F0E9]";
                                                case "Answer a question":
                                                    return "bg-[#EAE3FC]";
                                                case "Extract":
                                                    return "bg-[#FFE9E0]";
                                                default:
                                                    return "bg-[#EEEEEE]";
                                            }
                                        }

                                        return "";
                                    };

                                    return (
                                        <th
                                            {...column.getHeaderProps()}
                                            key={column.id}
                                            className={`relative px-2 h-[32px] border-r border-gray-300 font-medium text-sm ${getHeaderBgColor()}`}
                                        >
                                            <div className={`flex items-center h-full ${i === 0 ? "justify-center" : "justify-start"}`}>
                                                {column.render("Header")}
                                            </div>

                                            {column.canResize && (
                                                <div
                                                    {...column.getResizerProps()}
                                                    className="absolute top-0 right-0 h-full w-[2px] cursor-col-resize bg-gray-300 hover:bg-blue-500"
                                                />
                                            )}
                                        </th>


                                    );
                                })}
                            </tr>
                        ))}
                    </thead>


                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={row.id}
                                    className="border-b border-gray-200 hover:bg-[#fdf7e3]"
                                >
                                    {row.cells.map((cell, colIndex) => (
                                        <td
                                            {...cell.getCellProps()}
                                            key={cell.column.id}
                                            contentEditable={cell.column.id !== "rowNumber" && cell.column.id !== "addColumn"}
                                            suppressContentEditableWarning
                                            tabIndex={0}
                                            data-row-index={row.index}
                                            data-col-index={colIndex}
                                            onFocus={() =>
                                                setSelectedCell({ row: row.index, col: colIndex })
                                            }
                                            onKeyDown={(e) => {
                                                if (!selectedCell) return;

                                                const rowCount = rows.length;
                                                const colCount = row.cells.length;

                                                let nextRow = selectedCell.row;
                                                let nextCol = selectedCell.col;

                                                switch (e.key) {
                                                    case "ArrowDown":
                                                        nextRow = Math.min(rowCount - 1, selectedCell.row + 1);
                                                        break;
                                                    case "ArrowUp":
                                                        nextRow = Math.max(0, selectedCell.row - 1);
                                                        break;
                                                    case "ArrowRight":
                                                        nextCol = Math.min(colCount - 1, selectedCell.col + 1);
                                                        break;
                                                    case "ArrowLeft":
                                                        nextCol = Math.max(0, selectedCell.col - 1);
                                                        break;
                                                    default:
                                                        return;
                                                }

                                                e.preventDefault();
                                                const nextCell = document.querySelector(
                                                    `[data-row-index="${nextRow}"][data-col-index="${nextCol}"]`
                                                ) as HTMLElement;
                                                nextCell?.focus();
                                            }}
                                            onBlur={(e) => {
                                                if (cell.column.id !== "rowNumber") {
                                                    console.log(
                                                        `Edited ${cell.column.id}:`,
                                                        e.currentTarget.textContent
                                                    );
                                                }
                                                e.currentTarget.classList.remove("editing-cell");
                                            }}
                                            onClick={(e) => {
                                                e.currentTarget.focus();
                                            }}
                                            className={`px-1 py-1 border-r border-gray-200 text-ellipsis truncate overflow-hidden whitespace-nowrap
                                                 focus:outline-none 
                                                  ${cell.column.id === "rowNumber"
                                                    ? "bg-gray-50 text-gray-500 font-medium w-[24px] min-w-[24px] text-center text-xs"
                                                    : "min-w-[120px]"} 
                                                 ${selectedCell?.row === row.index && selectedCell?.col === colIndex ? "editing-cell" : ""}
                                             `}

                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="number"
                        min={0}
                        value={newRowsToAdd}
                        onChange={(e) => setNewRowsToAdd(Number(e.target.value))}
                        placeholder="Enter number of rows"
                        className="border rounded px-2 py-1 text-sm w-48"
                    />
                    <button
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                        onClick={() => {
                            if (newRowsToAdd > 0) {
                                setRowCount((prev) => prev + newRowsToAdd);
                                setNewRowsToAdd(0);
                            }
                        }}
                    >
                        Add Rows
                    </button>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Spreadsheet;
