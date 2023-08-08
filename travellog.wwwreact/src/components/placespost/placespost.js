import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Nav from "../nav/nav";
import "./placespost.css";
import defaultImage from "../../images/default-image.jpg";
import Mapbox from "../mapbox/mapbox";

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

  const { setPlaces } = props;
  const userName = localStorage.getItem("UserName");
  const places = JSON.parse(localStorage.getItem("Places"));
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(defaultImageSrc);
  const [previewImage, setPreviewImage] = useState(initialPreviewImage);

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();
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
    const res = await fetch(
      `${process.env.REACT_APP_API_LINK}/${userName}/places`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
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
        <h2>Add place</h2>
        <div className="flex">
          <div className="first">
            <form className="form-stack contact-form" onSubmit={handleSubmit}>
              <label htmlFor="country">Country:</label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="The Netherlands"
                required
                onChange={handleChange}
                value={formData.country}
              />

              <label htmlFor="city">City:</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Amsterdam"
                required
                onChange={handleChange}
                value={formData.city}
              />

              <label htmlFor="rating">Rating:</label>
              <input
                id="rating"
                name="rating"
                type="number"
                placeholder="10"
                required
                onChange={handleChange}
                value={formData.rating}
              />

              <label htmlFor="visitedAt">Visited at:</label>
              <input
                id="visitedAt"
                name="visitedAt"
                type="date"
                required
                onChange={handleChange}
                value={formData.visitedAt}
              />

              <label htmlFor="stayedFor">Stayed for (days):</label>
              <input
                id="stayedFor"
                name="stayedFor"
                type="number"
                placeholder="∞"
                required
                onChange={handleChange}
                value={formData.stayedFor}
              />

              <label htmlFor="story">Your story:</label>
              <input
                id="story"
                name="story"
                type="textarea"
                placeholder="It was amazing, because..."
                required
                onChange={handleChange}
                value={formData.story}
              />

              <label htmlFor="imageSrc">Upload image:</label>
              <input
                id="imageSrc"
                name="imageSrc"
                type="file"
                accept="image/jpeg"
                required
                onChange={showPreview}
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
          </div>
          <div className="second">
            <Mapbox />
          </div>
        </div>
      </section>
    </>
  );
}

export default PlacesPost;
