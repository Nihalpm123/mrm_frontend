<div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={addCategory}
        >
          <PlusCircle size={18} /
          >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        {currentData && currentData.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-4 px-4 text-left text-gray-700">SL NO</th>
                <th className="py-4 px-4 text-left text-gray-700">
                  Category/Subcategory Name
                </th>
                <th className="py-4 px-4 text-left text-gray-700">Image</th>
                <th className="py-4 px-4 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    {item.Category_name || item.name}
                  </td>
                  
                  <td className="py-4 px-4">
                    <img
                      src={item.Category_img}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 flex-wrap md:flex-nowrap">
                      <button
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                        onClick={() => dltCate(item._id)}
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                      <button
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                        onClick={()=>openEdit(item)}
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      {item.hasSubcategory === true ? (
                        <button
                          className="px-3 py-1 text-white rounded bg-gray-700 transition-colors flex items-center gap-1"
                          onClick={() => handleManage(item._id)}
                        >
                          Manage
                          <LayersIcon size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewProduct(item._id)}
                          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                        >
                         View Product
                        </button>
                      )}  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 text-center py-10">
            No Category Available
          </div>
        )}
      </div>