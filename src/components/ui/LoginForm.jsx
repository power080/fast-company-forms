import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import CheckBoxField from "../common/form/CheckBoxField";
import { validator } from "../../utils/validator";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handdleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }

    console.log(data);
  };

  const validateConfig = {
    email: {
      isRequired: {
        message: "Поле E-mail обязательно для заполнения"
      },
      isEmail: {
        message: "E-mail введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Поле пароля обязательно для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать как минимум одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать как минимум одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <form onSubmit={handdleSubmit}>
      <TextField
        label="E-mail"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
