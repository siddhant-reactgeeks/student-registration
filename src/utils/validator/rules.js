/* eslint-disable */
import { isEmpty as isEmptyObject, isNull, each } from "lodash";
import moment from "moment";

const isEmpty = value => value === undefined || isNull(value) || value === "";

export const join = rules => (value, data, validationMessage) =>
  rules
    .map(rule => rule(value, data, validationMessage))
    .filter(error => !!error)[0 /* first error */];

export function email(value) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!isEmpty(value) && !regex.test(value)) {
    return "Invalid email address";
  }
}

export function link(value) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  if (!isEmpty(value) && !regex.test(value)) {
    return "Invalid link";
  }
}

export function required(value, state, validationMessage) {
  const type = typeof value;
  const restrictedTrimType = ["number", "boolean"];
  if (isEmpty(value)) {
    return `You need to enter ${validationMessage}`;
  }
  if (restrictedTrimType.indexOf(type) === -1 && value && JSON.stringify(value).trim().length === 0) {
    return `You need to enter ${validationMessage}`;
  }
  if (typeof value === 'string') {
    if (!(value && value.trim())) {
      return `Empty values are not allowed!`;
    }
  }
}

export function onlyPast(value) {
  if (!isNull(value) && moment(value).isValid() && moment().isBefore(value)) {
    return "Invalid date of birth";
  }
}

export function onlyTillCurrentYear(value) {
  const regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  if (!isEmpty(value) && !regex.test(value)) {
    return "Invalid Date";
  } else {
    const currentDate = new Date();
    value = new Date(value)
    const currentYear = currentDate.getFullYear();
    if (!isNull(value) && moment(value).isValid() && !(value.getFullYear() <= currentYear)) {
      return "Only date till current year are allowed";
    }
  }
}

export function fileSize(maxSize) {
  return value => {
    const largerFileArray = value.filter(o => o.file.size > maxSize);
    if (!isEmptyObject(largerFileArray)) {
      return `Maximum file size allowed is ${maxSize / 1000000} mb`;
    }
  };
}

export function file(value) {
  if (isEmpty(value) || isNull(value)) {
    return "This field is required";
  }
}

export function url(value) {
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; // eslint-disable-line no-useless-escape
  if (!regex.test(value)) {
    return "invalid_url";
  }
}

export function nospace(value) {
  const trimmedValue = value.trim();

  if (trimmedValue.indexOf(" ") !== -1) {
    return "space_not_allowed";
  }

  if (trimmedValue.indexOf("#") !== -1) {
    return "special_chars_not_allowed";
  }
  if (trimmedValue.indexOf("+") !== -1) {
    return "special_chars_not_allowed";
  }
}

export function booleanTrue(value) {
  const type = typeof value;
  const restrictedTrimType = ["boolean"];

  if (
    isEmpty(value) ||
    (restrictedTrimType.indexOf(type) >= 0 && value === false)
  ) {
    return "required";
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be atleast ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `max_length_reached`;
    }
  };
}

export function maxArrayLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Only ${max} values are allowed`;
    }
  };
}

export function max(max) {
  return value => {
    if (!isEmpty(value) && Number(value) > max) {
      return `Cannot be greater than ${max}`;
    }
  };
}


export function min(min) {
  return value => {
    if (!isEmpty(value) && Number(value) < min) {
      return `Cannot be less than ${min}`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return "Type in a number";
  }
}

export function float(value) {
  if (isNaN(value - parseFloat(value))) {
    return "Type in a number";
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(", ")}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return "Passwords do not match";
      }
    }
  };
}

export function requiredIf(field) {
  return (value, data) => {
    if (data) {
      if (isEmptyObject(data[field]) && isEmpty(value)) {
        return "Atleast a field is required";
      }
    }
  };
}

export function zipcode(field) {
  return (value, data) => {
    if (data) {
      const trimmedValue = value.trim();
      const validLength = data[field].length;
      if (validLength === 0) {
        return `Please select a location`;
      }
      if (validLength !== trimmedValue.length) {
        return `Must be of ${validLength} characters`;
      }
    }
  };
}

export function choseAtleastOne(items) {
  const options = items.split(",");

  return (value, data) => {
    if (
      options
        .map(field => data[field])
        .filter(
          fieldValue => !isEmptyObject(fieldValue) && !isEmpty(fieldValue)
        ).length === 0
    )
      return `Chose atleast one amongst ${items}`;
  };
}

export function nospecial(value) {
  const trimmedValue = value.trim();
  const regex = /\s|[0-9_]|\W|[#$%^&*()]/g;
  if (trimmedValue.indexOf(" ") !== -1) {
    return "space_not_allowed";
  }

  if (!isEmpty(trimmedValue) && !regex.test(trimmedValue)) {
    return "special_chars_not_allowed";
  }
}

export function phone(value) {
  const regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

  if (!isEmpty(value) && !regex.test(value)) {
    return "invalid_phone_number";
  }
}
