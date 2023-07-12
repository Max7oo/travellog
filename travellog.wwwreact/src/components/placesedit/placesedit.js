import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./placesedit.css";
import defaultImage from "../../images/default-image.jpg";

const defaultImageSrc = defaultImage

const initialPreviewImage = {
  imageSrc: defaultImageSrc,
};

const initialState = {
  country: "",
  city: "",
  rating: "",
  visitedAt: "",
  stayedFor: "",
};

function PlacesEdit(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { setPlaces } = props;
  const userName = localStorage.getItem("UserName");
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(defaultImageSrc)
  const [previewImage, setPreviewImage] = useState(initialPreviewImage)
  const [errors, setErrors] = useState({})

  useEffect(function () {
    if (localStorage.length === 0) {
      navigate(`/`);
    } else if (userName !== params.userName) {
      navigate(`/`);
    }
  });

  useEffect(function () {
    fetch(`https://localhost:7209/${userName}/places/${params.id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await fetch(`https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/files?filePath=${formData.filePath}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_SECRET_UPLOAD,
          "Content-Type": "image/jpeg",
        },
      });

      const res = await fetch(`https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/uploads/binary`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_PUBLIC_UPLOAD,
          "Content-Type": "image/jpeg",
        },
        body: image,
      });
      res.json().then((data) => {
        const info = { ...formData, fileUrl: data.fileUrl, filePath: data.filePath }
        uploadFormData(info)
      });

      const uploadFormData = async (formData) => {
        await fetch(`https://localhost:7209/${userName}/places`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        await fetch(`https://localhost:7209/${userName}/places`)
        .then((res) => res.json())
        .then((data) => setPlaces(data));
        navigate(`/${params.userName}/places`);
      };
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(-1);
  };

  const validate = () => {
    let temp = {}
    temp.country = formData.country === "" ? false:true;
    temp.city = formData.city === "" ? false:true;
    temp.rating = formData.rating === "" ? false:true;
    temp.visitedAt = formData.visitedAt === "" ? false:true;
    temp.stayedFor = formData.stayedFor === "" ? false:true;
    temp.imageSrc = previewImage.imageSrc === defaultImageSrc ? false:true;
    setErrors(temp)
    return Object.values(temp).every(x => x===true)
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? "invalid-field" : "")

  const showPreview = (e) => {
    const blob = new Blob( [ e.target.files[0] ], { type: "image/jpeg" } )
    setImage(blob)
    if(e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setPreviewImage({
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      setPreviewImage({
        imageSrc: defaultImageSrc
      })
    }
  }

  return (
    <>
      <Nav />
      <section>
        <h2>You are editing: {formData.city}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={handleChange}
            value={formData.country}
          />

          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
            value={formData.city}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            onChange={handleChange}
            value={formData.rating}
          />

          <label htmlFor="visitedAt">Visited on:</label>
          <input
            id="visitedAt"
            name="visitedAt"
            type="date"
            onChange={handleChange}
            value={formData.visitedAt}
          />

          <label htmlFor="stayedFor">Stayed for (days):</label>
          <input
            id="stayedFor"
            name="stayedFor"
            type="number"
            onChange={handleChange}
            value={formData.stayedFor}
          />

          <label htmlFor="imageSrc">Upload image:</label>
          <input id="imageSrc" name="imageSrc" type="file" accept="image/jpeg" onChange={showPreview} className={applyErrorClass('imageSrc')} />
          <div className="preview-image">
            {previewImage.imageSrc === defaultImageSrc ? (<img src={formData.fileUrl} alt={formData.city} />) : (<img src={previewImage.imageSrc} alt={formData.city} />)}
          </div>

          <div className="buttons">
            <button type="submit">Save edits</button>
            <Link onClick={goBack}>
              <button className="cancel">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default PlacesEdit;
