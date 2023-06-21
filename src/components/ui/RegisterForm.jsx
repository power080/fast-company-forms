import React, { useEffect, useState } from "react";
import api from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/TextField";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });

  const [errors, setErrors] = useState({});

  const [professions, setProfessions] = useState([]);

  const [qualities, setQualities] = useState([]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const { profession, qualities } = data;

    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
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
    },
    profession: {
      isRequired: {
        message: "Поле пароля обязательно для заполнения"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.values(data).map((professionName) => ({
        label: professionName.name,
        value: professionName._id
      }));

      setProfessions(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.values(data).map((optionName) => ({
        label: optionName.name,
        value: optionName._id,
        color: optionName.color
      }));

      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
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
      <SelectField
        label="Выберите вашу профессию"
        options={professions}
        defaultOption="Выберите..."
        onChange={handleChange}
        error={errors.profession}
        value={data.profession}
        name="profession"
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
