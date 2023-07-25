import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placespost.css";
import defaultImage from "../../images/default-image.jpg";

const defaultImageSrc = defaultImage;

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: "",
  story: "",
  fileUrl: "",
};

const initialPreviewImage = {
  imageSrc: defaultImageSrc,
};

function PlacesPost(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces, places } = props;
  const userName = localStorage.getItem("UserName");
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(defaultImageSrc);
  const [previewImage, setPreviewImage] = useState(initialPreviewImage);
  const [errors, setErrors] = useState({});

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  const validate = () => {
    let temp = {};
    temp.country = formData.country === "" ? false : true;
    temp.city = formData.city === "" ? false : true;
    temp.rating = formData.rating === "" ? false : true;
    temp.visitedAt = formData.visitedAt === "" ? false : true;
    temp.stayedFor = formData.stayedFor === "" ? false : true;
    temp.story = formData.story === "" ? false : true;
    temp.imageSrc = previewImage.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      uploadImage();
    }
  };

  const uploadImage = async (e) => {
    // e.preventDefault();
    const res = await fetch(
      `https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/uploads/binary`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_PUBLIC_UPLOAD,
          "Content-Type": "image/jpeg",
        },
        body: image,
      }
    );
    res.json().then((data) => {
      const info = {
        ...formData,
        fileUrl: data.fileUrl,
        filePath: data.filePath,
      };
      uploadFormData(info);
    });
  };

  const uploadFormData = async (formData) => {
    // e.preventDefault();
    const res = await fetch(`https://localhost:7209/${userName}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    res.json().then((data) => {
      setPlaces([...places, data]);
      navigate(`/${userName}/places`);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPreview = (e) => {
    const blob = new Blob([e.target.files[0]], { type: "image/jpeg" });
    setImage(blob);
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setPreviewImage({
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage({
        imageSrc: defaultImageSrc,
      });
    }
  };

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
            value={formData.country}
            className={applyErrorClass("country")}
          />

          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Amsterdam"
            onChange={handleChange}
            value={formData.city}
            className={applyErrorClass("city")}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={formData.rating}
            className={applyErrorClass("rating")}
          />

          <label htmlFor="visitedAt">Visited at:</label>
          <input
            id="visitedAt"
            name="visitedAt"
            type="date"
            onChange={handleChange}
            value={formData.visitedAt}
            className={applyErrorClass("visitedAt")}
          />

          <label htmlFor="stayedFor">Stayed for (days):</label>
          <input
            id="stayedFor"
            name="stayedFor"
            type="number"
            placeholder="∞"
            onChange={handleChange}
            value={formData.stayedFor}
            className={applyErrorClass("stayedFor")}
          />

          <label htmlFor="story">Your story:</label>
          <input
            id="story"
            name="story"
            type="textarea"
            placeholder="It was amazing, because..."
            onChange={handleChange}
            value={formData.story}
            className={applyErrorClass("story")}
          />

          <label htmlFor="imageSrc">Upload image:</label>
          <input
            id="imageSrc"
            name="imageSrc"
            type="file"
            accept="image/jpeg"
            onChange={showPreview}
            className={applyErrorClass("imageSrc")}
          />
          <div className="preview-image">
            <img src={previewImage.imageSrc} alt="Preview" />
          </div>

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
