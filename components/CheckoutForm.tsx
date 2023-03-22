import { FormEventHandler } from 'react';

const FormHeader = ({ children }) => (
  <h2 className="text-2xl mt-8 mb-4">{children}</h2>
);
export const CheckoutForm = () => {
  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormHeader>Contact information</FormHeader>
      <label
        htmlFor="emailAddress"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Email address:
      </label>
      <input
        type="email"
        id="emailAddress"
        name="emailAddress"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        placeholder="you@site.com"
        required
      />
      <FormHeader>Payment details</FormHeader>
      <label
        htmlFor="nameOnCard"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Name on card
      </label>
      <input
        type="text"
        id="nameOnCard"
        name="nameOnCard"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="cardNumber"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Card number
      </label>
      <input
        type="number"
        id="cardNumber"
        name="cardNumber"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="expirationDate"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Expiration date (MM/YY)
      </label>
      <input
        type="text"
        id="expirationDate"
        name="expirationDate"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="cvcNumber"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        CVC
      </label>
      <input
        type="number"
        id="cvcNumber"
        name="cvcNumber"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <FormHeader>Shipping address</FormHeader>
      <label
        htmlFor="Company"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Company
      </label>
      <input
        type="text"
        id="Company"
        name="Company"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="addressFirstLine"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Address
      </label>
      <input
        type="text"
        id="addressFirstLine"
        name="addressFirstLine"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="apartmentLine"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Apartment, suite, etc.
      </label>
      <input
        type="text"
        id="apartmentLine"
        name="apartmentLine"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="city"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        City
      </label>
      <input
        type="text"
        id="city"
        name="city"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="stateProvince"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        State / Province
      </label>
      <input
        type="text"
        id="stateProvince"
        name="stateProvince"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor="postalCode"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Postal code
      </label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <FormHeader>Billing information</FormHeader>
      <input
        type="checkbox"
        id="sameAsShipping"
        name="sameAsShipping"
        className="py-3 px-4 border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <div>
        <label
          htmlFor="sameAsShipping"
          className="text-m font-medium mb-2 dark:text-white"
        >
          Same as shipping information
        </label>
      </div>
      <button
        type="submit"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-lg sm:p-5 dark:focus:ring-offset-gray-800"
      >
        Continue
      </button>
    </form>
  );
};
