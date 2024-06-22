/* eslint-disable no-fallthrough */
import moment from "moment";
import { APP_USER, APP_MY_DATA } from "./constants";

// Storage operations
export const useStorage = {
  set: (key: string, data: any) => {
    let stringifiedData = JSON.stringify(data);
    sessionStorage.setItem(key, stringifiedData);
  },

  get: (key: string) => {
    const data: any = JSON.parse(sessionStorage.getItem(key)!);

    if (!data) {
      return null;
    }
    return data;
  },

  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  },
};

export const getUserDetails = () => {
  const user = useStorage.get(APP_USER);

  return user ? user : null;
};

export const logoutUser = () => {
  useStorage.remove(APP_USER);
  useStorage.remove(APP_MY_DATA);
  window.location.reload();
};

export const getRequestError = (error: any) => {
  const { response } = error;

  if (response && typeof response.data === "string") {
    return response.data;
  } else if (response && response.data.error) {
    return response.data.error;
  }
  return "There might be a problem with your internet connection. Please check and try again.";
};

export const socialOnClick = (social: { name: string; handle: string }) => {
  switch (social.name) {
    case "whatsapp":
      window.open(
        `https://api.whatsapp.com/send?phone=${social.handle}&text=Hello! I'm a website visitor.`
      );
      break;
    case "twitter":
      window.open(`https://x.com/${social.handle}`);
      break;
    case "instagram":
      window.open(`https://www.instagram.com/${social.handle}`);
      break;
    case "facebook":
      window.open(`https://facebook.com/${social.handle}`);
      break;
    case "tiktok":
      window.open(`https://www.tiktok.com/${social.handle}`);
      break;
    default:
      return;
  }
};

export const firstLetter = (letter: string) => {
  var str = letter;
  var res = str?.substring(0, 1);
  return res;
};

export const formatNumber = (n: number, decimals?: number) => {
  return (
    n &&
    Number(n)
      .toFixed(decimals || 0)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      })
  );
};

export const dateToFromNow = (date: Date) => {
  // get from-now for this date
  var fromNow = moment(date).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(date).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "[Last] dddd",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return "[" + fromNow + "]";
    },
  });
};

export type AnyObject = { [key: string]: any };

// Form Validations
export const emailFormValidation = (required: boolean) => {
  return {
    required: required ? "Email address is required" : false,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };
};
export const nameFormValidation = (required: boolean) => {
  return {
    required: required ? "This field is required" : false,
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Invalid username",
    },
    minLength: {
      value: 2,
      message: "Must be more than 1 character",
    },
  };
};
export const textFormValidation = (required: boolean, minLength?: number) => {
  return {
    required: required ? "This field is required" : false,
    minLength: minLength
      ? {
          value: minLength + 1,
          message: `Must be more than ${minLength} character(s)`,
        }
      : {
          value: 2,
          message: "Must be more than 1 character",
        },
  };
};
export const numberFormValidation = (
  required: boolean,
  minLength: number,
  maxLength: number,
  min?: number,
  max?: number
) => {
  return {
    required: required ? "This field is required" : false,
    minLength: {
      value: minLength,
      message: `Minimum characters is ${minLength}`,
    },
    maxLength: {
      value: maxLength,
      message: `Maximum characters is ${maxLength}`,
    },
    min: {
      value: min || 0,
      message: `Minimum value is ${min || 0}`,
    },
    max: {
      value: max || 10000000000000000000,
      message: `Maximum value is ${max || 10000000000000000000}`,
    },
  };
};
export const passwordFormValidation = (required: boolean) => {
  return {
    required: required ? "This field is required" : false,
    minLength: {
      value: 8,
      message: "Must use at least 8 characters",
    },
  };
};
export const basicFormValidation = (required: boolean) => {
  return {
    required: required ? "This field is required" : false,
  };
};
