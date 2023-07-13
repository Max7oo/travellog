import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Nav from "../nav/nav";
import defaultImage from "../../images/default-image.jpg";

const defaultImageSrc = defaultImage

const initialPreviewImage = {
  imageSrc: defaultImageSrc,
};

const initialState = {
  profilePicture: "",
  profilePicturePath: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
};

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(defaultImageSrc)
  const [previewImage, setPreviewImage] = useState(initialPreviewImage)

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();
  };

  const uploadImage = async (e) => {
    const res = await fetch(`https://api.upload.io/v2/accounts/${process.env.REACT_APP_ID_UPLOAD}/uploads/binary`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_PUBLIC_UPLOAD,
        "Content-Type": "image/jpeg",
      },
      body: image,
    });
    res.json().then((data) => {
      const info = { ...formData, profilePicture: data.fileUrl, profilePicturePath: data.filePath }
      uploadFormData(info)
    });
  };

  const uploadFormData = async (formData) => {
    const userName = (formData.firstName.toLowerCase().replace(/\s+/g, '-') + "-" + formData.lastName.toLowerCase().replace(/\s+/g, '-') + "-" + Date.now().toString())
    const formDataComplete = { ...formData, userName: userName }
      const res = await fetch(`https://localhost:7209/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataComplete),
      });
      navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        <form onSubmit={handleSubmit}>
          <h2>Sign up</h2>

          <label htmlFor="imageSrc">Profile picture:</label>
          <input id="imageSrc" name="imageSrc" type="file" accept="image/jpeg" onChange={showPreview} />
          <div className="preview-image">
            <img src={previewImage.imageSrc} alt="Preview"/>
          </div>

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            required
            onChange={handleChange}
            value={formData.firstName}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Smith"
            required
            onChange={handleChange}
            value={formData.lastName}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            required
            onChange={handleChange}
            value={formData.email}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength="8"
            required
            onChange={handleChange}
            value={formData.password}
          />

          <div>
            <button type="submit">Create account</button>
          </div>
        </form>
        <Link to={`/login`} className="sub-link">Already have an account?</Link>
      </section>
    </>
  );
}

export default SignUp;
