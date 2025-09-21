import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import DetailsModal from "../../components/shared/DetailsModa";
import DeleteModal from "../../components/shared/DeleteModal";
import Input from "../../components/shared/Input";
import Select from "../../components/shared/Select";
import Button from "../../components/shared/Button";
import Loading from "../../components/shared/Loading";
import {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} from "../../redux/slices/transactionSlice";

const TransactionManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    category: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    tax_type: "flat",
    tax_value: "",
    description: "",
  });

  const { data: transactionsData, isLoading } =
    useGetTransactionsQuery(filters);
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();

  const transactions = transactionsData?.transactions || [];
  const pagination = transactionsData?.pagination || {};

  const typeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const taxTypeOptions = [
    { value: "flat", label: "Flat Amount" },
    { value: "percentage", label: "Percentage" },
  ];

  const categoryOptions = [
    { value: "Food", label: "Food" },
    { value: "Transport", label: "Transport" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Shopping", label: "Shopping" },
    { value: "Bills", label: "Bills" },
    { value: "Salary", label: "Salary" },
    { value: "Other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const resetForm = () => {
    setFormData({
      type: "",
      category: "",
      amount: "",
      tax_type: "flat",
      tax_value: "",
      description: "",
    });
    setEditingTransaction(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      tax_type: transaction.tax_type,
      tax_value: transaction.tax_value,
      description: transaction.description,
    });
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await updateTransaction({
          id: editingTransaction.id,
          ...formData,
        }).unwrap();
        toast.success("Transaction updated successfully!");
      } else {
        await addTransaction(formData).unwrap();
        toast.success("Transaction added successfully!");
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction(deletingTransaction.id).unwrap();
      toast.success("Transaction deleted successfully!");
      setShowDeleteModal(false);
      setDeletingTransaction(null);
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed!");
    }
  };

  const openDeleteModal = (transaction) => {
    setDeletingTransaction(transaction);
    setShowDeleteModal(true);
  };

  const handleActionChange = (e, transaction) => {
    const action = e.target.value;
    if (action === "edit") {
      openEditModal(transaction);
    } else if (action === "delete") {
      openDeleteModal(transaction);
    }
    e.target.value = "";
  };

  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transaction Management
          </h1>
          <p className="text-gray-600">Manage your income and expenses</p>
        </div>
        <Button
          onClick={openAddModal}
          variant="primary"
          className="flex items-center gap-2"
        >
          Add Transaction
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Transactions
          </h3>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Filter by Type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              options={[{ value: "", label: "All Types" }, ...typeOptions]}
            />
            <Select
              label="Filter by Category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              options={[
                { value: "", label: "All Categories" },
                ...categoryOptions,
              ]}
            />
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No transactions found. Add your first transaction!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tax
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold  ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Rs.{parseFloat(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.tax_type === "percentage"
                        ? `${transaction.tax_value}%`
                        : `Rs.${parseFloat(transaction.tax_value).toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Rs.{parseFloat(transaction.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <select
                        onChange={(e) => handleActionChange(e, transaction)}
                        className="border border-gray-3 px-3 py-1 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Actions
                        </option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination - Only show when total > 10 */}
        {pagination.total > 10 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="flex items-center gap-1"
              >
                <FiChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-sm text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="flex items-center gap-1"
              >
                Next
                <FiChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <DetailsModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        size="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              options={typeOptions}
              required
            />
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={categoryOptions}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              required
            />
            <Select
              label="Tax Type"
              name="tax_type"
              value={formData.tax_type}
              onChange={handleInputChange}
              options={taxTypeOptions}
            />
            <Input
              label="Tax Value"
              type="number"
              name="tax_value"
              value={formData.tax_value}
              onChange={handleInputChange}
              placeholder={
                formData.tax_type === "percentage"
                  ? "Enter percentage"
                  : "Enter amount"
              }
            />
          </div>

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isAdding || isUpdating}
            >
              {editingTransaction ? "Update" : "Add"} Transaction
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* Delete Modal */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingTransaction(null);
        }}
        onConfirm={handleDelete}
        itemName="transaction"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TransactionManagement;
