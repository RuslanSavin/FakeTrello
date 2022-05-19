export const validationRules = {
  title: {
    required: "This field is required",
  },
  identifier: {
    required: "This field is required",
  },
  password: {
    required: "This field is required",
    minLength: {
      value: 6,
      message: "Min length is 6",
    },
  },
  email: {
    required: "This field is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Entered value does not match email format",
    },
  },
};
