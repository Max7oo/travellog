import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Nav from "../nav/nav";
import "./profile.css";
import defaultImage from "../../images/default-image.jpg";

const defaultImageSrc = defaultImage;

const initialPreviewImage = {
  imageSrc: defaultImageSrc,
};

const initialState = {
  id: "",
  profilePicture: "",
  profilePicturePath: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  salt: "",
};

function EditProfile() {
  const navigate = useNavigate();
  const params = useParams();

  const userName = localStorage.getItem("UserName");
  const email = localStorage.getItem("Email");
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

  useEffect(
    function () {
      fetch(`https://localhost:7209/users/edit/${userName}/${email}`)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    },
    [userName, email]
  );

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/files?filePath=${formData.profilePicturePath}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_SECRET_UPLOAD,
          "Content-Type": "image/jpeg",
        },
      }
    );

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
        profilePicture: data.fileUrl,
        profilePicturePath: data.filePath,
      };
      uploadFormData(info);
    });

    const uploadFormData = async (formData) => {
      // const userName =
      //   formData.firstName.toLowerCase().replace(/\s+/g, "-") +
      //   "-" +
      //   formData.lastName.toLowerCase().replace(/\s+/g, "-") +
      //   "-" +
      //   Date.now().toString();
      const formDataComplete = { ...formData, userName: userName };
      await fetch(`https://localhost:7209/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataComplete),
      });
      navigate(`/${userName}`);
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(-1);
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
        <h2>Update profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="imageSrc">Upload image:</label>
          <input
            id="imageSrc"
            name="imageSrc"
            type="file"
            accept="image/jpeg"
            onChange={showPreview}
          />
          <div className="preview-image">
            {previewImage.imageSrc === defaultImageSrc ? (
              <img src={formData.profilePicture} alt={formData.firstName} />
            ) : (
              <img src={previewImage.imageSrc} alt={formData.firstName} />
            )}
          </div>

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={formData.firstName}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={formData.lastName}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            value={formData.email}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="text"
            onChange={handleChange}
            value={formData.password}
          />

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

export default EditProfile;
