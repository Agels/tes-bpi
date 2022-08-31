import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Data from "../../data";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [validated, setValidated] = useState(false);
  const [Serial, setSerial] = useState("");
  const [email, setEmail] = useState("");
  const [jenisMesin, setJenisMesin] = useState();
  const [showMesin, setShowMesin] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const Result = await Data.find(
          (item) => item.serialNumber === Serial && item.email === email
        );
        if (Result) {
          setJenisMesin(Result.jenisMesin);
          setShowMesin(Result.jenisMesin[0]);
          setValidated(true);
        }
      } catch (err) {
        console.log("hehe", err);
      }
    };
    getData();
  }, [Serial, email, setJenisMesin]);
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const jenisMesin = showMesin.replace(/\s/g, "");

    if (!showMesin || !jenisMesin) {
      toast.error("data invalid");
      e.preventDefault();
    } else {
      setTimeout(() => {
        navigate(`detail/${Serial}/${jenisMesin}`);
      }, [1000]);
      toast.success("Successfully data valid!");

      e.preventDefault();
    }
  };

  return (
    <div className="container ">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="mt-5 col-12 p-3"
        style={{
          fontFamily: "sans-serif",
          borderRadius: "12px",
          boxShadow: "1px 2px 3px 4px rgba(12,12,12,0.2)",
        }}
      >
        <Form
          className="row g-3 px-3 col-lg-12 col-md-12 col-sm-12 col-12 w-100"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <label for="validationCustom01" className="form-label">
              <h4>Serial Number</h4>
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              controlId="validationCustom01"
              required
              onChange={(e) => setSerial(e.target.value)}
              placeholder="Contoh: ALF.XXXXXXX"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
            <label for="validationCustom02" className="form-label">
              <h4>Tipe Jenis Mesin</h4>
            </label>
            <select
              className="form-select rounded-pill"
              id="validationDefault04"
              required
              name="mesin"
            >
              <option selected disabled>
                {showMesin ? showMesin : "jenis mesin"}
              </option>
              {jenisMesin?.map((el) => {
                return (
                  <>
                    <option onClick={() => setShowMesin(el)}>{el}</option>
                  </>
                );
              })}
            </select>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <label for="validationCustom03" className="form-label">
              <h4>E-mail</h4>
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="validationCustom03"
              placeholder="Masukan email anda"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3 py-5 d-grid">
            <button className="btn btn-primary rounded-pill" type="submit">
              Cek Sekarang
            </button>
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Home;
