import profile from "../assets/profile.png";
import cell from "../assets/cell.png";
import { FiDownload, FiUpload, FiShare2 } from "react-icons/fi";

function Header() {
    const handleClick = (type: string) => alert(`${type} button is clicked`);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Search input:", e.target.value);
    };

    return (
        <div>
            {/* Top row */}
            <div className="flex flex-row items-center p-4 relative">
                <div className="h-4 w-5 border-2 border-[#618666] rounded-sm flex items-center">
                    <div className="bg-[#618666] h-[13px] w-[7px] relative left-[10px]"></div>
                </div>
                <div className="ml-3 text-center text-[#AFAFAF]">Workspace</div>
                <i className="fa-solid fa-greater-than text-xs ml-2 text-[#AFAFAF]"></i>
                <div className="ml-2 text-[#AFAFAF]">Folder 2</div>
                <i className="fa-solid fa-greater-than text-xs ml-2 text-[#AFAFAF]"></i>
                <div className="ml-2 text-black font-semibold">Spreadsheet 3</div>
                <div className="ml-2 text-[#AFAFAF] relative bottom-1">...</div>

                {/* Right side elements */}
                <div className="absolute right-0 flex flex-row gap-5 items-center pr-7">
                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-gray-400"></i>
                        <input
                            type="text"
                            onChange={handleSearchChange}
                            className="bg-[#F6F6F6] pl-9 pr-3 py-2 rounded-lg w-48"
                            placeholder="Search within sheet"
                        />
                    </div>

                    <button onClick={() => handleClick("Notification")} className="relative">
                        <i className="fa-regular fa-bell text-2xl"></i>
                        <div className="bg-[#4B6A4F] w-4 h-4 rounded-full text-center text-white text-xs absolute -top-1 left-2">2</div>
                    </button>

                    <button onClick={() => handleClick("Profile")}>
                        <img src={profile} className="h-10 w-10 rounded-full" alt="profile pic" />
                    </button>

                    <div className="flex flex-col">
                        <p>John Doe</p>
                        <p className="text-sm text-[#757575]">john.doe...</p>
                    </div>
                </div>
            </div>

            {/* Bottom grey line */}
            <div className="w-full h-[1px] bg-[#D9D9D9]" />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2">
                {/* Left side toolbar items */}
                <div className="flex flex-row items-center gap-4">
                    <button
                        onClick={() => handleClick("Tool bar")}
                        className="text-sm text-black hover:underline"
                    >
                        Tool bar
                    </button>

                    <span className="flex items-center space-x-0.5">
                        <i className="fa-solid fa-greater-than text-xs text-black"></i>
                        <i className="fa-solid fa-greater-than text-xs text-black"></i>
                    </span>

                    <div className="h-5 w-[2px] bg-[#EEEEEE] mx-2"></div>

                    <div className="flex flex-row gap-4 items-center">
                        <button
                            onClick={() => handleClick("Hide Fields")}
                            className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded"
                        >
                            <i className="fa-regular fa-eye-slash"></i>
                            Hide Fields
                        </button>
                        <button
                            onClick={() => handleClick("Sort")}
                            className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                            <i className="fa-solid fa-arrow-down"></i>
                            Sort
                        </button>
                        <button
                            onClick={() => handleClick("Filter")}
                            className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded"
                        >
                            <i className="fi fi-br-bars-filter text-sm text-gray-600"></i>
                            Filter
                        </button>
                        <button
                            onClick={() => handleClick("Cell view")}
                            className="flex items-center gap-2 text-sm hover:bg-gray-100 px-2 py-1 rounded"
                        >
                            <img src={cell} className="h-6 w-6" alt="cell view" />
                            Cell view
                        </button>
                    </div>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleClick("Import")}
                        className="border border-gray-300 rounded-md px-4 py-2 flex items-center text-sm hover:bg-gray-100"
                    >
                        <FiDownload className="mr-2" />
                        Import
                    </button>
                    <button
                        onClick={() => handleClick("Export")}
                        className="border border-gray-300 rounded-md px-4 py-2 flex items-center text-sm hover:bg-gray-100"
                    >
                        <FiUpload className="mr-2" />
                        Export
                    </button>
                    <button
                        onClick={() => handleClick("Share")}
                        className="border border-gray-300 rounded-md px-4 py-2 flex items-center text-sm hover:bg-gray-100"
                    >
                        <FiShare2 className="mr-2" />
                        Share
                    </button>
                    <button
                        onClick={() => handleClick("New Action")}
                        className="bg-[#4B6A4F] text-white rounded-md px-4 py-2 flex items-center text-sm hover:bg-green-700"
                    >
                        <FiDownload className="mr-2" />
                        New Action
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
