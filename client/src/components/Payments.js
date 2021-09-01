import React, { useState, useEffect } from 'react';

export const ListDetailPrice = [
  {
    name: 'Standard',
    price: '10€',
    duration: 'month',
    attributes: ['Single User', '5GB Storage', 'Detail', 'News'],
    idPrice: '1',
  },
  {
    name: 'Premium',
    price: '80€',
    duration: 'year',
    attributes: ['Multiple User', '10GB Storage', 'detail', 'New'],
    idPrice: '2',
  },
  {
    name: 'Ultimate',
    price: '300€',
    duration: 'year',
    attributes: ['Ilimited User', '100GB Storage', 'detail and SAV', 'News'],
    idPrice: '3',
  },
];
function Pricing(props) {
  const list = props.mylist;

  const listItems = list.map((info, i) => (
    <div className="col-lg-4  ml-5" key={i}>
      <div className="card bg-success mb-5 mb-lg-0 rounded-lg shadow">
        <div className="card-header">
          <h2 className="card-title text-white-50 text-uppercase text-center">
            {info.name}
          </h2>
          <h3 className="h1 text-white text-center">
            {info.price + '/' + info.duration}
            <span className="h6 text-white-50"></span>
          </h3>
        </div>
        <div className="card-body bg-light rounded-bottom">
          <div>
            <div className="paypal-button">
              <button
                type="button"
                className="btn btn-primary btn-block"
                value={info.idPrice}
                onClick={(e) => props.handleClick(e)}
              >
                Buy Now
              </button>
            </div>
          </div>

          <ul className="list-unstyled mb-4">
            {info.attributes.map((item, i) => (
              <li className="mb-3" key={i}>
                <span className="mr-3">
                  <i className="fa fa-check text-success"></i>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ));
  return listItems;
}

export const Payement = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('sctu');
  const handleClick = async (event) => {
    event.preventDefault();
    await handleSubmit(event.target.value);
  };

  const handleSubmit = async (val) => {
    const apiSetQrcode = process.env.REACT_APP_URL1 + '/api/paypalv2/payment';
    console.log(val);
    let value = val;
    try {
      //console.log(token);
      const response = await fetch(apiSetQrcode, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value,
        }),
      });
      //  await //console.log(response);
      if (response.ok) {
        const json = await response.json();
        window.location.assign(json.link);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setData(ListDetailPrice);
  }, [token]);
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-12  ml-5">
          <h1 className="text-center mb-5">Payement</h1>
        </div>
        <div className="container ">
          <div className="row justify-content-center ">
            {data.length !== 0 ? (
              <Pricing mylist={data} handleClick={handleClick} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
