const FormHeader = ({ children }) => (
  <h2 className="text-2xl mt-8 mb-4">{children}</h2>
);
export const CheckoutForm = () => {
  return (
    <form>
      <FormHeader>Contact information</FormHeader>
      <label
        htmlFor="input-label"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Email address:
      </label>
      <input
        type="email"
        id="input-label"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        placeholder="you@site.com"
      />
      <FormHeader>Payment details</FormHeader>
      <label
        htmlFor="input-label"
        className="block text-m font-medium mb-2 dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        id="input-label"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        placeholder="you@site.com"
      />
      <FormHeader>Shipping address</FormHeader>
      <FormHeader>Billing information</FormHeader>
    </form>
  );
};
