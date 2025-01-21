import { useAppDispatch } from "@/hooks";
import {
  deletePaymentMethod,
  makePrimaryPaymentMethod,
} from "@/services/paymentMethods/paymentMethods";
import { Icons } from "@/utils";
import Swal from "sweetalert2";

export const PaymentInfoCard = ({ item }) => {
  const dispatch = useAppDispatch();

  const bankNumber =
    item && item.bank_account_number && item.bank_account_number;

  const cardNumber = item && item.card_number && item.card_number;

  return (
    <div className="bg-gray-100 relative w-full px-4 py-4 dark:bg-darkMode dark:border-2 dark:border-dark-primary">
      <button
        aria-label="delete"
        onClick={() => {
          Swal.fire({
            title: "Are You Sure?",
            showDenyButton: true,
            confirmButtonText: "Ok",
            denyButtonText: `Cancel`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              dispatch(deletePaymentMethod(item.paymentMethodId));
            }
          });
        }}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-black flex justify-center items-center text-red-600"
      >
        <Icons.Delete />
      </button>
      {item.default ? (
        <span className="absolute bottom-2 right-2 rounded-full bg-blue-500 flex justify-center items-center text-sm text-gray-100 px-2">
          {item && item.type === "Card" ? "Primary Card" : "Primary Bank"}
        </span>
      ) : (
        <button
          onClick={() => {
            Swal.fire({
              title: "Are You Sure?",
              showDenyButton: true,
              confirmButtonText: "Ok",
              denyButtonText: `Cancel`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                dispatch(
                  makePrimaryPaymentMethod({
                    paymentMethodId: item.paymentMethodId,
                  })
                );
              }
            });
          }}
          className="underline absolute bottom-2 right-2 flex justify-center items-center text-sm text-gray-900 px-2"
        >
          Make This Primary
        </button>
      )}
      <p className="md:text-xl font-semibold text-lg flex justify-start items-center space-x-2">
        <span>
          {item && item.type === "Card" ? <Icons.Card /> : <Icons.Bank />}
        </span>
        <span>{item && item.name && item.name}</span>
      </p>
      <p className="font-medium">
        {item && item.type === "Card"
          ? `Card Number End With ${item && item.number}`
          : `Bank Number End With ${item && item.number}`}
      </p>
    </div>
  );
};
