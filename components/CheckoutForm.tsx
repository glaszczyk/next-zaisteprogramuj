import { HTMLInputTypeAttribute, HTMLProps, ReactNode } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addMethod, InferType, StringSchema } from 'yup';

const requiredValue = 'This value is required.';

declare module 'yup' {
  interface StringSchema {
    cardExpirationDate(errorMessage: string): StringSchema;
  }
}

addMethod(StringSchema, 'cardExpirationDate', function (errorMessage: string) {
  return this.test(`test-card-expiration-date`, function (value: string) {
    const { path, createError } = this;
    if (value.length !== 5) {
      return createError({ path, message: errorMessage });
    }
    const [month, year] = value.split('/');
    if (Number.parseInt(month) > 12)
      return createError({ path, message: 'Wrong month' });
    if (Number.parseInt(year) < new Date().getUTCFullYear() - 2000)
      return createError({ path, message: 'Wrong year' });
    return true;
  });
});

const checkoutFormDataScheme = yup
  .object({
    emailAddress: yup
      .string()
      .email('Provide valid email address')
      .required(requiredValue),
    nameOnCard: yup.string().required(requiredValue),
    cardNumber: yup.string().required(requiredValue),
    expirationDate: yup
      .string()
      .required(requiredValue)
      .cardExpirationDate('Wrong value'),
    cvcNumber: yup
      .string()
      .required(requiredValue)
      .matches(/^\d\d\d/, 'Should be 3 digits long'),
    company: yup.string(),
    addressFirstLine: yup.string(),
    apartmentLine: yup.string(),
    city: yup.string(),
    stateProvince: yup.string(),
    postalCode: yup.string(),
    sameAsShipping: yup.boolean(),
  })
  .required();

interface CheckoutFormData extends InferType<typeof checkoutFormDataScheme> {}

const FormHeader = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl mt-8 mb-4">{children}</h2>
);

const ErrorMessage = ({ children }: { children: string }) => (
  <p className="mt-2 text-red-600">{children}</p>
);

interface InputProps extends HTMLProps<HTMLInputElement> {
  register: Function;
  children: ReactNode;
  name: string;
  labelFirst?: boolean;
  type: HTMLInputTypeAttribute;
  errors: FieldErrors;
}

const Input = ({
  register,
  name,
  children,
  errors,
  labelFirst = true,
  ...rest
}: InputProps) => {
  const fieldError = errors && errors[name];
  const fieldErrorMessage = fieldError?.message as string;
  if (labelFirst)
    return (
      <>
        <label
          htmlFor={name}
          className="text-m block font-medium mb-2 dark:text-white"
        >
          {children}
        </label>
        <input
          {...register(name)}
          {...rest}
          className="py-3 px-4 w-full border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
        <ErrorMessage>{fieldErrorMessage}</ErrorMessage>
      </>
    );
  return (
    <>
      <input
        {...register(name)}
        {...rest}
        className="py-3 px-4 border-gray-200 rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label
        htmlFor={name}
        className="text-m font-medium mb-2 dark:text-white ml-2"
      >
        {children}
      </label>
      <ErrorMessage>{fieldErrorMessage}</ErrorMessage>
    </>
  );
};

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormDataScheme),
  });
  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>
          <FormHeader>Contact information</FormHeader>
        </legend>
        <Input
          name="emailAddress"
          errors={errors}
          type="email"
          placeholder="you@site.com"
          register={register}
        >
          Email address:{' '}
        </Input>
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Payment details</FormHeader>
        </legend>
        <Input
          register={register}
          name="nameOnCard"
          type="text"
          errors={errors}
          autoComplete="cc-name"
        >
          Name on card
        </Input>
        <Input
          type="text"
          name="cardNumber"
          autoComplete="cc-number"
          register={register}
          errors={errors}
        >
          Card number
        </Input>

        <div className="flex gap-4">
          <div className="flex-grow">
            <Input
              type="text"
              name="expirationDate"
              autoComplete="cc-exp"
              register={register}
              errors={errors}
            >
              Expiration date (MM/YY)
            </Input>
          </div>
          <div className="flex-grow">
            <Input
              type="text"
              name="cvcNumber"
              autoComplete="cc-csc"
              register={register}
              errors={errors}
            >
              CVC
            </Input>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Shipping address</FormHeader>
        </legend>
        <Input type="text" name="company" register={register} errors={errors}>
          Company
        </Input>
        <Input
          type="text"
          name="addressFirstLine"
          register={register}
          errors={errors}
        >
          Address
        </Input>
        <Input
          type="text"
          name="apartmentLine"
          register={register}
          errors={errors}
        >
          Apartment, suite, etc.
        </Input>
        <div className="columns-3">
          <Input type="text" name="city" register={register} errors={errors}>
            City
          </Input>
          <Input
            type="text"
            name="stateProvince"
            register={register}
            errors={errors}
          >
            State / Province
          </Input>
          <Input
            type="text"
            name="postalCode"
            register={register}
            errors={errors}
          >
            Postal code
          </Input>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <FormHeader>Billing information</FormHeader>
        </legend>
        <div className="container mx-auto">
          <Input
            type="checkbox"
            name="sameAsShipping"
            labelFirst={false}
            register={register}
            errors={errors}
          >
            Same as shipping information
          </Input>
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
