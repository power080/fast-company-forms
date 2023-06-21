import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/TextField";
import SelectField from "../../common/form/SelectField";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";

const UserEditPage = ({ userId }) => {
  const [data, setData] = useState({});

  const [errors, setErrors] = useState({});

  const [professions, setProfessions] = useState([]);

  const [qualities, setQualities] = useState([]);

  const [loading, setLoading] = useState(true);

  const history = useHistory();

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

  const validateConfig = {
    name: {
      isRequired: {
        message: "Поле обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Поле обязательно для заполнения"
      },
      isEmail: {
        message: "E-mail введен некорректно"
      }
    },
    profession: {
      isRequired: {
        message: "Поле обязательно для заполнения"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const transformData = (data) =>

    data.map((el) => ({
      value: el._id,
      label: el.name
    }));

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const { profession, qualities } = data;

    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => {
        history.push(`/users/${data._id}`);
      });

    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setData({
        ...data,
        profession: data.profession._id,
        qualities: transformData(data.qualities)
      });
    });

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

  useEffect(() => {
    if (qualities.length && professions.length && data._id) {
      setLoading(false);
    }
  }, [qualities, professions, data]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!loading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                name="profession"
                value={data.profession}
                options={professions}
                defaultOption="Выберите..."
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол"
                name="sex"
                value={data.sex}
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" }
                ]}
                onChange={handleChange}
              />
              <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                options={qualities}
                defaultValue={data.qualities}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Submit
              </button>
            </form>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserEditPage;
