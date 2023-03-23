import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

interface CheckoutFormData {
  emailAddress: string;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvcNumber: string;
  company: string;
  addressFirstLine: string;
  apartmentLine: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  sameAsShipping: string;
}

const FormHeader = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl mt-8 mb-4">{children}</h2>
);

const validateCardExpirationDate = (value: string) => {
  if (value.length !== 5) {
    return 'Wrong value!';
  }
  const [month, year] = value.split('/');
  if (Number.parseInt(month) > 12) return 'Wrong month';
  if (Number.parseInt(year) < new Date().getUTCFullYear() - 2000)
    return 'Wrong year';
};

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();
  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const requiredValue = 'This value is required.';

  const requiredValueError = (
    <p className="mt-2 text-red-600">Required value</p>
  );
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>
          <FormHeader>Contact information</FormHeader>
        </legend>
        <label
          htmlFor="emailAddress"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Email address:
        </label>
        <input
          type="email"
          id="emailAddress"
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          placeholder="you@site.com"
          {...register('emailAddress', {
            required: requiredValue,
          })}
        />
        {errors?.emailAddress && requiredValueError}
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Payment details</FormHeader>
        </legend>
        <label
          htmlFor="nameOnCard"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Name on card
        </label>
        <input
          type="text"
          id="nameOnCard"
          autoComplete="cc-name"
          {...register('nameOnCard', { required: requiredValue })}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        {errors?.nameOnCard && requiredValueError}
        <label
          htmlFor="cardNumber"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Card number
        </label>
        <input
          type="text"
          id="cardNumber"
          autoComplete="cc-number"
          {...register('cardNumber', { required: requiredValue })}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        {errors?.cardNumber && requiredValueError}
        <div className="flex gap-4">
          <div className="flex-grow">
            <label
              htmlFor="expirationDate"
              className="text-m block font-medium mb-2 dark:text-white"
            >
              Expiration date (MM/YY)
            </label>
            <input
              type="text"
              id="expirationDate"
              autoComplete="cc-exp"
              {...register('expirationDate', {
                required: true,
                validate: validateCardExpirationDate,
              })}
              className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            />
            {errors?.expirationDate?.type === 'required' && requiredValueError}
            {errors?.expirationDate && (
              <p className="text-red-600">{errors?.expirationDate?.message}</p>
            )}
          </div>
          <div className="flex-grow">
            <label
              htmlFor="cvcNumber"
              className="text-m block font-medium mb-2 dark:text-white"
            >
              CVC
            </label>
            <input
              type="text"
              id="cvcNumber"
              autoComplete="cc-csc"
              {...register('cvcNumber', {
                required: requiredValue,
                pattern: {
                  value: /^\d\d\d/,
                  message: 'Wrong value',
                },
                minLength: {
                  value: 3,
                  message: 'Should have 3 digits',
                },
                maxLength: {
                  value: 3,
                  message: 'Should have 3 digits',
                },
              })}
              className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            />
            {errors?.cvcNumber && (
              <p className="text-red-600">{errors?.cvcNumber?.message}</p>
            )}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Shipping address</FormHeader>
        </legend>
        <label
          htmlFor="company"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        <label
          htmlFor="addressFirstLine"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Address
        </label>
        <input
          type="text"
          id="addressFirstLine"
          {...register('addressFirstLine')}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        <label
          htmlFor="apartmentLine"
          className="text-m block font-medium mb-2 dark:text-white"
        >
          Apartment, suite, etc.
        </label>
        <input
          type="text"
          id="apartmentLine"
          {...register('apartmentLine')}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        <div className="columns-3">
          <label
            htmlFor="city"
            className="text-m block font-medium mb-2 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            {...register('city')}
            className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <label
            htmlFor="stateProvince"
            className="text-m block font-medium mb-2 dark:text-white"
          >
            State / Province
          </label>
          <input
            type="text"
            id="stateProvince"
            {...register('stateProvince')}
            className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <label
            htmlFor="postalCode"
            className="text-m block font-medium mb-2 dark:text-white"
          >
            Postal code
          </label>
          <input
            type="text"
            id="postalCode"
            {...register('postalCode')}
            className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Billing information</FormHeader>
        </legend>
        <div className="container mx-auto">
          <input
            type="checkbox"
            id="sameAsShipping"
            {...register('sameAsShipping')}
            className="py-3 px-4 border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <label
            htmlFor="sameAsShipping"
            className="text-m block font-medium mb-2 dark:text-white ml-2"
          >
            Same as shipping information
          </label>
        </div>
      </fieldset>
      <button
        type="submit"
        className="mt-4 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-lg sm:p-5 dark:focus:ring-offset-gray-800"
      >
        Continue
      </button>
    </form>
  );
};
