import {
  HTMLInputTypeAttribute,
  HTMLProps,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addMethod, InferType, setLocale, StringSchema } from 'yup';

const requiredValue = 'This value is required.';

interface TranslationLanguage {
  default: string;
  required: string;
  lettersOnly: string;
  incorrectValue: string;
  incorrectMonth: string;
  incorrectYear: string;
  atLeastDigits: (value: string) => string;
}

type LocaleLanguage = 'en' | 'en-GB';

const getTranslation = (locale: LocaleLanguage): TranslationLanguage => {
  const translation: Record<LocaleLanguage, TranslationLanguage> = {
    en: {
      default: 'Invalid value',
      required: 'This value is required',
      lettersOnly: 'Only letters allowed',
      incorrectValue: 'Wrong value',
      incorrectMonth: 'Wrong month',
      incorrectYear: 'Wrong year',
      atLeastDigits: (value) => {
        return `Should be ${value} digits long`;
      },
    },
    'en-GB': {
      default: 'Nieprawidłowa wartość',
      required: 'Ta wartość jest wymagana',
      lettersOnly: 'Dozwolone jedynie litery',
      incorrectValue: 'Niepoprawna wartość',
      incorrectMonth: 'Niepoprawny miesiąc',
      incorrectYear: 'Niepoprawny rok',
      atLeastDigits: (value) => {
        return `Wymagana długość to ${value} cyfry`;
      },
    },
  };
  return translation[locale];
};

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: 'invalidField',
  },
  // use functions to generate an error object that includes the value from the schema
  string: {
    matches: (options) => ({
      options,
    }),
  },
});

declare module 'yup' {
  interface StringSchema {
    cardExpirationDate(errorMessage: string): StringSchema;
  }
}

addMethod(StringSchema, 'cardExpirationDate', function (errorMessage: string) {
  return this.test(`testCardExpirationDate`, function (value: string) {
    const { path, createError } = this;
    if (value.length !== 5) {
      return createError({
        path,
        type: 'incorrectValue',
        message: errorMessage,
      });
    }
    const [month, year] = value.split('/');
    if (Number.parseInt(month) > 12)
      return createError({
        path,
        type: 'incorrectMonth',
        message: 'Wrong month',
      });
    if (Number.parseInt(year) < new Date().getUTCFullYear() - 2000)
      return createError({
        path,
        type: 'incorrectYear',
        message: 'Wrong year',
      });
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
    cardNumber: yup
      .string()
      .required(requiredValue)
      .matches(/^\d{12}$/, { message: '12', name: 'atLeastDigits' }),
    expirationDate: yup
      .string()
      .required(requiredValue)
      .cardExpirationDate('Wrong Value'),
    cvcNumber: yup
      .string()
      .required(requiredValue)
      .matches(/^\d\d\d/, { message: '3', name: 'atLeastDigits' }),
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
          className="text-m block font-medium mt-4 mb-2 dark:text-white"
        >
          {children}
        </label>
        <input
          {...register(name)}
          {...rest}
          className={`${
            fieldErrorMessage ? 'border-red-600' : 'border-gray-200'
          } py-3 px-4 w-full  rounded-md text-m focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
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

// @ts-ignore-next-line
const translate = (translations, errors): FieldErrors<CheckoutFormData> => {
  const getTranslationKey = (key: string) => {
    const errorKey = errors[key].type;
    return translations[errorKey];
  };
  return Object.keys(errors).reduce((acc, key) => {
    if (typeof getTranslationKey(key) !== 'function')
      return {
        ...acc,
        [key]: { ...errors[key], message: getTranslationKey(key) },
      };
    return {
      ...acc,
      [key]: {
        ...errors[key],
        message: getTranslationKey(key)(errors[key].message),
      },
    };
  }, {});
};
export const CheckoutForm = () => {
  const [locale, setLocale] = useState<LocaleLanguage>('en' as LocaleLanguage);
  useEffect(() => {
    setLocale(
      ((window.navigator && navigator.language) as LocaleLanguage) ||
        ('en' as LocaleLanguage)
    );
  }, []);
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

  const translatedErrors = translate(getTranslation(locale), errors);
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>
          <FormHeader>Contact information</FormHeader>
        </legend>
        <Input
          name="emailAddress"
          errors={translatedErrors}
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
          errors={translatedErrors}
          autoComplete="cc-name"
        >
          Name on card
        </Input>
        <Input
          type="text"
          name="cardNumber"
          autoComplete="cc-number"
          register={register}
          errors={translatedErrors}
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
              errors={translatedErrors}
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
              errors={translatedErrors}
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
          errors={translatedErrors}
        >
          Address
        </Input>
        <Input
          type="text"
          name="apartmentLine"
          register={register}
          errors={translatedErrors}
        >
          Apartment, suite, etc.
        </Input>
        <div className="flex gap-4">
          <div>
            <Input type="text" name="city" register={register} errors={errors}>
              City
            </Input>
          </div>
          <div>
            <Input
              type="text"
              name="stateProvince"
              register={register}
              errors={translatedErrors}
            >
              State / Province
            </Input>
          </div>
          <div>
            <Input
              type="text"
              name="postalCode"
              register={register}
              errors={translatedErrors}
            >
              Postal code
            </Input>
          </div>
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
            errors={translatedErrors}
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
