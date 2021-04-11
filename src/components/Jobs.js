import React, {useState, useEffect} from 'react';
import Job from "./Job";
import * as Joi from "joi";
import axios from 'axios';

const JobsList = () => {

    const [state, setState] = useState([]);
    const [cargando, setCargando] = useState(false);

    const [inputs, setInputs] = useState({});


    const schema = Joi.object({
    name: Joi.string().required(),
    company: Joi.string().required(),
    salary: Joi.string().required(),
    city: Joi.string().required(),
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const { error } = validate();
      if (!error) {
        setCargando(true);
        axios.post('/offers/postOffer', inputs)
        .then(function (res) {
          getData();
          setCargando(false);
        }
        );
        
      } else {
        console.log(error);
      }
    };
  
    const handleInputChange = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    };
  
    const validate = () => {
      return schema.validate(inputs);
    };

  useEffect(() => {
      getData();
  },[])

  const getData = () => {
    const url = "/offers";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(offers => {
        console.log(offers);
        setState({ offers })
      });
  }

  return (
    state.offers?(
    <div>
	  
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name  </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="company">Company  </label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="salary">Salary  </label>
          <input
            type="text"
            id="salary"
            name="salary"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City  </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
      {cargando?(<p>Cargando...</p>):<></>}
    </div>
    { state.offers.map((e, i) => <Job key={i} offer={e} />) }
    </div>):<></>
  )
}
export default JobsList;