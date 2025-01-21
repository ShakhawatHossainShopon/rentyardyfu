export const TransactionList = ({ item }) => {
  return (
    <>
      <div className="w-full py-2 px-4 bg-blue-100 dark:bg-dark-light dark:text-gray-400 dark:border-blue-900  rounded-md md:flex justify-start items-center space-x-2 border border-blue-500">
        <span>Payer: {item.userId.name},</span>
        <span>Amount: ${item.amount}, </span>
        <span>Type: {item.type}, </span>
        <span>Date: {item.createdAt} </span>
      </div>
    </>
  );
};
