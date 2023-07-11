import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import defaultImage from "../../images/default-image.jpg";

const defaultImageSrc = defaultImage

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null
};

function PlacesPost(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces, places } = props;
  const userName = localStorage.getItem("UserName");
  const [values, setValues] = useState(initialState);
  const [errors, setErros] = useState({})

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  const validate = () => {
    let temp = {}
    temp.country = values.country === "" ? false:true;
    temp.city = values.city === "" ? false:true;
    temp.rating = values.rating === "" ? false:true;
    temp.visitedAt = values.visitedAt === "" ? false:true;
    temp.stayedFor = values.stayedFor === "" ? false:true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false:true;
    setErros(temp)
    return Object.values(temp).every(x => x===true)
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? "invalid-field" : "")

  console.log(values.imageName)
  console.log(values.imageFile)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      var formData = new FormData()
      formData = [
        { country: values.country },
        { city: values.city },
        { rating: values.rating },
        { visitedAt: values.visitedAt },
        { stayedFor: values.stayedFor },
        { imageName: values.imageName },
        { imageFile: values.imageFile },
      ]
      console.log(formData)
      const res = await fetch(`https://localhost:7209/${userName}/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      res.json().then((data) => {
        console.log(data)
        setPlaces([...places, data]);
        navigate(`/${userName}/places`);
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showPreview = (e) => {
    if(e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setValues({
          ...values,
          imageFile,
          imageName: e.target.files[0].name,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
  }

  return (
    <>
      <Nav />
      <section>
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Add place</h2>

          <label htmlFor="country">Country:</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="The Netherlands"
            onChange={handleChange}
            value={values.country}
            className={applyErrorClass('country')}
          />

          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Amsterdam"
            onChange={handleChange}
            value={values.city}
            className={applyErrorClass('city')}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={values.rating}
            className={applyErrorClass('rating')}
          />

          <label htmlFor="visitedAt">Visited at:</label>
          <input
            id="visitedAt"
            name="visitedAt"
            type="date"
            onChange={handleChange}
            value={values.visitedAt}
            className={applyErrorClass('visitedAt')}
          />

          <label htmlFor="stayedFor">Stayed for (days):</label>
          <input
            id="stayedFor"
            name="stayedFor"
            type="number"
            placeholder="∞"
            onChange={handleChange}
            value={values.stayedFor}
            className={applyErrorClass('stayedFor')}
          />

          <label htmlFor="imageSrc">Upload image:</label>
          <input id="imageSrc" name="imageSrc" type="file" accept="image/jpeg" onChange={showPreview} className={applyErrorClass('imageSrc')} />
          <img src={values.imageSrc} alt="Preview"/>

          <div className="actions-section">
            <button className="button blue" type="submit">
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default PlacesPost;
